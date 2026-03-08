"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gamesData from '@/data/games.json';
import HotGame from '@/app/components/HotGame';
import TopPicksGame from '@/app/components/TopPicksGame';
import AdUnit from '@/app/components/AdUnit';
import { ADSENSE_TOP_SLOT } from '@/lib/adsense';

export default function GameSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [gameUrl, setGameUrl] = useState<string | undefined>(undefined);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(undefined); // defer iframe src until visible
  const [loadError, setLoadError] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // State for the like button
  const [isMobile, setIsMobile] = useState(false); // State for mobile detection
  const [showFloatingControls, setShowFloatingControls] = useState(false); // State for floating controls
  const [hasRequestedPlay, setHasRequestedPlay] = useState(false); // 用户是否点击加载游戏

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


  // Mobile detection effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
    console.error("Iframe failed to load content for URL:", gameUrl);
    console.log("可能的原因:");
    console.log("1. X-Frame-Options 或 CSP 限制");
    console.log("2. 网络连接问题");
    console.log("3. URL不可访问");
    console.log("4. HTTPS/HTTP协议混合问题");

    // 检查当前协议
    console.log("当前页面协议:", window.location.protocol);
    console.log("游戏URL协议:", gameUrl?.startsWith('https') ? 'https:' : 'http:');
  };

  const handleStartGame = useCallback(() => {
    if (!gameUrl) return;
    setHasRequestedPlay(true);
    setIsLoading(true);
    setLoadError(false);
    setCurrentSrc(gameUrl);
  }, [gameUrl]);

  const reloadGame = () => {
    if (gamesData && gamesData.length > 0 && gamesData[0].playUrl) {
      const base = gamesData[0].playUrl;
      const withTs = base + (base.includes('?') ? '&' : '?') + 'timestamp=' + new Date().getTime();
      setHasRequestedPlay(true);
      setIsLoading(true);
      setLoadError(false);
      setCurrentSrc(withTs);
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
    const title = encodeURIComponent(`Play ${gamesData[0]?.title || 'Skip It!'} Online for Free!`);

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

  // Effect for closing floating controls when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (showFloatingControls && gameContainerRef.current) {
        const target = event.target as Element;
        const floatingControls = gameContainerRef.current.querySelector('.floating-controls');
        if (floatingControls && !floatingControls.contains(target)) {
          setShowFloatingControls(false);
          setShowShareMenu(false);
        }
      }
    };

    if (isMobile && showFloatingControls) {
      document.addEventListener('mousedown', handleClickOutside as EventListener);
      document.addEventListener('touchstart', handleClickOutside as EventListener);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener);
      document.removeEventListener('touchstart', handleClickOutside as EventListener);
    };
  }, [showFloatingControls, isMobile]);

  const hasSidebarAd = Boolean(ADSENSE_TOP_SLOT);

  return (
    <div className="bg-white min-h-screen">
      <section id="play" className="py-6 bg-white">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
          <h1 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-6">Skip It!</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden min-w-0">
              <div ref={gameContainerRef} className={`game-container relative w-full bg-gray-900 ${isMobile ? 'h-[80vh]' : 'aspect-video'
                }`}>
                {!hasRequestedPlay && (
                  <>
                    <Image
                      src={gamesData[0]?.coverImage || '/images/games/doodlebaseball.png'}
                      alt={gamesData[0]?.title || 'Skip It!'}
                      fill
                      priority
                      quality={80}
                      sizes="(max-width: 768px) 100vw, 1280px"
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 text-white">
                      <h2 className="text-3xl sm:text-4xl font-bangers mb-4 drop-shadow-lg">
                        Play Skip It! Instantly
                      </h2>

                      <button
                        onClick={handleStartGame}
                        className="px-8 py-3 bg-red-600 hover:bg-red-700 transition-colors font-semibold rounded-full shadow-lg"
                      >
                        Play Now
                      </button>

                    </div>
                  </>
                )}
                {hasRequestedPlay && isLoading && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center text-white z-30">
                    <svg className="animate-spin h-10 w-10 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Loading Game...</p>
                  </div>
                )}
                {hasRequestedPlay && loadError && (
                  <div className="absolute inset-0 bg-red-800 bg-opacity-90 text-white flex flex-col items-center justify-center text-center p-4 z-20">
                    <p className="mb-4 text-lg">Oops! Game loading error.</p>
                    <button onClick={reloadGame} className="bg-white text-red-700 hover:bg-gray-200 font-bold py-2 px-4 rounded transition-colors">
                      Try Again
                    </button>
                  </div>
                )}
                {hasRequestedPlay && currentSrc && (
                  <iframe
                    ref={iframeRef}
                    src={currentSrc}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; fullscreen"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    onLoadStart={() => {
                      console.log("开始加载游戏:", currentSrc);
                    }}
                    style={{ display: isLoading || loadError ? 'none' : 'block' }}
                    title="Game"
                  ></iframe>
                )}

                {/* Floating Controls for Mobile */}
                {isMobile && hasRequestedPlay && (
                  <div className="floating-controls absolute bottom-4 right-4 z-40">
                    {/* Main Control Button */}
                    <button
                      onClick={() => setShowFloatingControls(!showFloatingControls)}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 mb-2 min-h-[56px] min-w-[56px] flex items-center justify-center"
                      title="Game Controls"
                    >
                      <i className="fas fa-gamepad text-xl"></i>
                    </button>

                    {/* Expanded Controls */}
                    {showFloatingControls && (
                      <div className="absolute bottom-full right-0 mb-2 bg-gray-800 bg-opacity-95 rounded-lg shadow-xl p-2 min-w-[160px]">
                        {/* Game Info */}
                        <div className="text-white text-sm mb-3 px-2">
                          <p className="font-bold truncate">{gamesData[0]?.title}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star text-xs ${i < Math.floor(gamesData[0]?.rating ?? 0) ? 'text-yellow-400' : 'text-gray-400'}`}
                              ></i>
                            ))}
                            <span className="text-xs ml-1">{gamesData[0]?.rating?.toFixed(1)}</span>
                          </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => setIsLiked(!isLiked)}
                            className="flex items-center text-white hover:bg-gray-700 px-4 py-3 rounded text-sm transition-colors min-h-[44px]"
                          >
                            <i className={`fas fa-heart mr-2 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}></i>
                            {isLiked ? 'Liked' : 'Like'}
                          </button>

                          <button
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            className="flex items-center text-white hover:bg-gray-700 px-4 py-3 rounded text-sm transition-colors min-h-[44px]"
                          >
                            <i className="fas fa-share-alt mr-2 text-blue-400"></i>
                            Share
                          </button>

                          <button
                            onClick={handleFullscreen}
                            className="flex items-center text-white hover:bg-gray-700 px-4 py-3 rounded text-sm transition-colors min-h-[44px]"
                          >
                            <i className="fas fa-expand-arrows-alt mr-2 text-green-400"></i>
                            Fullscreen
                          </button>

                          <button
                            onClick={reloadGame}
                            className="flex items-center text-white hover:bg-gray-700 px-4 py-3 rounded text-sm transition-colors min-h-[44px]"
                          >
                            <i className="fas fa-redo mr-2 text-orange-400"></i>
                            Reload
                          </button>
                        </div>

                        {/* Share Menu for Mobile */}
                        {showShareMenu && (
                          <div className="mt-2 pt-2 border-t border-gray-600">
                            <button
                              onClick={() => handleShare('copy')}
                              className="flex items-center w-full text-white hover:bg-gray-700 px-4 py-3 rounded text-sm transition-colors min-h-[44px]"
                            >
                              <i className="fas fa-link text-blue-400 mr-2"></i> Copy Link
                            </button>
                            <button
                              onClick={() => handleShare('facebook')}
                              className="flex items-center w-full text-white hover:bg-gray-700 px-4 py-3 rounded text-sm transition-colors min-h-[44px]"
                            >
                              <i className="fab fa-facebook text-blue-400 mr-2"></i> Facebook
                            </button>
                            <button
                              onClick={() => handleShare('twitter')}
                              className="flex items-center w-full text-white hover:bg-gray-700 px-4 py-3 rounded text-sm transition-colors min-h-[44px]"
                            >
                              <i className="fab fa-twitter text-blue-400 mr-2"></i> Twitter
                            </button>
                            <button
                              onClick={() => handleShare('whatsapp')}
                              className="flex items-center w-full text-white hover:bg-gray-700 px-4 py-3 rounded text-sm transition-colors min-h-[44px]"
                            >
                              <i className="fab fa-whatsapp text-green-400 mr-2"></i> WhatsApp
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className={`game-footer text-white flex justify-between items-center p-4 ${isMobile ? 'hidden' : ''}`}>
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
                      className={`${showShareMenu ? '' : 'hidden'} absolute bottom-full right-0 mb-2 bg-[#33b3fa] rounded-lg shadow-lg p-2 w-48 z-10`}
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
            <div className="w-full lg:w-80 space-y-4">
              {hasSidebarAd && (
                <div className="rounded-lg border border-gray-100 shadow-sm p-2 bg-white">
                  <AdUnit slot={ADSENSE_TOP_SLOT} className="my-0" />
                </div>
              )}
              <HotGame />
            </div>
          </div>
        </div>
      </section>

      <TopPicksGame />
    </div>
  );
}

