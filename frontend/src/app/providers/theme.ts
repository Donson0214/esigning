import { ref } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'system';

const themeMode = ref<ThemeMode>('system');

const applyTheme = (mode: ThemeMode) => {
  const root = document.documentElement;
  if (mode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', mode);
  }
};

export const initTheme = () => {
  const stored = localStorage.getItem('theme_mode') as ThemeMode | null;
  themeMode.value = stored ?? 'system';
  applyTheme(themeMode.value);

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', () => {
    if (themeMode.value === 'system') {
      applyTheme('system');
    }
  });
};

export const useTheme = () => {
  const setTheme = (mode: ThemeMode) => {
    themeMode.value = mode;
    localStorage.setItem('theme_mode', mode);
    applyTheme(mode);
  };

  return {
    themeMode,
    setTheme,
  };
};
