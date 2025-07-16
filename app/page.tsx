import React from 'react'; // React, useState, useEffect, useRef 不再需要在这里导入
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
// import gamesData from '.././data/games.json'; // gamesData 将在 GameSection 中导入
import GameSection from './GameSection'; // 导入新的客户端组件
import TopPicksGame from './components/TopPicksGame'; // 导入toppicksgame组件
import HotGame from './components/HotGame'; // 导入hotgame组件
import RelatedGames from './components/RelatedGames';//导入ralatedgame组件
import Comments from './components/Comments'; // 导入评论组件

// 为页面添加元数据
export const metadata: Metadata = {
  title: 'Doodle Baseball|Fourth of July Food Baseball Game Online',
  description: 'Play Doodle Baseball, the ultimate Fourth of July food baseball game! Celebrate Independence Day, hit home runs, and enjoy classic snacks online for free.',
  keywords: '',
  openGraph: {
    title: 'Doodle Baseball|Fourth of July Food Baseball Game Online',
    description: 'Play Doodle Baseball, the ultimate Fourth of July food baseball game! Celebrate Independence Day, hit home runs, and enjoy classic snacks online for free.',
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
  "description": "Play Doodle Baseball, the ultimate Fourth of July food baseball game! Celebrate Independence Day online for free, hit home runs, and enjoy classic American snacks in this fun baseball game.",
  "genre": ["Sports Game", "Casual Game", "Arcade Game","Independence Day Game"],
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
        "text": "This food baseball game was created to celebrate the Fourth of July, American Independence Day.The food characters represent classic snacks people enjoy during holiday baseball games, making Doodle Baseball a perfect Fourth of July baseball experience."
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

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gap-8">
           <div>
            <GameSection />
          </div>
        </div>
      </div>

      {/* 游戏内容综合区域 */}
      <section className="py-16 bg-white">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
          {/* 关于游戏部分 */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">
                About <Link href="#play" className="hover:underline">Doodle Baseball Game</Link>
              </h2>
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
                Originally launched as a <strong>Fourth of July baseball</strong> celebration, <strong>Doodle Baseball</strong> is an exciting game that brings players into a playful world where America's favorite pastime meets quirky food characters. This <strong>food baseball</strong> game offers a delightful twist on the traditional sport, making <strong>Doodle Baseball</strong> not just a simulation, but a fun-filled adventure perfect for the holiday and suitable for all ages. As you enter the <strong>Doodle Baseball</strong> field, you'll discover a vibrant lineup of classic American snacks, all taking their shot at a home run. Whether you're searching for a fun <strong>food baseball game</strong> or a <strong>Fourth of July baseball</strong> experience, Doodle Baseball is the perfect choice for all ages.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-baseball-ball text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Authentic Baseball Experience</h3>
                <p className="text-gray-600">
                  The <strong>Doodle Baseball</strong> game captures the essence of America's favorite pastime with realistic physics and engaging gameplay. Play the <strong>Doodle Baseball</strong> game online anytime to enjoy the ultimate baseball simulation experience!
                </p>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-gamepad text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy to Learn, Hard to Master</h3>
                <p className="text-gray-600">
                  The <strong>Doodle Baseball</strong> game features intuitive one-button controls that anyone can pick up instantly. However, mastering the perfect swing timing in the <strong>Doodle Baseball</strong> game requires practice and skill, making it endlessly entertaining.
                </p>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-hamburger text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Unique Character Design</h3>
                <p className="text-gray-600">
                  The <strong>Doodle Baseball</strong> game stands out with its deliciously creative food-themed characters. From hot dogs to burgers, every player in this <strong>Doodle Baseball</strong> game online brings their own special personality and style to the diamond!
                </p>
              </div>
            </div>
          </div>

          {/* 如何玩游戏部分 */}
          <div className="mb-16" id="how-to-play">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold mb-4 text-center text-gray-900 tracking-wide">
                How to Play <Link href="#play" className="hover:underline">Doodle Baseball Online</Link>
              </h2>
              <p className="text-lg text-center text-gray-700 mb-10 max-w-4xl mx-auto">
                Learn how to play <strong>Doodle Baseball</strong> and master this fun, food-themed <strong>fourth of july baseball</strong> game! Follow these simple steps and watch the video tutorial to become a home run champion. Enjoy the festive <strong>Fourth of July baseball</strong> atmosphere as you swing for the fences!
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
              <h2 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-12 tracking-wide">
                Special Features of <Link href="#features" className="hover:underline">Doodle Baseball</Link>
              </h2>
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
              A fun part of <strong>Doodle Baseball</strong> is the peanut pitcher, whose hat changes color to indicate his pitching style. A white hat signals a straightforward, easy pitch, perfect for hitting home runs in <strong>Doodle Baseball</strong> free mode. Blue indicates a slower, curved ball, while green brings a swirling ball that's a bit harder to land. If you see a yellow hat, brace yourself for a fast, zig-zagging pitch that really tests your food baseball game skills. Purple makes the ball disappear partway—a truly unique challenge, and red is a super-fast, almost unhittable pitch recognized by all <strong>Doodle Baseball</strong> players.
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
              <h2 className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">
                Tips and Tricks for <Link href="#tips-and-tricks" className="hover:underline">Food Baseball</Link>
              </h2>
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
                To excel at <strong>Doodle Baseball</strong>, players need more than luck—they need skillful strategy and quick reflexes. Whether you're new to this playful food baseball game or aiming to set a new high score in <strong>Doodle Baseball</strong> free, the following tips can help you master every pitch and swing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-bullseye text-yellow-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Accurate Control</h3>
                <p className="text-gray-600">
                  In <strong>Doodle Baseball</strong>, controlling your movements and timing is key. During each pitch, observe the ball's path closely in this food baseball game. Predicting the ball's trajectory in <strong>Doodle Baseball</strong> will help you make more accurate swings and boost your overall score. The more you practice <strong>Doodle Baseball</strong>, the more skilled you'll become at making contact and racking up runs.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-hat-wizard text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Strategic Selection</h3>
                <p className="text-gray-600">
                  <strong>Doodle Baseball</strong> introduces an added layer of challenge with different hat colors signifying each pitching style. In this food baseball game, it's crucial to pay attention to the hat colors for strategic swing timing. For instance, if the <strong>Doodle Baseball</strong> pitcher sports a red hat, get ready for a super-fast straight pitch—almost impossible to hit. Be patient and wait for pitches that are easier to handle, especially when playing <strong>Doodle Baseball</strong> free and aiming for a high score.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-bolt text-teal-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Quick Reaction</h3>
                <p className="text-gray-600">
                  One of the most important skills in <strong>Doodle Baseball</strong> is developing a lightning-quick reaction. This food baseball game rewards players who can respond instantly to unexpected pitch types and speeds. Sharpening your reflexes through regular practice in <strong>Doodle Baseball</strong> free will dramatically increase your batting average, letting you climb the leaderboard in this fun food baseball game.
                </p>
              </div>
            </div>
            <p className="text-center text-lg text-gray-600 mt-10 max-w-6xl mx-auto">
              By combining accurate control, smart decisions, and quick reflexes, you'll become a true champion in <strong>Doodle Baseball</strong>. Keep playing <strong>Doodle Baseball</strong> free, and enjoy the uniquely charming food baseball game experience that fans everywhere can't stop talking about!
            </p>
          </div>

          {/* FAQ部分 */}
          <div id="faq">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-12 tracking-wide">
                Frequently Asked Questions about <Link href="#faq" className="hover:underline">Doodle Baseball</Link>
              </h2>
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
                In <strong>Doodle Baseball</strong>, there's no maximum score—you can keep playing this food baseball game for as long as you avoid strikes. Unlike traditional baseball records, where the highest score is 49 runs, <strong>Doodle Baseball</strong> lets you chase endless high scores. This makes <strong>Doodle Baseball</strong> free a thrilling challenge for players who want to beat their own records over and over again.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Why are the players food items?</h3>
                <p className="text-gray-600">
                  This <strong>food baseball</strong> game was created to celebrate the <strong>Fourth of July</strong>, American Independence Day. The food characters represent the classic summer snacks people enjoy while watching baseball games, making <strong>Doodle Baseball</strong> a perfect <strong>Fourth of July baseball</strong> experience and a fun, whimsical touch to the classic sport!
                </p>
              </div>
              
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Are there any tricks to win Doodle Baseball?</h3>
                <p className="text-gray-600">
                While <strong>Doodle Baseball</strong> doesn't include complicated power-ups, players can improve in this food baseball game by focusing on timing and sharp reflexes. The best tip is to aim for home runs in <strong>Doodle Baseball</strong>, which send the ball into the crowd and score up to 4 runs at once if all bases are loaded. Practicing and enjoying <strong>Doodle Baseball</strong> free will help you master timing and boost your scores in this lively food baseball game.
                </p>
              </div>
            </div>
          </div>
          {/*Comments 组件 */}
          <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
            <Comments />
          </div>
          {/* RelatedGames 组件 */}
          <div>
            <RelatedGames />
          </div>
        </div>
      </section>



    </>
  );
}
