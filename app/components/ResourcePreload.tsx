'use client';

import { useEffect } from 'react';

interface ResourcePreloadProps {
  resources: {
    href: string;
    as: string;
    type?: string;
    crossOrigin?: string;
  }[];
}

export default function ResourcePreload({ resources }: ResourcePreloadProps) {
  useEffect(() => {
    // 动态创建预加载链接
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) {
        link.type = resource.type;
      }
      
      if (resource.crossOrigin) {
        link.crossOrigin = resource.crossOrigin;
      }
      
      document.head.appendChild(link);
    });
    
    // 清理函数
    return () => {
      const links = document.querySelectorAll('link[rel="preload"]');
      links.forEach(link => {
        if (resources.some(r => r.href === (link as HTMLLinkElement).href)) {
          link.remove();
        }
      });
    };
  }, [resources]);
  
  return null; // 这个组件不渲染任何内容
}