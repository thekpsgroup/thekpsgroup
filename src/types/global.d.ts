// Global type declarations for Astro project

// Google Analytics gtag function
declare var gtag: (...args: any[]) => void;

// Extend ImportMeta to include env for Astro
interface ImportMeta {
  env: Record<string, string>;
}

// Web Vitals types
declare module 'web-vitals' {
  export interface Metric {
    name: string;
    value: number;
    id: string;
    label: string;
  }
  
  export function getCLS(onReport: (metric: Metric) => void): void;
  export function getFID(onReport: (metric: Metric) => void): void;
  export function getFCP(onReport: (metric: Metric) => void): void;
  export function getLCP(onReport: (metric: Metric) => void): void;
  export function getTTFB(onReport: (metric: Metric) => void): void;
  export function onCLS(onReport: (metric: Metric) => void): void;
  export function onFID(onReport: (metric: Metric) => void): void;
  export function onFCP(onReport: (metric: Metric) => void): void;
  export function onLCP(onReport: (metric: Metric) => void): void;
  export function onTTFB(onReport: (metric: Metric) => void): void;
}
