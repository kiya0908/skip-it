import React from 'react'; // React, useState, useEffect, useRef 不再需要在这里导入
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
// import gamesData from '.././data/games.json'; // gamesData 将在 GameSection 中导入
import GameSection from './GameSection'; // 导入新的客户端组件
import TopPicksGame from './components/TopPicksGame'; // 导入toppicksgame组件

// 为页面添加元数据
export const metadata: Metadata = {
  title: 'Doodle Baseball | Fun Food Baseball Game',
  description: 'Play the addictive Doodle Baseball game online for free! Swing your bat, hit home runs in this fun food-themed baseball simulator. Test your timing & reflexes!',
  keywords: 'doodle baseball, baseball game, free game, online game, baseball simulator, fun game, sports game',
  openGraph: {
    title: 'Doodle Baseball Game | Play Online for Free',
    description: 'Take up the bat and strike as many balls as possible in this delicious food-themed baseball game. Test your reflexes and timing!',
    images: [
      {
        url: 'https://doodlebaseball.info/index.png',
        width: 1200,
        height: 630,
        alt: 'Doodle Baseball',
      },
    ],
    url: 'https://doodlebaseball.info/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://doodlebaseball.info',
  },
  robots: "index, follow",
};

// JSON-LD 结构化数据
const gameJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Doodle Baseball Game",
  "url": "https://doodlebaseball.info/",
  "description": "Play the addictive Doodle Baseball game online for free! Swing your bat and hit home runs in this fun food-themed baseball simulator. Test your timing & reflexes!",
  "genre": ["Sports Game", "Casual Game", "Arcade Game"],
  "playPlatform": "WebBrowser",
  "applicationCategory": "Game",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.36", 
    "bestRating": "5",
    "ratingCount": "1" 
  },
  "image": "https://doodlebaseball.info/index.png" 
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I play Doodle Baseball?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click the batting button to start, then click again when the ball approaches to swing your bat. Time it right to hit the ball and score runs!"
      }
    },
    {
      "@type": "Question",
      "name": "What's the goal of the game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hit as many balls as possible to score runs. A player scores by completing a circuit around all four bases. Try to avoid strikes (missing the ball) as three strikes will end your game."
      }
    },
    {
      "@type": "Question",
      "name": "What's the highest score possible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There's no limit to how many runs you can score! The historical record for a real baseball game was 49 runs, but in Doodle Baseball, you can keep going as long as you avoid strikes."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any special moves or power-ups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The game focuses on timing and reflexes rather than power-ups. However, hitting a home run (when the ball goes into the seating area) allows all players on bases to complete their runs, scoring up to 4 runs at once!"
      }
    },
    {
      "@type": "Question",
      "name": "Why are the players food items?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The game was created to celebrate American Independence Day, featuring favorite summer foods and snacks that people enjoy while watching baseball games. It adds a fun and whimsical touch to the classic sport!"
      }
    }
  ]
};

export default function HomePage() {
  // const [isLoading, setIsLoading] = useState(true); // 状态移至 GameSection
  // const [gameUrl, setGameUrl] = useState<string | undefined>(undefined); // 状态移至 GameSection
  // const [loadError, setLoadError] = useState(false); // 状态移至 GameSection
  // const iframeRef = useRef<HTMLIFrameElement>(null); // Ref 移至 GameSection

  // useEffect(() => { ... }); // Effect 移至 GameSection

  // const handleIframeLoad = () => { ... }; // 函数移至 GameSection
  // const handleIframeError = () => { ... }; // 函数移至 GameSection
  // const reloadGame = () => { ... }; // 函数移至 GameSection

  return (
    <>
      {/* 添加结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <GameSection /> {/* 使用新的客户端组件渲染游戏区域 */}
      <TopPicksGame /> {/* TopPicksGame组件显示在游戏iframe区域下方 */}

      {/* 游戏内容综合区域 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 关于游戏部分 */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">About Doodle Baseball Game</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover why millions of players worldwide love this exciting doodle baseball game that combines classic sports action with unique food-themed characters!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-baseball-ball text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Authentic Baseball Experience</h3>
                <p className="text-gray-600">
                  The doodle baseball game captures the essence of America's favorite pastime with realistic physics and engaging gameplay. Play the doodle baseball game online anytime to enjoy the ultimate baseball simulation experience!
                </p>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-gamepad text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy to Learn, Hard to Master</h3>
                <p className="text-gray-600">
                  This doodle baseball game features intuitive one-button controls that anyone can pick up instantly. However, mastering the perfect swing timing in the doodle baseball game requires practice and skill, making it endlessly entertaining.
                </p>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-hamburger text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Unique Character Design</h3>
                <p className="text-gray-600">
                  Our doodle baseball game stands out with its deliciously creative food-themed characters. From hot dogs to burgers, every player in this doodle baseball game online brings their own special personality and style to the diamond!
                </p>
              </div>
            </div>
          </div>

          {/* 如何玩游戏部分 */}
          <div className="mb-16" id="how-to-play">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bangers font-bold mb-4 text-center text-gray-900 tracking-wide">How to Play Doodle Baseball Online</h2>
              <p className="text-lg text-center text-gray-700 mb-10 max-w-4xl mx-auto">
                Learn how to play <strong>Doodle Baseball</strong> and master this fun, food-themed <strong>baseball game online</strong>! Follow these simple steps and watch the video tutorial to become a home run champion.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* 文字指南 */}
              <div className="text-left md:pr-5 shadcn-card p-6 border border-gray-200 rounded-lg">
                <ol className="list-decimal list-inside text-lg text-gray-700 space-y-1">
                  <li><strong>Start the Game:</strong> Click the "Play Now" button to launch <strong>Doodle Baseball</strong> instantly in your browser.</li>
                  <li><strong>Wait for the Pitch:</strong> The peanut pitcher will throw a food-themed baseball (hot dog, popcorn, etc.). Watch the pitcher's hat color for hints about the ball's movement.</li>
                  <li><strong>Swing the Bat:</strong> Click your mouse or tap the screen at the perfect moment to swing. Timing is crucial—swing too early or too late and you'll get a strike!</li>
                  <li><strong>Score Runs:</strong> Hit the ball to score points. Aim for home runs to maximize your score in this addictive <strong>baseball game</strong>.</li>
                  <li><strong>Avoid Strikes:</strong> Three strikes and the game is over. Keep practicing to improve your reflexes and beat your high score!</li>
                </ol>
                <p className="mt-6 text-base text-gray-600">
                  <strong>Tip:</strong> Each pitcher's hat color in <strong>Doodle Baseball</strong> signals a different pitch style. Learn the patterns to anticipate the ball and hit more home runs!
                </p>
              </div>
              {/* YouTube视频嵌入 */}
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-full aspect-video max-w-lg rounded-lg shadow-lg overflow-hidden">
                  <iframe width="680" height="400" src="https://www.youtube.com/embed/-ZeX-L9x9mA?si=15bk1pNG_jvF4kO5" title="How to Play Doodle Baseball - Video Tutorial" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full h-64 md:h-80"></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* 游戏特点部分 */}
          <div className="mb-16" id="features">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-12 tracking-wide">Special Features of Doodle Baseball</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Pitcher's Hat Colors</h3>
                <p className="text-gray-600 mb-6">
                  The peanut pitcher changes his throwing style based on his hat color:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center mr-3 mt-0.5"></span>
                    <span><strong>White Hat:</strong> Straight ball, easiest to hit for home runs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5"></span>
                    <span><strong>Blue Hat:</strong> Curved ball that takes longer to reach you</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-0.5"></span>
                    <span><strong>Green Hat:</strong> Swirling motion ball that's harder to hit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center mr-3 mt-0.5"></span>
                    <span><strong>Yellow Hat:</strong> Zig-zag motion ball that moves faster</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-0.5"></span>
                    <span><strong>Purple Hat:</strong> Invisible ball that disappears midway</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5"></span>
                    <span><strong>Red Hat:</strong> Super fast straight ball, nearly impossible to hit</span>
                  </li>
                </ul>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Meet the Food Players</h3>
                <p className="text-gray-600 mb-6">
                  Your team consists of American summer favorites, each with their own personality:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-hotdog text-red-500 text-xl mr-3 mt-0.5"></i>
                    <span><strong>H-Dog:</strong> The star hot dog player, ready to hit home runs</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-hamburger text-yellow-700 text-xl mr-3 mt-0.5"></i>
                    <span><strong>Sluggin' Sirloin:</strong> The powerful burger batter</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-ice-cream text-pink-400 text-xl mr-3 mt-0.5"></i>
                    <span><strong>Scoop 'n Score:</strong> The ice cream speedster</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-pizza-slice text-orange-500 text-xl mr-3 mt-0.5"></i>
                    <span><strong>Pizza Pitch:</strong> The reliable pizza slice pitcher</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-cookie text-yellow-600 text-xl mr-3 mt-0.5"></i>
                    <span><strong>Cookie Catch:</strong> The cookie outfielder with amazing jumps</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ部分 */}
          <div id="faq">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-12 tracking-wide">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How do I play Doodle Baseball?</h3>
                <p className="text-gray-600">
                  Click the batting button to start, then click again when the ball approaches to swing your bat. Time it right to hit the ball and score runs!
                </p>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What's the goal of the game?</h3>
                <p className="text-gray-600">
                  Hit as many balls as possible to score runs. A player scores by completing a circuit around all four bases. Try to avoid strikes (missing the ball) as three strikes will end your game.
                </p>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What's the highest score possible?</h3>
                <p className="text-gray-600">
                  There's no limit to how many runs you can score! The historical record for a real baseball game was 49 runs, but in Doodle Baseball, you can keep going as long as you avoid strikes.
                </p>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Are there any special moves or power-ups?</h3>
                <p className="text-gray-600">
                  The game focuses on timing and reflexes rather than power-ups. However, hitting a home run (when the ball goes into the seating area) allows all players on bases to complete their runs, scoring up to 4 runs at once!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 客户端脚本 */}
      <script id="game-script" dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          // 游戏加载逻辑
          const gameIframe = document.getElementById('game-iframe');
          const gameLoading = document.getElementById('game-loading');
          const gameError = document.getElementById('game-error');
          const reloadGame = document.getElementById('reload-game');
          const shareBtn = document.getElementById('share-btn');
          const shareMenu = document.getElementById('share-menu');
          const fullscreenBtn = document.getElementById('fullscreen-btn');
          const shareButtons = document.querySelectorAll('.share-button');
          
          // 设置游戏源
          const gameSource = 'https://www.addictinggames.com/embed/html5-games/24972';
          
          // 加载游戏
          function loadGame() {
            if (gameLoading) gameLoading.style.display = 'flex';
            if (gameError) gameError.style.display = 'none';
            
            gameIframe.src = gameSource;
            
            gameIframe.onload = function() {
              if (gameLoading) gameLoading.style.display = 'none';
            };
            
            gameIframe.onerror = function() {
              if (gameLoading) gameLoading.style.display = 'none';
              if (gameError) gameError.style.display = 'flex';
            };
          }
          
          // 初始加载
          loadGame();
          
          // 重新加载游戏
          if (reloadGame) {
            reloadGame.addEventListener('click', loadGame);
          }
          
          // 分享菜单
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
                const title = encodeURIComponent('Play Doodle Baseball Game Online for Free!');
                
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

    </>
  );
}
