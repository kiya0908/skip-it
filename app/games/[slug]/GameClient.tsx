"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import TopPicksGame from '../../components/TopPicksGame';
import HotGame from '../../components/HotGame';
import RelatedGames from '../../components/RelatedGames';//导入ralatedgame组件
import Comments from '../../components/Comments'; // 导入评论组件

interface Game {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  playUrl: string;
  youtube: string;
  howToPlay: string[];
  features: string[];
  rating: number;
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
}

export default function GameClient({ game }: { game: Game }) {
  console.log('GameClient received:', game);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(undefined); // defer iframe src until visible
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // State for the like button
  const [isMobile, setIsMobile] = useState(false); // State for mobile detection
  const [showFloatingControls, setShowFloatingControls] = useState(false); // State for floating controls

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const shareBtnRef = useRef<HTMLButtonElement>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const fullscreenBtnRef = useRef<HTMLButtonElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null); // Ref for the game container div
  // Defer setting iframe src until container is visible
  useEffect(() => {
    if (!game?.playUrl) return;
    if (!gameContainerRef.current) return;

    let observer: IntersectionObserver | null = null;
    const node = gameContainerRef.current;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLoading(true);
          setLoadError(false);
          setCurrentSrc((prev) => prev ?? game.playUrl);
          observer && observer.unobserve(node);
        }
      });
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(onIntersect, { root: null, rootMargin: '0px', threshold: 0.01 });
      observer.observe(node);
    } else {
      setCurrentSrc((prev) => prev ?? game.playUrl);
    }

    return () => {
      if (observer && node) observer.unobserve(node);
    };
  }, [game?.playUrl]);


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
    console.error("Iframe failed to load content for URL:", game.playUrl);
    console.log("可能的原因:");
    console.log("1. X-Frame-Options 或 CSP 限制");
    console.log("2. 网络连接问题");
    console.log("3. URL不可访问");
    console.log("4. HTTPS/HTTP协议混合问题");
    
    // 检查当前协议
    console.log("当前页面协议:", window.location.protocol);
    console.log("游戏URL协议:", game.playUrl?.startsWith('https') ? 'https:' : 'http:');
  };

  const reloadGame = () => {
    setIsLoading(true);
    setLoadError(false);
    if (iframeRef.current) {
      const timestamp = new Date().getTime();
      const url = game.playUrl + (game.playUrl.includes('?') ? '&' : '?') + 'timestamp=' + timestamp;
      // Update state so SSR hydration stays consistent
      setCurrentSrc(url);
    }
  };

  // Fullscreen Handler
  const handleFullscreen = useCallback(() => {
    if (gameContainerRef.current) {
      if (!document.fullscreenElement) {
        if (gameContainerRef.current.requestFullscreen) {
          gameContainerRef.current.requestFullscreen();
        } else if ((gameContainerRef.current as any).webkitRequestFullscreen) { // For Safari
          (gameContainerRef.current as any).webkitRequestFullscreen();
        } else if ((gameContainerRef.current as any).msRequestFullscreen) { // For IE/Edge
          (gameContainerRef.current as any).msRequestFullscreen();
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
  }, []);

  // Share Handler
  const handleShare = useCallback((platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`Play ${game.title} Online for Free!`);

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
    // Close share menu after sharing (except for 'like', which is handled by its own click)
    setShowShareMenu(false);
  }, [game.title]); // Dependency on game.title to ensure 'title' is up-to-date

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
  }, [showShareMenu]); // Dependency on showShareMenu to ensure listener is active when needed

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

  const renderDescriptionParagraphs = useCallback((description: string) => {
    if (!description) return null;
    const normalized = description
      .replace(/\r?\n+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    const segments = normalized.split(/(?<=\.)\s+(?=[A-Z<])/g);

    return segments
      .filter(Boolean)
      .map((segment, idx) => (
        <p
          key={`desc-${idx}`}
          className="text-base text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: segment }}
        />
      ));
  }, []);
  return (
    <main className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
      {/* 游戏区域 */}
      <section id="play" className="py-6 bg-white">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-8">
          <h1 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-6">
            <a href={`/games/${game.slug}`} className="text-gray-900 hover:underline">{game.title}</a>
          </h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden min-w-0">
              {/* 游戏区域 */}
              <div ref={gameContainerRef} className={`game-container relative w-full bg-gray-900 ${
                isMobile ? 'h-[80vh]' : 'aspect-video'
              }`}>
                {/* Loading Indicator */}
                <div
                  id="game-loading"
                  className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center text-white"
                  style={{ display: isLoading ? 'flex' : 'none', zIndex: 30 }}
                >
                  <svg className="animate-spin h-10 w-10 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>Loading Game...</p>
                </div>
                {/* Error Message */}
                <div
                  id="game-error"
                  className="absolute inset-0 bg-red-800 bg-opacity-90 text-white flex flex-col items-center justify-center text-center p-4"
                  style={{ display: loadError ? 'flex' : 'none', zIndex: 20 }}
                >
                  <p className="mb-4 text-lg">Oops! An error occurred while loading the game.</p>
                  <button
                    id="reload-game"
                    className="bg-white text-red-700 hover:bg-gray-200 font-bold py-2 px-4 rounded mb-2 transition-colors"
                    onClick={reloadGame}
                  >
                    Try Again
                  </button>
                </div>
                {/* 游戏iframe */}
                {currentSrc && (
                  <iframe
                    id="game-iframe"
                    ref={iframeRef}
                    src={currentSrc}
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

                {/* Floating Controls for Mobile */}
                {isMobile && (
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
                          <p className="font-bold truncate">{game.title}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star text-xs ${i < Math.floor(game.rating ?? 0) ? 'text-yellow-400' : 'text-gray-400'}`}
                              ></i>
                            ))}
                            <span className="text-xs ml-1">{game.rating?.toFixed ? game.rating.toFixed(1) : game.rating}</span>
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
                  <p className="text-xl font-bangers mr-4 text-gray-900">{game.title}</p>
                  <div className="star-rating">
                    <div className="flex mr-2">
                      {/* Render stars based on game.rating */}
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < Math.floor(game.rating) ? 'text-yellow-300' : 'text-gray-300'}`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-xl text-gray-900">{game.rating}</span>
                    
                  
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
            {/* Hotgames 区域，和首页gamesection一致 */}
            <div className="w-full lg:w-80 space-y-6">
              <HotGame />
            </div>
          </div>
        </div>
      </section>

      {/* TopPicksGame 区域，和首页一致 */}
      <TopPicksGame />

      {/* 游戏内容综合区域 */}
      <section className="py-8 bg-white" id="about">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
          {/* 关于游戏部分 */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 id="about" className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">
                <a href="#about" className="text-gray-900 hover:underline">About {game.title}</a>
              </h2>
              <div className="max-w-5xl mx-auto space-y-4 text-left">
                {renderDescriptionParagraphs(game.description)}
              </div>
            </div>
          </div>

          {/* 如何游玩部分 */}
          <div className="mb-16" id="how-to-play">
            <div className="text-center mb-8">
              <h2 id="how-to-play" className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">
                <a href="#how-to-play" className="text-gray-900 hover:underline">How to Play {game.title}</a>
              </h2>
            </div>
            <div className="shadcn-card p-6 border border-gray-200 rounded-lg max-w-5xl mx-auto">
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base">
                {game.howToPlay.map((step: string, idx: number) => <li key={idx} dangerouslySetInnerHTML={{ __html: step }} />)}
              </ol>
              <p className="mt-6 text-base text-gray-600">
                Want to master more games? Visit our <a href="/games" className="text-blue-600 hover:underline">All Games</a> page for more fun baseball experiences.
              </p>
            </div>
          </div>

          {/* 游戏特点部分 */}
          <div className="mb-16" id="features">
            <div className="text-center mb-8">
              <h2 id="features" className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">
                <a href="#features" className="text-gray-900 hover:underline">Special Features</a>
              </h2>
            </div>
            <div className="shadcn-card p-6 border border-gray-200 rounded-lg max-w-5xl mx-auto">
              <ul className="space-y-2">
                {game.features.map((f: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 text-lg mr-3 mt-0.5"></i>
                    <span dangerouslySetInnerHTML={{ __html: f }} />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base text-gray-600">
                Looking for more unique games? Explore our <a href="/games" className="text-blue-600 hover:underline">full collection</a>.
              </p>
            </div>
          </div>
          {/*Comments 组件 */}
          <div>
            <Comments />
          </div>
            {/* RelatedGames 组件 */}
            <div>
              <RelatedGames />
            </div>
        </div>
      </section>
    </main>
  );
}
