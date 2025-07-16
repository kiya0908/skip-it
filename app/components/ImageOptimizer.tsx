'use client';

import { useEffect } from 'react';

export default function ImageOptimizer() {
  useEffect(() => {
    // 检测网络连接速度
    const connection = (navigator as any).connection;
    const isSaveData = connection?.saveData;
    const effectiveType = connection?.effectiveType;
    
    // 如果用户开启了省流量模式或网络连接较慢，降低图片质量
    if (isSaveData || (effectiveType && ['slow-2g', '2g', '3g'].includes(effectiveType))) {
      // 找到所有next/image组件生成的图片
      const images = document.querySelectorAll('img[srcset]');
      
      // 修改srcset，选择较低质量的图片
      images.forEach(img => {
        const srcset = img.getAttribute('srcset');
        if (srcset) {
          // 解析srcset
          const srcsetParts = srcset.split(',').map(part => part.trim());
          // 只保留较小尺寸的图片
          const smallerImages = srcsetParts.filter((part, index) => index < Math.ceil(srcsetParts.length / 2));
          if (smallerImages.length > 0) {
            img.setAttribute('srcset', smallerImages.join(', '));
          }
        }
      });
    }
  }, []);
  
  return null;
}