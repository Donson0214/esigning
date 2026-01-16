<template>
  <div class="analytics-page">
    <section class="page-header">
      <div>
       
        <p>Deep dive into your document signing metrics</p>
      </div>
      <div class="range-select">
        <select v-model="selectedRange" aria-label="Select time range">
          <option v-for="option in rangeOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>

    <section class="stats-grid">
      <article v-for="card in statCards" :key="card.label" class="stat-card">
        <div class="stat-top">
          <div :class="['stat-icon', card.tone]">
            <span v-html="card.icon"></span>
          </div>
          <span :class="['delta', card.deltaTone]">{{ card.delta }}</span>
        </div>
        <p class="stat-value">{{ card.value }}</p>
        <p class="stat-label">{{ card.label }}</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h3>Signing Trends</h3>
        <p>Document completion trends over the selected range</p>
      </div>
      <div class="chart chart-lg">
        <canvas ref="signingCanvas" aria-label="Signing trends chart" role="img"></canvas>
      </div>
      <div class="chart-legend">
        <span><i class="legend-dot total"></i> total</span>
        <span><i class="legend-dot completed"></i> completed</span>
      </div>
    </section>

    <section class="grid-two">
      <article class="panel">
        <div class="panel-header">
          <h3>Document Types</h3>
          <p>Breakdown by document category</p>
        </div>
        <div class="chart chart-pie">
          <canvas ref="typesCanvas" aria-label="Document types chart" role="img"></canvas>
        </div>
      </article>
      <article class="panel">
        <div class="panel-header">
          <h3>Top Users</h3>
          <p>Most active signers in the selected range</p>
        </div>
        <div class="users-list">
          <div v-for="user in topUsers" :key="user.name" class="user-row">
            <span class="user-avatar">{{ user.initials }}</span>
            <div class="user-info">
              <p class="user-name">{{ user.name }}</p>
              <p class="user-status">Active</p>
            </div>
            <div class="user-metric">
              <span class="user-count">{{ user.documents }}</span>
              <span class="user-label">documents</span>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h3>Hourly Activity Distribution</h3>
        <p>Peak signing hours in the selected range</p>
      </div>
      <div class="chart chart-hourly">
        <canvas ref="hourlyCanvas" aria-label="Hourly activity chart" role="img"></canvas>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useDocuments } from '@/features/documents/composables';
import type { Document } from '@/features/documents/types';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Chart } from 'chart.js/auto';

type RangeOption = 'Last 7 days' | 'Last 30 days' | 'Last 90 days' | 'This year';

type AnalyticsData = {
  stats: {
    totalSigned: string;
    totalDelta: string;
    avgTime: string;
    avgDelta: string;
    activeUsers: string;
    activeDelta: string;
    completionRate: string;
    completionDelta: string;
    avgTone: 'positive' | 'negative';
  };
  signingTrends: {
    labels: string[];
    total: number[];
    completed: number[];
  };
  documentTypes: {
    labels: string[];
    values: number[];
  };
  topUsers: { name: string; initials: string; documents: number }[];
  hourly: {
    labels: string[];
    values: number[];
  };
};

const rangeOptions: RangeOption[] = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'];
const selectedRange = ref<RangeOption>('Last 7 days');

const { documents } = useDocuments();

const getRangeDays = (range: RangeOption) => {
  switch (range) {
    case 'Last 7 days':
      return 7;
    case 'Last 30 days':
      return 30;
    case 'Last 90 days':
      return 90;
    default:
      return 365;
  }
};

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const getDocDate = (doc: Document) => {
  const value = doc.updatedAt ?? doc.createdAt ?? new Date().toISOString();
  return new Date(value);
};

const getCompletionDate = (doc: Document) => {
  const value = doc.completedAt ?? doc.signedAt ?? doc.updatedAt ?? doc.createdAt ?? new Date().toISOString();
  return new Date(value);
};

const formatDelta = (value: number) => {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toFixed(1)}%`;
};

const formatDuration = (hours: number) => {
  if (!Number.isFinite(hours) || hours <= 0) return 'N/A';
  if (hours < 24) return `${hours.toFixed(1)}h`;
  return `${(hours / 24).toFixed(1)}d`;
};

const buildAnalyticsData = (range: RangeOption): AnalyticsData => {
  const days = getRangeDays(range);
  const end = new Date();
  const start = startOfDay(new Date());
  start.setDate(start.getDate() - days + 1);
  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);
  const prevStart = startOfDay(new Date(prevEnd));
  prevStart.setDate(prevStart.getDate() - days + 1);

  const inRange = (date: Date, from: Date, to: Date) => date >= from && date <= to;

  const currentDocs = documents.value.filter((doc) => inRange(getDocDate(doc), start, end));
  const previousDocs = documents.value.filter((doc) => inRange(getDocDate(doc), prevStart, prevEnd));

  const isSigned = (doc: Document) => doc.status === 'SIGNED' || doc.status === 'COMPLETED';
  const isCompleted = (doc: Document) => doc.status === 'COMPLETED';

  const signedCount = currentDocs.filter(isSigned).length;
  const previousSigned = previousDocs.filter(isSigned).length;

  const completedCount = currentDocs.filter(isCompleted).length;
  const completionRate = currentDocs.length ? (completedCount / currentDocs.length) * 100 : 0;
  const prevCompletionRate = previousDocs.length
    ? (previousDocs.filter(isCompleted).length / previousDocs.length) * 100
    : 0;

  const activeUsersSet = new Set<string>();
  currentDocs.forEach((doc) => {
    doc.signers?.forEach((signer) => activeUsersSet.add(signer.email));
  });
  const activeUsers = activeUsersSet.size;
  const previousActiveUsers = new Set<string>();
  previousDocs.forEach((doc) => {
    doc.signers?.forEach((signer) => previousActiveUsers.add(signer.email));
  });

  const durations = currentDocs
    .filter((doc) => doc.sentAt && (doc.completedAt || doc.signedAt))
    .map((doc) => {
      const startAt = new Date(doc.sentAt as string).getTime();
      const endAt = new Date((doc.completedAt ?? doc.signedAt) as string).getTime();
      return (endAt - startAt) / (1000 * 60 * 60);
    })
    .filter((hours) => Number.isFinite(hours) && hours >= 0);
  const avgHours = durations.length
    ? durations.reduce((sum, value) => sum + value, 0) / durations.length
    : 0;

  const prevDurations = previousDocs
    .filter((doc) => doc.sentAt && (doc.completedAt || doc.signedAt))
    .map((doc) => {
      const startAt = new Date(doc.sentAt as string).getTime();
      const endAt = new Date((doc.completedAt ?? doc.signedAt) as string).getTime();
      return (endAt - startAt) / (1000 * 60 * 60);
    })
    .filter((hours) => Number.isFinite(hours) && hours >= 0);
  const prevAvgHours = prevDurations.length
    ? prevDurations.reduce((sum, value) => sum + value, 0) / prevDurations.length
    : 0;

  const calcDelta = (current: number, previous: number) =>
    previous === 0 ? (current === 0 ? 0 : 100) : ((current - previous) / previous) * 100;

  const totalDelta = calcDelta(signedCount, previousSigned);
  const avgDelta = calcDelta(avgHours, prevAvgHours);
  const activeDelta = calcDelta(activeUsers, previousActiveUsers.size);
  const completionDelta = calcDelta(completionRate, prevCompletionRate);

  const bucketCount = 7;
  const bucketSize = Math.max(1, Math.ceil(days / bucketCount));
  const labels: string[] = [];
  const total: number[] = Array.from({ length: bucketCount }, () => 0);
  const completed: number[] = Array.from({ length: bucketCount }, () => 0);

  for (let i = 0; i < bucketCount; i += 1) {
    const bucketStart = new Date(start);
    bucketStart.setDate(start.getDate() + i * bucketSize);
    const label = bucketSize >= 28
      ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(bucketStart)
      : new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(bucketStart);
    labels.push(label);
  }

  currentDocs.forEach((doc) => {
    const date = getDocDate(doc);
    if (!inRange(date, start, end)) return;
    const diffDays = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const index = Math.min(bucketCount - 1, Math.max(0, Math.floor(diffDays / bucketSize)));
    total[index] += 1;
    if (isCompleted(doc)) {
      completed[index] += 1;
    }
  });

  const typeCounts = new Map<string, number>();
  currentDocs.forEach((doc) => {
    const ext = doc.fileName?.split('.').pop()?.toLowerCase() ?? 'other';
    let label = 'Other';
    if (ext === 'pdf') label = 'PDF';
    else if (ext === 'doc' || ext === 'docx') label = 'DOC';
    else if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') label = 'Image';
    typeCounts.set(label, (typeCounts.get(label) ?? 0) + 1);
  });
  const typeEntries = Array.from(typeCounts.entries()).sort((a, b) => b[1] - a[1]);
  const documentTypes = typeEntries.length
    ? {
        labels: typeEntries.map(([label]) => label),
        values: typeEntries.map(([, value]) => value),
      }
    : { labels: ['PDF'], values: [0] };

  const userCounts = new Map<string, { name: string; count: number }>();
  currentDocs.forEach((doc) => {
    doc.signers?.forEach((signer) => {
      const key = signer.email;
      const name = signer.name ?? signer.email;
      const current = userCounts.get(key) ?? { name, count: 0 };
      userCounts.set(key, { name: current.name, count: current.count + 1 });
    });
  });
  const topUsers = Array.from(userCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((user) => {
      const parts = user.name.split(' ').filter(Boolean);
      const initials = parts.length > 1
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : user.name.slice(0, 2).toUpperCase();
      return { name: user.name, initials, documents: user.count };
    });

  const hourlyLabels = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
  const hourlyValues = Array.from({ length: hourlyLabels.length }, () => 0);
  currentDocs.forEach((doc) => {
    const date = getCompletionDate(doc);
    if (!inRange(date, start, end)) return;
    const hour = date.getHours();
    if (hour < 8 || hour > 17) return;
    hourlyValues[hour - 8] += 1;
  });

  return {
    stats: {
      totalSigned: signedCount.toLocaleString('en-US'),
      totalDelta: formatDelta(totalDelta),
      avgTime: formatDuration(avgHours),
      avgDelta: formatDelta(avgDelta),
      activeUsers: activeUsers.toLocaleString('en-US'),
      activeDelta: formatDelta(activeDelta),
      completionRate: `${completionRate.toFixed(1)}%`,
      completionDelta: formatDelta(completionDelta),
      avgTone: avgDelta <= 0 ? 'positive' : 'negative',
    },
    signingTrends: {
      labels,
      total,
      completed,
    },
    documentTypes,
    topUsers,
    hourly: {
      labels: hourlyLabels,
      values: hourlyValues,
    },
  };
};

const currentData = computed(() => buildAnalyticsData(selectedRange.value));

const signingCanvas = ref<HTMLCanvasElement | null>(null);
const typesCanvas = ref<HTMLCanvasElement | null>(null);
const hourlyCanvas = ref<HTMLCanvasElement | null>(null);

let signingChart: Chart | null = null;
let typesChart: Chart | null = null;
let hourlyChart: Chart | null = null;
let themeObserver: MutationObserver | null = null;

const toneFromDelta = (delta: string) => (delta.trim().startsWith('-') ? 'negative' : 'positive');

const statCards = computed(() => {
  const stats = currentData.value.stats;
  return [
    {
      label: 'Total Signed',
      value: stats.totalSigned,
      delta: stats.totalDelta,
      deltaTone: toneFromDelta(stats.totalDelta),
      tone: 'accent',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M13 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/></svg>',
    },
    {
      label: 'Avg. Signing Time',
      value: stats.avgTime,
      delta: stats.avgDelta,
      deltaTone: stats.avgTone,
      tone: 'success',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h6l2-3 4 6 2-3h4"/><path d="M3 12a9 9 0 1 0 9-9"/><path d="M12 7v5l3 3"/></svg>',
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      delta: stats.activeDelta,
      deltaTone: toneFromDelta(stats.activeDelta),
      tone: 'warning',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20a7 7 0 0 1 14 0"/><path d="M12 20a7 7 0 0 1 10 0"/></svg>',
    },
    {
      label: 'Completion Rate',
      value: stats.completionRate,
      delta: stats.completionDelta,
      deltaTone: toneFromDelta(stats.completionDelta),
      tone: 'info',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M7 12h10"/><path d="M7 16h6"/></svg>',
    },
  ];
});

const topUsers = computed(() => currentData.value.topUsers);

const getThemeTarget = () => document.querySelector('.app-shell') ?? document.documentElement;
const readVar = (name: string) => getComputedStyle(getThemeTarget()).getPropertyValue(name).trim();

const toRgba = (hex: string, alpha: number) => {
  const raw = hex.replace('#', '');
  if (raw.length !== 6) return hex;
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getThemeColors = () => ({
  accent: readVar('--accent') || '#4f46e5',
  success: readVar('--success') || '#16a34a',
  warning: readVar('--accent-warm') || '#f59e0b',
  info: '#8b5cf6',
  cyan: '#06b6d4',
  line: readVar('--line') || '#e5e7eb',
  muted: readVar('--muted') || '#6b7280',
  ink: readVar('--ink') || '#1f2937',
  inkStrong: readVar('--ink-strong') || '#0f172a',
  surface: readVar('--surface') || '#ffffff',
});

const getPieColors = () => {
  const colors = getThemeColors();
  return [colors.accent, colors.success, colors.warning, colors.info, colors.cyan];
};

const buildLineFill = (accent: string) => (context: any) => {
  const { chart } = context;
  const { ctx, chartArea } = chart;
  if (!chartArea) return toRgba(accent, 0.2);
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, toRgba(accent, 0.25));
  gradient.addColorStop(1, toRgba(accent, 0.02));
  return gradient;
};

const buildBarFill = (accent: string, info: string) => (context: any) => {
  const { chart } = context;
  const { ctx, chartArea } = chart;
  if (!chartArea) return accent;
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, toRgba(accent, 0.95));
  gradient.addColorStop(1, toRgba(info, 0.45));
  return gradient;
};

const pieLabelPlugin = {
  id: 'pieLabelPlugin',
  afterDatasetDraw(chart: Chart) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];
    if (!dataset) return;
    const meta = chart.getDatasetMeta(0);
    const total = (dataset.data as number[]).reduce((sum, value) => sum + value, 0);
    const labels = chart.data.labels as string[];
    const colors = dataset.backgroundColor as string[];
    const font = getComputedStyle(document.body).fontFamily;

    ctx.save();
    meta.data.forEach((arc: any, index: number) => {
      const value = dataset.data[index] as number;
      if (!value) return;
      const angle = (arc.startAngle + arc.endAngle) / 2;
      const radius = arc.outerRadius + 18;
      const x = arc.x + Math.cos(angle) * radius;
      const y = arc.y + Math.sin(angle) * radius;
      const percent = Math.round((value / total) * 100);
      ctx.fillStyle = colors[index];
      ctx.font = `600 12px ${font}`;
      ctx.textAlign = angle > Math.PI / 2 && angle < (Math.PI * 3) / 2 ? 'right' : 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${labels[index]} ${percent}%`, x, y);
    });
    ctx.restore();
  },
};

const buildSigningChart = () => {
  if (!signingCanvas.value) return;
  const colors = getThemeColors();
  const data = currentData.value.signingTrends;
  signingChart = new Chart(signingCanvas.value, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'total',
          data: data.total,
          borderColor: colors.accent,
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          backgroundColor: buildLineFill(colors.accent),
          pointRadius: 0,
        },
        {
          label: 'completed',
          data: data.completed,
          borderColor: colors.success,
          borderWidth: 2,
          tension: 0.35,
          fill: false,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: colors.surface,
          titleColor: colors.inkStrong,
          bodyColor: colors.ink,
          borderColor: colors.line,
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: { color: colors.line, borderDash: [4, 4], drawBorder: false },
          border: { display: true, color: colors.line },
          ticks: { color: colors.muted },
        },
        y: {
          beginAtZero: true,
          grid: { color: colors.line, borderDash: [4, 4], drawBorder: false },
          border: { display: true, color: colors.line },
          ticks: { color: colors.muted, stepSize: 40 },
        },
      },
    },
  });
};

const buildTypesChart = () => {
  if (!typesCanvas.value) return;
  const colors = getThemeColors();
  const data = currentData.value.documentTypes;
  typesChart = new Chart(typesCanvas.value, {
    type: 'pie',
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          backgroundColor: getPieColors(),
          borderColor: colors.surface,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: colors.surface,
          titleColor: colors.inkStrong,
          bodyColor: colors.ink,
          borderColor: colors.line,
          borderWidth: 1,
        },
      },
    },
    plugins: [pieLabelPlugin],
  });
};

const buildHourlyChart = () => {
  if (!hourlyCanvas.value) return;
  const colors = getThemeColors();
  const data = currentData.value.hourly;
  hourlyChart = new Chart(hourlyCanvas.value, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Activity',
          data: data.values,
          borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
          borderSkipped: 'bottom',
          backgroundColor: buildBarFill(colors.accent, colors.info),
          barPercentage: 0.72,
          categoryPercentage: 0.8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: colors.surface,
          titleColor: colors.inkStrong,
          bodyColor: colors.ink,
          borderColor: colors.line,
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: { color: colors.line, borderDash: [4, 4], drawBorder: false },
          border: { display: true, color: colors.line },
          ticks: { color: colors.muted },
        },
        y: {
          beginAtZero: true,
          max: 60,
          grid: { color: colors.line, borderDash: [4, 4], drawBorder: false },
          border: { display: true, color: colors.line },
          ticks: { color: colors.muted, stepSize: 15 },
        },
      },
    },
  });
};

const updateCharts = () => {
  const data = currentData.value;
  if (signingChart) {
    signingChart.data.labels = data.signingTrends.labels;
    signingChart.data.datasets[0].data = data.signingTrends.total;
    signingChart.data.datasets[1].data = data.signingTrends.completed;
    signingChart.update();
  }
  if (typesChart) {
    typesChart.data.labels = data.documentTypes.labels;
    typesChart.data.datasets[0].data = data.documentTypes.values;
    typesChart.update();
  }
  if (hourlyChart) {
    hourlyChart.data.labels = data.hourly.labels;
    hourlyChart.data.datasets[0].data = data.hourly.values;
    hourlyChart.update();
  }
};

const applyTheme = () => {
  const colors = getThemeColors();
  Chart.defaults.color = colors.muted;
  Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;

  if (signingChart) {
    signingChart.data.datasets[0].borderColor = colors.accent;
    signingChart.data.datasets[1].borderColor = colors.success;
    signingChart.data.datasets[0].backgroundColor = buildLineFill(colors.accent);
    const scales = signingChart.options.scales as any;
    scales.x.grid.color = colors.line;
    scales.y.grid.color = colors.line;
    scales.x.border.color = colors.line;
    scales.y.border.color = colors.line;
    const tooltip = signingChart.options.plugins?.tooltip as any;
    if (tooltip) {
      tooltip.backgroundColor = colors.surface;
      tooltip.titleColor = colors.inkStrong;
      tooltip.bodyColor = colors.ink;
      tooltip.borderColor = colors.line;
    }
  }

  if (typesChart) {
    typesChart.data.datasets[0].backgroundColor = getPieColors();
    typesChart.data.datasets[0].borderColor = colors.surface;
    const tooltip = typesChart.options.plugins?.tooltip as any;
    if (tooltip) {
      tooltip.backgroundColor = colors.surface;
      tooltip.titleColor = colors.inkStrong;
      tooltip.bodyColor = colors.ink;
      tooltip.borderColor = colors.line;
    }
  }

  if (hourlyChart) {
    hourlyChart.data.datasets[0].backgroundColor = buildBarFill(colors.accent, colors.info);
    const scales = hourlyChart.options.scales as any;
    scales.x.grid.color = colors.line;
    scales.y.grid.color = colors.line;
    scales.x.border.color = colors.line;
    scales.y.border.color = colors.line;
    const tooltip = hourlyChart.options.plugins?.tooltip as any;
    if (tooltip) {
      tooltip.backgroundColor = colors.surface;
      tooltip.titleColor = colors.inkStrong;
      tooltip.bodyColor = colors.ink;
      tooltip.borderColor = colors.line;
    }
  }

  signingChart?.update('none');
  typesChart?.update('none');
  hourlyChart?.update('none');
};

watch(selectedRange, () => {
  updateCharts();
});

watch(currentData, () => {
  updateCharts();
}, { deep: true });

onMounted(() => {
  buildSigningChart();
  buildTypesChart();
  buildHourlyChart();
  applyTheme();

  themeObserver = new MutationObserver(() => {
    applyTheme();
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
});

onBeforeUnmount(() => {
  themeObserver?.disconnect();
  signingChart?.destroy();
  typesChart?.destroy();
  hourlyChart?.destroy();
});
</script>

<style scoped>
.analytics-page {
  display: grid;
  gap: 1.6rem;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.page-header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--ink-strong);
}

.page-header p {
  margin: 0.4rem 0 0;
  color: var(--muted);
}

.range-select {
  position: relative;
}

.range-select select {
  height: 44px;
  border-radius: 14px;
  border: 1px solid var(--line);
  padding: 0 2.4rem 0 1rem;
  background: var(--surface);
  font-weight: 600;
  appearance: none;
}

.range-select .chev {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 2;
  pointer-events: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: var(--surface);
  border-radius: 18px;
  padding: 1.2rem 1.4rem;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 0.8rem;
}

.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
}

.stat-icon span :deep(svg) {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
}

.stat-icon.accent {
  background: rgba(79, 70, 229, 0.12);
  color: var(--accent);
}

.stat-icon.success {
  background: rgba(22, 163, 74, 0.12);
  color: var(--success);
}

.stat-icon.warning {
  background: rgba(245, 158, 11, 0.12);
  color: var(--accent-warm);
}

.stat-icon.info {
  background: rgba(139, 92, 246, 0.12);
  color: #8b5cf6;
}

.delta {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.delta.positive {
  background: rgba(22, 163, 74, 0.12);
  color: var(--success);
}

.delta.negative {
  background: rgba(239, 68, 68, 0.12);
  color: var(--danger);
}

.stat-value {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--ink-strong);
}

.stat-label {
  margin: 0;
  color: var(--muted);
  font-size: 0.85rem;
}

.panel {
  background: var(--surface);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 1rem;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--ink-strong);
}

.panel-header p {
  margin: 0.35rem 0 0;
  color: var(--muted);
}

.chart {
  width: 100%;
  position: relative;
}

.chart-lg {
  height: 320px;
}

.chart-pie {
  height: 280px;
}

.chart-hourly {
  height: 260px;
}

.chart canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  font-size: 0.85rem;
  color: var(--muted);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.4rem;
}

.legend-dot.total {
  background: var(--accent);
}

.legend-dot.completed {
  background: var(--success);
}

.grid-two {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 1.5rem;
}

.users-list {
  display: grid;
  gap: 0.9rem;
}

.user-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.9rem;
  align-items: center;
}

.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  font-weight: 700;
  display: grid;
  place-items: center;
  font-size: 0.8rem;
}

.user-info {
  display: grid;
  gap: 0.2rem;
}

.user-name {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.user-status {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.user-metric {
  text-align: right;
}

.user-count {
  font-weight: 700;
  color: var(--accent);
  display: block;
}

.user-label {
  font-size: 0.75rem;
  color: var(--muted);
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-two {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>

