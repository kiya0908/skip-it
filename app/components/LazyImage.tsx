'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  quality?: number;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  className = '',
  quality = 75,
}: LazyImageProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // 如果设置了优先级，则立即加载
    if (priority) {
      setIsIntersecting(true);
      return;
    }

    // 否则使用IntersectionObserver进行懒加载
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' } // 提前200px开始加载
    );

    const currentElement = document.querySelector(`[data-image-id="${src}"]`);
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, priority]);

  return (
    <div 
      className={`relative ${className}`} 
      data-image-id={src}
      style={fill ? { width: '100%', height: '100%' } : {}}
    >
      {/* 加载占位符 */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      {/* 错误占位符 */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
          <span>Image failed</span>
        </div>
      )}
      
      {/* 实际图片 - 只有当进入视口或设置了优先级时才加载 */}
      {(isIntersecting || priority) && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(true);
            setHasError(true);
          }}
          quality={quality}
        />
      )}
    </div>
  );
}