import React from 'react'; // React, useState, useEffect, useRef 不再需要在这里导入
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
// import gamesData from '.././data/games.json'; // gamesData 将在 GameSection 中导入
import GameSection from './GameSection'; // 导入新的客户端组件
import TopPicksGame from './components/TopPicksGame'; // 导入toppicksgame组件

// 为页面添加元数据
export const metadata: Metadata = {
  title: 'Doodle Baseball | Fun Food Baseball Game Online Free',
  description: 'Play the addictive Doodle Baseball game online for free! Swing your bat, hit home runs in this fun food-themed baseball simulator. Test your timing & reflexes!',
  keywords: 'doodle baseball, baseball game, food baseball, online free, baseball simulator, unlocked game, sports game',
  openGraph: {
    title: 'Doodle Baseball Game | Fun Food Baseball Game Online Free',
    description: 'Play the addictive Doodle Baseball game online for free! Swing your bat, hit home runs in this fun food-themed baseball simulator. Test your timing & reflexes!',
    images: [
      {
        url: 'https://doodlebaseball.info/doodlebaseball.png',
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
  "image": "https://doodlebaseball.info/doodlebaseball.png" 
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to play Doodle Baseball?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As soon as the doodle game is opened, you may begin playing with your engaging food teammates. The next step is to click on the baseball button to start the game. Then, if you coincide your swing time with the throwing of pitchers, you can hit the ball and gain scores."
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
        "text": "In doodle baseball, there's no maximum score—you can keep playing this food baseball game for as long as you avoid strikes. Unlike traditional baseball records, where the highest score is 49 runs, doodle baseball lets you chase endless high scores. This makes doodle baseball free a thrilling challenge for players who want to beat their own records over and over again."
      }
    },
    {
      "@type": "Question",
      "name": "Why are the players food items?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The game was created to celebrate American Independence Day, featuring favorite summer foods and snacks that people enjoy while watching baseball games. It adds a fun and whimsical touch to the classic sport!"
      }
    },
    {
      "@type": "Question",
      "name": "Are there any tricks to win Doodle Baseball?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While doodle baseball doesn't include complicated power-ups, players can improve in this food baseball game by focusing on timing and sharp reflexes. The best tip is to aim for home runs in doodle baseball, which send the ball into the crowd and score up to 4 runs at once if all bases are loaded. Practicing and enjoying doodle baseball free will help you master timing and boost your scores in this lively food baseball game."
      }
    }
  ]
};

// 面包屑导航数据
const breadcrumbs = [
  { name: 'Home', href: '/', current: true },
];

export default function HomePage() {
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
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
              Doodle Baseball is an exciting and engaging doodle baseball game that brings players into a playful world where America's favorite pastime meets quirky food characters. This food baseball game offers a delightful twist to the traditional sport, making doodle baseball not just a sport simulation, but also a fun-filled adventure suitable for all ages. As you enter the doodle baseball field, you’ll discover a vibrant lineup of classic American snacks, ranging from hotdogs to pretzels, all taking their shot at a home run.
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
                  The doodle baseball game features intuitive one-button controls that anyone can pick up instantly. However, mastering the perfect swing timing in the doodle baseball game requires practice and skill, making it endlessly entertaining.
                </p>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-hamburger text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Unique Character Design</h3>
                <p className="text-gray-600">
                  The doodle baseball game stands out with its deliciously creative food-themed characters. From hot dogs to burgers, every player in this doodle baseball game online brings their own special personality and style to the diamond!
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
                  <iframe width="680" height="400" src="https://www.youtube.com/embed/-ZeX-L9x9mA?si=15bk1pNG_jvF4kO5" title="How to Play Doodle Baseball" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full h-64 md:h-80"></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* 游戏特点部分 */}
          <div className="mb-16" id="features">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-12 tracking-wide">Special Features of Doodle Baseball</h2>
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
              A fun part of doodle baseball is the peanut pitcher, whose hat changes color to indicate his pitching style. A white hat signals a straightforward, easy pitch, perfect for hitting home runs in doodle baseball free mode. Blue indicates a slower, curved ball, while green brings a swirling ball that’s a bit harder to land. If you see a yellow hat, brace yourself for a fast, zig-zagging pitch that really tests your food baseball game skills. Purple makes the ball disappear partway—a truly unique challenge, and red is a super-fast, almost unhittable pitch recognized by all doodle baseball players.
              </p>
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

          {/* Tips and Tricks 部分 */}
          <div className="mb-16" id="tips-and-tricks">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">Tips and Tricks</h2>
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
                To excel at doodle baseball, players need more than luck—they need skillful strategy and quick reflexes. Whether you're new to this playful food baseball game or aiming to set a new high score in doodle baseball free, the following tips can help you master every pitch and swing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-bullseye text-yellow-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Accurate Control</h3>
                <p className="text-gray-600">
                  In doodle baseball, controlling your movements and timing is key. During each pitch, observe the ball's path closely in this food baseball game. Predicting the ball's trajectory in doodle baseball will help you make more accurate swings and boost your overall score. The more you practice doodle baseball, the more skilled you'll become at making contact and racking up runs.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-hat-wizard text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Strategic Selection</h3>
                <p className="text-gray-600">
                  Doodle baseball introduces an added layer of challenge with different hat colors signifying each pitching style. In this food baseball game, it's crucial to pay attention to the hat colors for strategic swing timing. For instance, if the doodle baseball pitcher sports a red hat, get ready for a super-fast straight pitch—almost impossible to hit. Be patient and wait for pitches that are easier to handle, especially when playing doodle baseball free and aiming for a high score.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-bolt text-teal-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Quick Reaction</h3>
                <p className="text-gray-600">
                  One of the most important skills in doodle baseball is developing a lightning-quick reaction. This food baseball game rewards players who can respond instantly to unexpected pitch types and speeds. Sharpening your reflexes through regular practice in doodle baseball free will dramatically increase your batting average, letting you climb the leaderboard in this fun food baseball game.
                </p>
              </div>
            </div>
            <p className="text-center text-lg text-gray-600 mt-10 max-w-6xl mx-auto">
              By combining accurate control, smart decisions, and quick reflexes, you'll become a true champion in doodle baseball. Keep playing doodle baseball free, and enjoy the uniquely charming food baseball game experience that fans everywhere can't stop talking about!
            </p>
          </div>

          {/* FAQ部分 */}
          <div id="faq">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-12 tracking-wide">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How to play Doodle Baseball?</h3>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>As soon as the doodle game is opened, you may begin playing with your engaging  food teammates.</li>
                  <li>The next step is to click on the baseball button to start the game.</li>
                  <li>Then, if you coincide your swing time with the throwing of pitchers, you can hit the ball and gain scores.</li>
                </ul>
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
                In doodle baseball, there’s no maximum score—you can keep playing this food baseball game for as long as you avoid strikes. Unlike traditional baseball records, where the highest score is 49 runs, doodle baseball lets you chase endless high scores. This makes doodle baseball free a thrilling challenge for players who want to beat their own records over and over again.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Why are the players food items?</h3>
                <p className="text-gray-600">
                The game was created to celebrate American Independence Day, featuring favorite summer foods and snacks that people enjoy while watching baseball games. It adds a fun and whimsical touch to the classic sport!
                </p>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Are there any tricks to win Doodle Baseball?</h3>
                <p className="text-gray-600">
                While doodle baseball doesn’t include complicated power-ups, players can improve in this food baseball game by focusing on timing and sharp reflexes. The best tip is to aim for home runs in doodle baseball, which send the ball into the crowd and score up to 4 runs at once if all bases are loaded. Practicing and enjoying doodle baseball free will help you master timing and boost your scores in this lively food baseball game.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



    </>
  );
}
