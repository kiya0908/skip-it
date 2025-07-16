'use client';

import { useEffect } from 'react';

export default function ScriptOptimizer() {
  useEffect(() => {
    // 延迟加载非关键脚本
    const loadNonCriticalScripts = () => {
      // 添加Google Analytics
      const gaScript = document.createElement('script');
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`;
      gaScript.async = true;
      document.body.appendChild(gaScript);
      
      // 初始化GA
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    };
    
    // 使用requestIdleCallback在浏览器空闲时加载非关键脚本
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadNonCriticalScripts);
    } else {
      // 回退到setTimeout
      setTimeout(loadNonCriticalScripts, 2000);
    }
  }, []);
  
  return null;
}