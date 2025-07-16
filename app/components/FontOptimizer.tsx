'use client';

import { useEffect } from 'react';

export default function FontOptimizer() {
  useEffect(() => {
    // 检测网络连接速度
    const connection = (navigator as any).connection;
    const isSaveData = connection?.saveData;
    const effectiveType = connection?.effectiveType;
    
    // 如果用户开启了省流量模式或网络连接较慢，延迟加载字体图标
    if (isSaveData || (effectiveType && ['slow-2g', '2g', '3g'].includes(effectiveType))) {
      // 延迟加载Font Awesome
      const fontAwesomeLink = document.querySelector('link[href*="font-awesome"]');
      if (fontAwesomeLink) {
        fontAwesomeLink.setAttribute('media', 'print');
        fontAwesomeLink.setAttribute('onload', "this.media='all'");
      }
    }
    
    // 预加载关键字体
    const fontPreloadLinks = [
      { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap', as: 'style' },
      { href: 'https://fonts.googleapis.com/css2?family=Bangers&display=swap', as: 'style' }
    ];
    
    fontPreloadLinks.forEach(link => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = link.href;
      preloadLink.as = link.as;
      preloadLink.crossOrigin = 'anonymous';
      document.head.appendChild(preloadLink);
    });
  }, []);
  
  return null;
}