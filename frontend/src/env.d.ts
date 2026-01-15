/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>;
  export default component;
}

declare module 'vue' {
  export {
    computed,
    createApp,
    isProxy,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    shallowRef,
    toRaw,
    watch,
  } from '@vue/runtime-dom';

  export type { DefineComponent } from '@vue/runtime-dom';
}

declare module '@vue/runtime-core' {
  interface AppConfig {
    devtools?: boolean;
  }
}
