"use client";

import React, { useState, useRef, useEffect } from 'react';
import TopPicksGame from '../../components/TopPicksGame';

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
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
    console.error("Iframe failed to load content for URL:", game.playUrl);
  };

  const reloadGame = () => {
    setIsLoading(true);
    setLoadError(false);
    if (iframeRef.current) {
      const timestamp = new Date().getTime();
      const url = game.playUrl + (game.playUrl.includes('?') ? '&' : '?') + 'timestamp=' + timestamp;
      iframeRef.current.src = url;
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* 游戏区域 */}
      <section id="play" className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-6 tracking-wide">{game.title}</h1>
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* 游戏区域 */}
              <div className="game-container relative w-full aspect-video bg-gray-900">
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
                <iframe
                  id="game-iframe"
                  ref={iframeRef}
                  src={game.playUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  style={{ display: isLoading || loadError ? 'none' : 'block' }}
                ></iframe>
              </div>
              <div className="game-footer text-white flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-xl font-bangers mr-4 text-gray-900">{game.title}</p>
                  <div className="star-rating">
                    <div className="flex mr-2">
                      <i className="fas fa-star text-yellow-300"></i>
                      <i className="fas fa-star text-yellow-300"></i>
                      <i className="fas fa-star text-yellow-300"></i>
                      <i className="fas fa-star text-yellow-300"></i>
                      <i className="fas fa-star text-yellow-300"></i>
                    </div>
                    <span className="text-xl text-gray-900">{game.rating}</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="footer-btn share-button" data-platform="like" title="Like">
                    <i className="fas fa-heart text-blue-400 text-xl"></i>
                  </button>
                  <div className="relative">
                    <button className="footer-btn" id="share-btn" title="Share">
                      <i className="fas fa-share-alt text-blue-400 text-xl"></i>
                    </button>
                    <div id="share-menu" className="hidden absolute bottom-full right-0 mb-2 bg-[#0c2461] rounded-lg shadow-lg p-2 w-48">
                      <button className="w-full text-left px-3 py-2 hover:bg-[#1e3c72] rounded text-white share-button flex items-center" data-platform="copy">
                        <i className="fas fa-link text-blue-400 mr-2"></i> Copy Link
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-[#1e3c72] rounded text-white share-button flex items-center" data-platform="facebook">
                        <i className="fab fa-facebook text-blue-400 mr-2"></i> Facebook
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-[#1e3c72] rounded text-white share-button flex items-center" data-platform="twitter">
                        <i className="fab fa-twitter text-blue-400 mr-2"></i> Twitter
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-[#1e3c72] rounded text-white share-button flex items-center" data-platform="whatsapp">
                        <i className="fab fa-whatsapp text-blue-400 mr-2"></i> WhatsApp
                      </button>
                    </div>
                  </div>
                  <button className="footer-btn" id="fullscreen-btn" title="Fullscreen">
                    <i className="fas fa-expand-arrows-alt text-blue-400 text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TopPicksGame />

      {/* 游戏内容综合区域 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 关于游戏部分 */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">About {game.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {game.description}
              </p>
            </div>
          </div>
          
          {/* 如何游玩部分 */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">How to Play</h2>
            </div>
            <div className="shadcn-card p-6 border border-gray-200 rounded-lg max-w-3xl mx-auto">
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base">
                {game.howToPlay.map((step: string, idx: number) => <li key={idx}>{step}</li>)}
              </ol>
            </div>
          </div>
          
          {/* 游戏特点部分 */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">Special Features</h2>
            </div>
            <div className="shadcn-card p-6 border border-gray-200 rounded-lg max-w-3xl mx-auto">
              <ul className="space-y-2">
                {game.features.map((f: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 text-lg mr-3 mt-0.5"></i>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* 添加客户端脚本 */}
      <script id="game-script" dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          // 分享菜单
          const shareBtn = document.getElementById('share-btn');
          const shareMenu = document.getElementById('share-menu');
          const fullscreenBtn = document.getElementById('fullscreen-btn');
          const shareButtons = document.querySelectorAll('.share-button');
          
          if (shareBtn && shareMenu) {
            shareBtn.addEventListener('click', function(e) {
              e.stopPropagation();
              shareMenu.classList.toggle('hidden');
            });
            
            document.addEventListener('click', function(e) {
              if (!shareMenu.contains(e.target) && e.target !== shareBtn) {
                shareMenu.classList.add('hidden');
              }
            });
          }
          
          // 全屏功能
          if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', function() {
              const gameContainer = document.querySelector('.game-container');
              
              if (!document.fullscreenElement) {
                if (gameContainer.requestFullscreen) {
                  gameContainer.requestFullscreen();
                } else if (gameContainer.webkitRequestFullscreen) {
                  gameContainer.webkitRequestFullscreen();
                } else if (gameContainer.msRequestFullscreen) {
                  gameContainer.msRequestFullscreen();
                }
              } else {
                if (document.exitFullscreen) {
                  document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
                }
              }
            });
          }
          
          // 分享功能
          if (shareButtons) {
            shareButtons.forEach(button => {
              button.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent('Play ${game.title} Online for Free!');
                
                switch(platform) {
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
                    });
                    break;
                  case 'like':
                    this.classList.toggle('liked');
                    const icon = this.querySelector('i');
                    if (icon.classList.contains('text-blue-400')) {
                      icon.classList.remove('text-blue-400');
                      icon.classList.add('text-red-500');
                    } else {
                      icon.classList.remove('text-red-500');
                      icon.classList.add('text-blue-400');
                    }
                    break;
                }
                
                if (platform !== 'like') {
                  shareMenu.classList.add('hidden');
                }
              });
            });
          }
        });
      `}} />
      
      
    </main>
  );
}
