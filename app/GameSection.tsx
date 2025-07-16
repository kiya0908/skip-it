"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import gamesData from '@/data/games.json';
import HotGame from '@/app/components/HotGame';
import TopPicksGame from '@/app/components/TopPicksGame';

export default function GameSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameUrl, setGameUrl] = useState<string | undefined>(undefined);
  const [loadError, setLoadError] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // State for the like button

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const shareBtnRef = useRef<HTMLButtonElement>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const fullscreenBtnRef = useRef<HTMLButtonElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null); // Ref for the game container div

  useEffect(() => {
    if (gamesData && gamesData.length > 0) {
      const firstGame = gamesData[0];
      if (firstGame && firstGame.playUrl) {
        setGameUrl(firstGame.playUrl);
        setLoadError(false);
      } else {
        console.error("Game data is missing playUrl for the first game.");
        setLoadError(true);
        setIsLoading(false);
      }
    } else {
      console.error("No game data found.");
      setLoadError(true);
      setIsLoading(false);
    }
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
    console.error("Iframe failed to load content for URL:", gameUrl);
    console.log("可能是由于跨域限制或X-Frame-Options导致iframe加载失败");
  };

  const reloadGame = () => {
    if (gamesData && gamesData.length > 0 && gamesData[0].playUrl) {
      setGameUrl(gamesData[0].playUrl + (gamesData[0].playUrl.includes('?') ? '&' : '?') + 'timestamp=' + new Date().getTime());
      setIsLoading(true);
      setLoadError(false);
    }
  };

  // Fullscreen Handler
  const handleFullscreen = useCallback(() => {
    // 确保游戏已加载且iframe可用
    if (iframeRef.current && !isLoading && !loadError) {
      if (!document.fullscreenElement) {
        if (iframeRef.current.requestFullscreen) {
          iframeRef.current.requestFullscreen();
        } else if ((iframeRef.current as any).webkitRequestFullscreen) { // For Safari
          (iframeRef.current as any).webkitRequestFullscreen();
        } else if ((iframeRef.current as any).msRequestFullscreen) { // For IE/Edge
          (iframeRef.current as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    }
  }, [isLoading, loadError]);

  // Share Handler
  const handleShare = useCallback((platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`Play ${gamesData[0]?.title || 'Doodle Baseball'} Online for Free!`);

    switch (platform) {
      case 'facebook':
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
        break;
      case 'twitter':
        window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + title, '_blank');
        break;
      case 'whatsapp':
        window.open('https://api.whatsapp.com/send?text=' + title + ' ' + url, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('Link copied to clipboard!');
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
        break;
    }
    // Close share menu after sharing
    setShowShareMenu(false);
  }, []);

  // Effect for closing share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showShareMenu && shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node) &&
        shareBtnRef.current && !shareBtnRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  return (
    <div className="bg-white min-h-screen">
      <section id="play" className="py-6 bg-white">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
          <h1 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-6">Doodle Baseball Game</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden min-w-0">
              <div ref={gameContainerRef} className="game-container relative w-full aspect-video bg-gray-900">
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center text-white z-30">
                    <svg className="animate-spin h-10 w-10 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Loading Game...</p>
                    {/* 完全移除：进度条相关内容，回到原始简单状态 */}
                  </div>
                )}
                {loadError && (
                  <div className="absolute inset-0 bg-red-800 bg-opacity-90 text-white flex flex-col items-center justify-center text-center p-4 z-20">
                    {/* 移除：超时状态判断，统一错误提示 */}
                    <p className="mb-4 text-lg">Oops! Game loading error.</p>
                    <button onClick={reloadGame} className="bg-white text-red-700 hover:bg-gray-200 font-bold py-2 px-4 rounded transition-colors">
                      Try Again
                    </button>
                  </div>
                )}
                {gameUrl && (
                  <iframe
                    ref={iframeRef}
                    src={gameUrl}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; fullscreen"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    style={{ display: isLoading || loadError ? 'none' : 'block' }}
                  ></iframe>
                )}
              </div>
              <div className="game-footer text-white flex justify-between items-center p-4">
                <div className="flex items-center">
                  <p className="text-xl font-bangers mr-4 text-gray-900">{gamesData[0].title}</p>
                  <div className="star-rating">
                    <div className="flex mr-2">
                      {/* Render stars based on game rating */}
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < Math.floor(gamesData[0]?.rating ?? 0) ? 'text-yellow-300' : 'text-gray-300'}`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-xl text-gray-900">{gamesData[0]?.rating?.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    className="footer-btn share-button"
                    title="Like"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <i className={`fas fa-heart text-xl ${isLiked ? 'text-red-500' : 'text-blue-400'}`}></i>
                  </button>
                  <div className="relative">
                    <button
                      ref={shareBtnRef}
                      className="footer-btn"
                      id="share-btn"
                      title="Share"
                      onClick={() => setShowShareMenu(!showShareMenu)}
                    >
                      <i className="fas fa-share-alt text-blue-400 text-xl"></i>
                    </button>
                    <div
                      ref={shareMenuRef}
                      id="share-menu"
                      className={`${showShareMenu ? '' : 'hidden'} absolute bottom-full right-0 mb-2 bg-[#0c2461] rounded-lg shadow-lg p-2 w-48 z-10`}
                    >
                      <button className="w-full text-left px-3 py-2 hover:bg-[#1e3c72] rounded text-white share-button flex items-center" onClick={() => handleShare('copy')}>
                        <i className="fas fa-link text-blue-400 mr-2"></i> Copy Link
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-[#1e3c72] rounded text-white share-button flex items-center" onClick={() => handleShare('facebook')}>
                        <i className="fab fa-facebook text-blue-400 mr-2"></i> Facebook
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-[#1e3c72] rounded text-white share-button flex items-center" onClick={() => handleShare('twitter')}>
                        <i className="fab fa-twitter text-blue-400 mr-2"></i> Twitter
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-[#1e3c72] rounded text-white share-button flex items-center" onClick={() => handleShare('whatsapp')}>
                        <i className="fab fa-whatsapp text-blue-400 mr-2"></i> WhatsApp
                      </button>
                    </div>
                  </div>
                  <button ref={fullscreenBtnRef} className="footer-btn" id="fullscreen-btn" title="Fullscreen" onClick={handleFullscreen}>
                    <i className="fas fa-expand-arrows-alt text-blue-400 text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80">
              <HotGame />
            </div>
          </div>
        </div>
      </section>

      <TopPicksGame />
    </div>
  );
}

