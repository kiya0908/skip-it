"use client";
import React, { useState, useEffect, useRef } from 'react';
import gamesData from '@/data/games.json';
import HotGame from '@/app/components/HotGame';
import TopPicksGame from '@/app/components/TopPicksGame';

interface Game {
  slug: string;
  title: string;
  playUrl: string;
  rating: number;
  coverImage: string;
}

export default function GameSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameUrl, setGameUrl] = useState<string | undefined>(undefined);
  const [loadError, setLoadError] = useState(false);
  // 完全移除：加载进度状态，回到原始简单状态
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (gamesData && gamesData.length > 0) {
      const firstGame = gamesData[0];
      if (firstGame && firstGame.playUrl) {
        setGameUrl(firstGame.playUrl);
        setLoadError(false);
        
        // 移除：预加载机制，可能导致冲突和性能问题
        
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
    // 完全移除：所有进度相关逻辑
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
    console.error("Iframe failed to load content for URL:", gameUrl);
  };

  const reloadGame = () => {
    if (gamesData && gamesData.length > 0 && gamesData[0].playUrl) {
      setGameUrl(gamesData[0].playUrl + (gamesData[0].playUrl.includes('?') ? '&' : '?') + 'timestamp=' + new Date().getTime());
      setIsLoading(true);
      setLoadError(false);
      // 完全移除：所有进度相关逻辑
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section id="play" className="py-6 bg-white">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
          <h1 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-6">Doodle Baseball Game</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden min-w-0">
              <div className="game-container relative w-full aspect-video bg-gray-900">
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
                    // 移除：复杂的iframe属性，恢复简单配置提高加载速度
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    style={{ display: isLoading || loadError ? 'none' : 'block' }}
                  ></iframe>
                )}
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bangers text-gray-900">{gamesData[0].title}</h2>
                  <div className="flex items-center">
                    <div className="flex mr-2 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.round(gamesData[0]?.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                      ))}
                    </div>
                    <span className="text-lg text-gray-900">{gamesData[0].rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  {/* Share and Fullscreen buttons can be added here */}
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

