<template>
  <div class="dashboard">
    <section class="page-header reveal">
    
      <p>Welcome back! Here's your signing activity overview.</p>
    </section>

    <section class="stats-grid">
      <article v-for="card in statCards" :key="card.label" class="stat-card reveal">
        <div class="stat-meta">
          <p class="stat-label">{{ card.label }}</p>
          <h3 class="stat-value">{{ card.value }}</h3>
          <div class="stat-change">
            <span :class="['chip', card.trend]">{{ card.change }}</span>
            <span class="stat-note">vs last week</span>
          </div>
        </div>
        <div :class="['stat-icon', card.tone]">
          <span v-html="card.icon"></span>
        </div>
      </article>
    </section>

    <section class="grid-two">
      <article class="panel reveal">
        <div class="panel-header">
          <h3>Document Activity</h3>
          <p>Documents processed over the last 7 days</p>
        </div>
        <div class="chart chart-canvas">
          <canvas ref="lineCanvas" aria-label="Document activity line chart" role="img"></canvas>
        </div>
      </article>
      <article class="panel reveal">
        <div class="panel-header">
          <h3>Status Distribution</h3>
          <p>Document status breakdown</p>
        </div>
        <div class="donut-wrap">
          <div class="donut-canvas">
            <canvas ref="donutCanvas" aria-label="Status distribution chart" role="img"></canvas>
          </div>
          <ul class="legend">
            <li v-for="item in statusBreakdown" :key="item.key">
              <span class="dot" :style="{ background: cssColor(item.colorVar) }"></span>
              {{ item.label }}: {{ item.value }}
            </li>
          </ul>
        </div>
      </article>
    </section>

    <section class="grid-two wide">
      <article class="panel reveal">
        <div class="panel-header">
          <h3>Weekly Performance</h3>
          <p>Signed vs pending documents this week</p>
        </div>
        <div class="chart bar-chart">
          <canvas ref="barCanvas" aria-label="Weekly performance bar chart" role="img"></canvas>
        </div>
        <div class="bars-legend">
          <span><i class="legend-dot signed"></i> signed</span>
          <span><i class="legend-dot pending"></i> pending</span>
        </div>
      </article>
      <article class="panel reveal">
        <div class="panel-header">
          <h3>Recent Activity</h3>
          <p>Latest document updates</p>
        </div>
        <div class="activity-list">
          <div v-for="item in activities" :key="item.title" class="activity-item">
            <span class="activity-icon" v-html="item.icon"></span>
            <div class="activity-content">
              <p class="activity-title">{{ item.title }}</p>
              <p class="activity-sub">{{ item.document }}</p>
              <div class="activity-meta">
                <span :class="['status', item.status]">{{ item.statusLabel }}</span>
                <span class="activity-time">{{ item.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Chart } from 'chart.js/auto';
import { useDocuments } from '@/features/documents/composables';
import type { Document } from '@/features/documents/types';

const { documents } = useDocuments();

const lineCanvas = ref<HTMLCanvasElement | null>(null);
const donutCanvas = ref<HTMLCanvasElement | null>(null);
const barCanvas = ref<HTMLCanvasElement | null>(null);

let lineChart: Chart | null = null;
let donutChart: Chart | null = null;
let barChart: Chart | null = null;
let themeObserver: MutationObserver | null = null;

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const getDocDate = (doc: Document) => {
  const value = doc.updatedAt ?? doc.createdAt ?? new Date().toISOString();
  return new Date(value);
};

const last7Days = computed(() => {
  const days: Date[] = [];
  const today = startOfDay(new Date());
  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(date);
  }
  return days;
});

const toDateKey = (date: Date) => date.toISOString().slice(0, 10);

const activityLabels = computed(() =>
  last7Days.value.map((day) =>
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(day),
  ),
);

const activityValues = computed(() => {
  const counts = new Map<string, number>();
  last7Days.value.forEach((day) => counts.set(toDateKey(day), 0));
  documents.value.forEach((doc) => {
    const key = toDateKey(startOfDay(getDocDate(doc)));
    if (!counts.has(key)) return;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return last7Days.value.map((day) => counts.get(toDateKey(day)) ?? 0);
});

const weeklyLabels = computed(() =>
  last7Days.value.map((day) =>
    new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(day),
  ),
);

const isPendingStatus = (status: string) =>
  ['SENT', 'VIEWED', 'IN_PROGRESS', 'SIGNED'].includes(status);

const isSignedStatus = (status: string) => ['SIGNED', 'COMPLETED'].includes(status);

const weeklySigned = computed(() => {
  const counts = new Map<string, number>();
  last7Days.value.forEach((day) => counts.set(toDateKey(day), 0));
  documents.value.forEach((doc) => {
    if (!isSignedStatus(doc.status)) return;
    const key = toDateKey(startOfDay(getDocDate(doc)));
    if (!counts.has(key)) return;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return last7Days.value.map((day) => counts.get(toDateKey(day)) ?? 0);
});

const weeklyPending = computed(() => {
  const counts = new Map<string, number>();
  last7Days.value.forEach((day) => counts.set(toDateKey(day), 0));
  documents.value.forEach((doc) => {
    if (!isPendingStatus(doc.status)) return;
    const key = toDateKey(startOfDay(getDocDate(doc)));
    if (!counts.has(key)) return;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return last7Days.value.map((day) => counts.get(toDateKey(day)) ?? 0);
});

const statusCounts = computed(() => {
  const counts = {
    total: 0,
    sent: 0,
    viewed: 0,
    inProgress: 0,
    signed: 0,
    completed: 0,
    declined: 0,
    expired: 0,
    draft: 0,
    pending: 0,
  };
  documents.value.forEach((doc) => {
    counts.total += 1;
    switch (doc.status) {
      case 'SENT':
        counts.sent += 1;
        break;
      case 'VIEWED':
        counts.viewed += 1;
        break;
      case 'IN_PROGRESS':
        counts.inProgress += 1;
        break;
      case 'SIGNED':
        counts.signed += 1;
        break;
      case 'COMPLETED':
        counts.completed += 1;
        break;
      case 'DECLINED':
        counts.declined += 1;
        break;
      case 'EXPIRED':
        counts.expired += 1;
        break;
      case 'DRAFT':
      default:
        counts.draft += 1;
        break;
    }
  });
  counts.pending = counts.sent + counts.viewed + counts.inProgress + counts.signed;
  return counts;
});

const signedToday = computed(() => {
  const todayKey = toDateKey(startOfDay(new Date()));
  return documents.value.filter(
    (doc) =>
      isSignedStatus(doc.status) && toDateKey(startOfDay(getDocDate(doc))) === todayKey,
  ).length;
});

const statusBreakdown = computed(() => [
  { key: 'completed', label: 'Completed', value: statusCounts.value.completed, colorVar: '--success' },
  { key: 'pending', label: 'Pending', value: statusCounts.value.pending, colorVar: '--accent-warm' },
  { key: 'declined', label: 'Declined', value: statusCounts.value.declined, colorVar: '--danger' },
  { key: 'expired', label: 'Expired', value: statusCounts.value.expired, colorVar: '--accent' },
  { key: 'draft', label: 'Draft', value: statusCounts.value.draft, colorVar: '--muted' },
]);

const formatDelta = (value: number) => {
  if (!Number.isFinite(value)) return '0.0%';
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toFixed(1)}%`;
};

const buildDelta = (predicate: (doc: Document) => boolean) => {
  const today = startOfDay(new Date());
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - 6);
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(thisWeekStart.getDate() - 7);
  const lastWeekEnd = new Date(thisWeekStart);
  lastWeekEnd.setDate(thisWeekStart.getDate() - 1);

  const countInRange = (from: Date, to: Date) =>
    documents.value.filter((doc) => {
      const date = startOfDay(getDocDate(doc));
      return date >= from && date <= to && predicate(doc);
    }).length;

  const current = countInRange(thisWeekStart, today);
  const previous = countInRange(lastWeekStart, lastWeekEnd);
  const delta = previous === 0 ? (current === 0 ? 0 : 100) : ((current - previous) / previous) * 100;
  return { change: formatDelta(delta), trend: delta >= 0 ? 'up' : 'down' };
};

const statCards = computed(() => {
  const totals = statusCounts.value.total;
  const completed = statusCounts.value.completed;
  const pending = statusCounts.value.pending;
  const signedTodayValue = signedToday.value;
  const totalDelta = buildDelta(() => true);
  const signedDelta = buildDelta((doc) => isSignedStatus(doc.status));
  const pendingDelta = buildDelta((doc) => isPendingStatus(doc.status));
  const completedDelta = buildDelta((doc) => doc.status === 'COMPLETED');

  return [
    {
      label: 'Total Documents',
      value: totals,
      change: totalDelta.change,
      trend: totalDelta.trend,
      tone: 'accent',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M13 3v5h5"/><path d="M8 13h8"/><path d="M8 17h6"/></svg>',
    },
    {
      label: 'Signed Today',
      value: signedTodayValue,
      change: signedDelta.change,
      trend: signedDelta.trend,
      tone: 'success',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M13 3v5h5"/><path d="M9 14l2 2 4-4"/></svg>',
    },
    {
      label: 'Pending',
      value: pending,
      change: pendingDelta.change,
      trend: pendingDelta.trend,
      tone: 'warning',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    },
    {
      label: 'Completed',
      value: completed,
      change: completedDelta.change,
      trend: completedDelta.trend,
      tone: 'success',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M13 3v5h5"/><path d="M9 14l2 2 4-4"/></svg>',
    },
  ];
});

const formatRelativeTime = (date: Date) => {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
};

const mapActivity = (doc: Document) => {
  let title = 'Document updated';
  let status = 'warning';
  let statusLabel = 'Pending';
  if (doc.status === 'COMPLETED') {
    title = 'Document completed';
    status = 'success';
    statusLabel = 'Completed';
  } else if (doc.status === 'SIGNED') {
    title = 'Document signed';
    status = 'success';
    statusLabel = 'Signed';
  } else if (doc.status === 'VIEWED') {
    title = 'Document viewed';
    status = 'info';
    statusLabel = 'Viewed';
  } else if (doc.status === 'DECLINED') {
    title = 'Document declined';
    status = 'danger';
    statusLabel = 'Declined';
  } else if (doc.status === 'EXPIRED') {
    title = 'Document expired';
    status = 'danger';
    statusLabel = 'Expired';
  } else if (doc.status === 'DRAFT') {
    title = 'Document drafted';
    status = 'neutral';
    statusLabel = 'Draft';
  }
  return {
    title,
    document: doc.title,
    status,
    statusLabel,
    time: formatRelativeTime(getDocDate(doc)),
    icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  };
};

const activities = computed(() => {
  const sorted = [...documents.value].sort((a, b) =>
    getDocDate(b).getTime() - getDocDate(a).getTime(),
  );
  return sorted.slice(0, 5).map(mapActivity);
});

const cssColor = (value: string) => (value.startsWith('--') ? `var(${value})` : value);

const getThemeTarget = () => document.querySelector('.app-shell') ?? document.documentElement;

const readVar = (name: string) => getComputedStyle(getThemeTarget()).getPropertyValue(name).trim();

const getStatusColors = () =>
  statusBreakdown.value.map((item) =>
    item.colorVar.startsWith('--') ? readVar(item.colorVar) : item.colorVar,
  );

const buildLineChart = () => {
  if (!lineCanvas.value) return;
  const colors = getThemeColors();
  lineChart = new Chart(lineCanvas.value, {
    type: 'line',
    data: {
      labels: activityLabels.value,
      datasets: [
        {
          label: 'Documents',
          data: [...activityValues.value],
          borderColor: colors.accent,
          tension: 0.4,
          fill: false,
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 5,
          pointBackgroundColor: colors.accent,
          pointBorderColor: colors.accent,
          pointBorderWidth: 0,
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
      interaction: { intersect: false, mode: 'index' },
      scales: {
        x: {
          grid: { color: colors.line, drawBorder: false, borderDash: [4, 4] },
          border: { display: true, color: colors.line },
          ticks: { color: colors.muted },
        },
        y: {
          beginAtZero: true,
          grid: { color: colors.line, drawBorder: false, borderDash: [4, 4] },
          border: { display: true, color: colors.line },
          ticks: { color: colors.muted, stepSize: 4 },
        },
      },
    },
  });
};

const buildDonutChart = () => {
  if (!donutCanvas.value) return;
  const colors = getThemeColors();
  donutChart = new Chart(donutCanvas.value, {
    type: 'doughnut',
    data: {
      labels: statusBreakdown.value.map((item) => item.label),
      datasets: [
        {
          data: statusBreakdown.value.map((item) => item.value),
          backgroundColor: getStatusColors(),
          borderWidth: 4,
          borderColor: colors.surface,
          hoverOffset: 2,
          spacing: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
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
  });
};

const buildBarChart = () => {
  if (!barCanvas.value) return;
  const colors = getThemeColors();
  barChart = new Chart(barCanvas.value, {
    type: 'bar',
    data: {
      labels: weeklyLabels.value,
      datasets: [
        {
          label: 'Signed',
          data: [...weeklySigned.value],
          backgroundColor: colors.success,
          borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
          borderSkipped: 'bottom',
          barPercentage: 0.7,
          categoryPercentage: 0.72,
        },
        {
          label: 'Pending',
          data: [...weeklyPending.value],
          backgroundColor: colors.accentWarm,
          borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
          borderSkipped: 'bottom',
          barPercentage: 0.7,
          categoryPercentage: 0.72,
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
          grid: { display: false },
          border: { display: true, color: colors.line },
          ticks: { color: colors.muted },
        },
        y: {
          beginAtZero: true,
          grid: { color: colors.line, drawTicks: false, borderDash: [4, 4] },
          border: { display: true, color: colors.line },
          ticks: { color: colors.muted, stepSize: 4 },
        },
      },
    },
  });
};

const getThemeColors = () => ({
  accent: readVar('--accent'),
  accentWarm: readVar('--accent-warm'),
  success: readVar('--success'),
  danger: readVar('--danger'),
  line: readVar('--line'),
  muted: readVar('--muted'),
  ink: readVar('--ink'),
  inkStrong: readVar('--ink-strong'),
  surface: readVar('--surface'),
});

const applyTheme = () => {
  const colors = getThemeColors();
  Chart.defaults.color = colors.muted;
  Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;

  if (lineChart) {
    lineChart.data.datasets[0].borderColor = colors.accent;
    lineChart.data.datasets[0].pointBackgroundColor = colors.accent;
    lineChart.data.datasets[0].pointBorderColor = colors.accent;
    const scales = lineChart.options.scales as any;
    scales.x.grid.color = colors.line;
    scales.y.grid.color = colors.line;
    scales.x.grid.borderDash = [4, 4];
    scales.y.grid.borderDash = [4, 4];
    scales.x.ticks.color = colors.muted;
    scales.y.ticks.color = colors.muted;
    scales.x.border.color = colors.line;
    scales.y.border.color = colors.line;
    const tooltip = lineChart.options.plugins?.tooltip as any;
    if (tooltip) {
      tooltip.backgroundColor = colors.surface;
      tooltip.titleColor = colors.inkStrong;
      tooltip.bodyColor = colors.ink;
      tooltip.borderColor = colors.line;
    }
  }

  if (donutChart) {
    donutChart.data.datasets[0].backgroundColor = getStatusColors();
    donutChart.data.datasets[0].borderColor = colors.surface;
    const tooltip = donutChart.options.plugins?.tooltip as any;
    if (tooltip) {
      tooltip.backgroundColor = colors.surface;
      tooltip.titleColor = colors.inkStrong;
      tooltip.bodyColor = colors.ink;
      tooltip.borderColor = colors.line;
    }
  }

  if (barChart) {
    barChart.data.datasets[0].backgroundColor = colors.success;
    barChart.data.datasets[1].backgroundColor = colors.accentWarm;
    const scales = barChart.options.scales as any;
    scales.y.grid.color = colors.line;
    scales.y.grid.borderDash = [4, 4];
    scales.x.ticks.color = colors.muted;
    scales.y.ticks.color = colors.muted;
    scales.x.border.color = colors.line;
    scales.y.border.color = colors.line;
    const tooltip = barChart.options.plugins?.tooltip as any;
    if (tooltip) {
      tooltip.backgroundColor = colors.surface;
      tooltip.titleColor = colors.inkStrong;
      tooltip.bodyColor = colors.ink;
      tooltip.borderColor = colors.line;
    }
  }

  lineChart?.update('none');
  donutChart?.update('none');
  barChart?.update('none');
};

watch([activityLabels, activityValues], () => {
  if (!lineChart) return;
  lineChart.data.labels = [...activityLabels.value];
  lineChart.data.datasets[0].data = [...activityValues.value];
  lineChart.update();
});

watch([weeklyLabels, weeklySigned, weeklyPending], () => {
  if (!barChart) return;
  barChart.data.labels = [...weeklyLabels.value];
  barChart.data.datasets[0].data = [...weeklySigned.value];
  barChart.data.datasets[1].data = [...weeklyPending.value];
  barChart.update();
});

watch(statusBreakdown, () => {
  if (!donutChart) return;
  donutChart.data.labels = statusBreakdown.value.map((item) => item.label);
  donutChart.data.datasets[0].data = statusBreakdown.value.map((item) => item.value);
  donutChart.update();
});

onMounted(() => {
  buildLineChart();
  buildDonutChart();
  buildBarChart();
  applyTheme();

  themeObserver = new MutationObserver(() => {
    applyTheme();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
});

onBeforeUnmount(() => {
  themeObserver?.disconnect();
  lineChart?.destroy();
  donutChart?.destroy();
  barChart?.destroy();
});
</script>

<style scoped>
.dashboard {
  display: grid;
  gap: 2rem;
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: var(--surface);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-label {
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
}

.stat-value {
  margin: 0.4rem 0;
  font-size: 2rem;
  color: var(--ink-strong);
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.chip.up {
  background: rgba(22, 163, 74, 0.12);
  color: var(--success);
}

.chip.down {
  background: rgba(239, 68, 68, 0.12);
  color: var(--danger);
}

.stat-note {
  color: var(--muted);
}

.stat-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: grid;
  place-items: center;
}

.stat-icon span :deep(svg) {
  width: 22px;
  height: 22px;
  stroke-width: 1.8;
  stroke: currentColor;
  fill: none;
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
  background: rgba(245, 158, 11, 0.16);
  color: var(--accent-warm);
}

.grid-two {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(0, 1fr);
  gap: 1.5rem;
}

.grid-two.wide {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
}

.panel {
  background: var(--surface);
  border-radius: 22px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--line);
  display: grid;
  gap: 1.2rem;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--ink-strong);
}

.panel-header p {
  margin: 0.3rem 0 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.chart {
  background: transparent;
  border-radius: 18px;
  padding: 0.5rem 0.2rem 0;
}

.chart-canvas {
  height: 240px;
}

.bar-chart {
  height: 220px;
}

.chart canvas,
.donut-canvas canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.donut-wrap {
  display: grid;
  gap: 1.5rem;
  place-items: center;
}

.donut-canvas {
  width: 180px;
  height: 180px;
}

.legend {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1.4rem;
  row-gap: 0.6rem;
  font-size: 0.85rem;
  color: var(--muted);
}

.legend .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5rem;
}

.bars-legend {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  font-size: 0.85rem;
  margin-top: -0.5rem;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  display: inline-block;
  margin-right: 0.4rem;
}

.legend-dot.signed {
  background: #16a34a;
}

.legend-dot.pending {
  background: #f59e0b;
}

.bars-legend span {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
}

.bars-legend span:first-child {
  color: var(--success);
}

.bars-legend span:last-child {
  color: var(--accent-warm);
}

.activity-list {
  display: grid;
  gap: 0;
}

.activity-item {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 0.9rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--line);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface-2);
  display: grid;
  place-items: center;
  color: var(--muted);
}

.activity-icon :deep(svg) {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.6;
}

.activity-title {
  margin: 0;
  font-weight: 600;
  color: var(--ink-strong);
}

.activity-sub {
  margin: 0.2rem 0 0.4rem;
  font-size: 0.85rem;
  color: var(--muted);
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.status.success {
  background: rgba(22, 163, 74, 0.12);
  color: var(--success);
}

.status.warning {
  background: rgba(245, 158, 11, 0.18);
  color: var(--accent-warm);
}

.status.info {
  background: rgba(51, 92, 255, 0.16);
  color: var(--accent);
}

.status.danger {
  background: rgba(239, 68, 68, 0.15);
  color: var(--danger);
}

.activity-time {
  font-size: 0.75rem;
  color: var(--muted);
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-two,
  .grid-two.wide {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>

