'use client';

import { useEffect } from 'react';

export default function ClientOptimizer() {
  // Add inline critical CSS
  const inlineCriticalCSS = `
    /* Critical path CSS - needed for first screen render */
    .game-container {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      background-color: #1a1a1a;
    }

    .loading-spinner {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  useEffect(() => {
    // Delay loading non-critical resources
    const loadNonCriticalResources = () => {
      // Preconnect to commonly used third-party domains
      const domains = [
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdnjs.cloudflare.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Font Awesome is now loaded directly, no need to optimize it

      // Optimize image loading
      const lazyLoadImages = () => {
        const imgObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const dataSrc = img.getAttribute('data-src');
              if (dataSrc) {
                img.src = dataSrc;
                img.removeAttribute('data-src');
              }
              imgObserver.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imgObserver.observe(img);
        });
      };

      // If browser supports IntersectionObserver, use lazy loading
      if ('IntersectionObserver' in window) {
        lazyLoadImages();
      }
    };

    // Use requestIdleCallback when browser is idle
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadNonCriticalResources);
    } else {
      // Fallback to setTimeout
      setTimeout(loadNonCriticalResources, 1000);
    }

    // Add performance monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Monitor LCP (Largest Contentful Paint)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime / 1000, 'seconds');
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        // Monitor CLS (Cumulative Layout Shift)
        new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          console.log('CLS:', clsValue);
        }).observe({ type: 'layout-shift', buffered: true });

        // Monitor FID (First Input Delay)
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            console.log('FID:', (entry as any).processingStart - (entry as any).startTime, 'ms');
          }
        }).observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.error('Performance monitoring error:', e);
      }
    }
  }, []);

  // Add inline critical CSS to page
  useEffect(() => {
    // Create style element and add critical CSS
    const style = document.createElement('style');
    style.innerHTML = inlineCriticalCSS;
    document.head.appendChild(style);
  }, []);

  return null;
}