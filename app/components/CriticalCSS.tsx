// 关键CSS内联，减少渲染阻塞
export default function CriticalCSS() {
  return (
    <style jsx>{`
      /* 关键路径CSS - 首屏渲染必需 */
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
      
      /* 预加载关键字体样式 */
      .font-bangers {
        font-family: var(--font-bangers), cursive;
        font-display: swap;
      }
      
      .font-poppins {
        font-family: var(--font-poppins), sans-serif;
        font-display: swap;
      }
    `}</style>
  );
}