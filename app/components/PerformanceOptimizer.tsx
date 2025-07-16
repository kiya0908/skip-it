'use client';

import { useEffect } from 'react';
import FontOptimizer from './FontOptimizer';
import ScriptOptimizer from './ScriptOptimizer';
import ImageOptimizer from './ImageOptimizer';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // 添加性能监控
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // 监控LCP (Largest Contentful Paint)
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime / 1000, 'seconds');
        });
        
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        
        // 监控CLS (Cumulative Layout Shift)
        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          console.log('CLS:', clsValue);
        });
        
        clsObserver.observe({ type: 'layout-shift', buffered: true });
        
        // 监控FID (First Input Delay)
        const fidObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            console.log('FID:', (entry as any).processingStart - (entry as any).startTime, 'ms');
          }
        });
        
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.error('Performance monitoring error:', e);
      }
    }
  }, []);
  
  return (
    <>
      <FontOptimizer />
      <ScriptOptimizer />
      <ImageOptimizer />
    </>
  );
}