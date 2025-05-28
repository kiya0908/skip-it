//主页面的游戏区域
"use client";

import React, { useState, useEffect, useRef } from 'react';
import gamesData from '../data/games.json'; // 调整路径

export default function GameSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameUrl, setGameUrl] = useState<string | undefined>(undefined);
  const [loadError, setLoadError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
  };

  const reloadGame = () => {
    if (gamesData && gamesData.length > 0 && gamesData[0].playUrl) {
      setGameUrl(gamesData[0].playUrl + (gamesData[0].playUrl.includes('?') ? '&' : '?') + 'timestamp=' + new Date().getTime());
      setIsLoading(true);
      setLoadError(false);
    }
  };

  return (
    <section id="play" className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-6">Doodle Baseball Game</h1>
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
                <p className="mb-4 text-lg">Oops! Game loading error.</p>
                <button
                  id="reload-game"
                  className="bg-white text-red-700 hover:bg-gray-200 font-bold py-2 px-4 rounded mb-2 transition-colors"
                  onClick={reloadGame}
                >
                  Try Again
                </button>
              </div>
              {/* 游戏iframe */}
              {gameUrl && (
                <iframe
                  id="game-iframe"
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
            <div className="game-footer text-white flex justify-between items-center">
              <div className="flex items-center">
                <p className="text-xl font-bangers mr-4 text-gray-900">Doodle Baseball</p>
                <div className="star-rating">
                  <div className="flex mr-2">
                    <i className="fas fa-star text-yellow-300"></i>
                    <i className="fas fa-star text-yellow-300"></i>
                    <i className="fas fa-star text-yellow-300"></i>
                    <i className="fas fa-star text-yellow-300"></i>
                    <i className="fas fa-star text-yellow-300"></i>
                  </div>
                  <span className="text-xl text-gray-900">{gamesData[0].rating}</span>
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
  );
}