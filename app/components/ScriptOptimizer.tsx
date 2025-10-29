'use client';

import { useEffect } from 'react';

export default function ScriptOptimizer() {
  useEffect(() => {
    // 延迟加载非关键脚本
    const loadNonCriticalScripts = () => {
      // GA 在 app/layout.tsx 中通过 <GoogleAnalytics /> 注入，这里避免重复加载
      // 在此处按需延迟加载其它非关键脚本（如聊天小组件、热图等）
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