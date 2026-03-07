import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import GameSection from './GameSection';
import AdUnit from './components/AdUnit';
import { ADSENSE_BOTTOM_SLOT } from '@/lib/adsense';

const Comments = dynamic(() => import('./components/Comments'), {
  ssr: false,
  loading: () => (
    <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4 py-8 text-center text-sm text-gray-500">
      Loading comments…
    </div>
  ),
});

const RelatedGames = dynamic(() => import('./components/RelatedGames'), {
  loading: () => (
    <div className="py-10 text-center text-white bg-[#0c2461]">
      Loading related games…
    </div>
  ),
});

// 为页面添加元数据
export const metadata: Metadata = {
  title: 'Skip It! | Fun Rope Jumping Arcade Game Online Free',
  description: 'Play Skip It!, the ultimate rope jumping arcade game! Test your timing, avoid the swinging rope, and enjoy endless fun online for free.',
  keywords: 'skip it, jump game, arcade game, timing game, free online game',
  openGraph: {
    title: 'Skip It! | Fun Rope Jumping Arcade Game Online Free',
    description: 'Play Skip It!, the ultimate rope jumping arcade game! Test your timing, avoid the swinging rope, and enjoy endless fun online for free.',
    images: [
      {
        url: 'https://skipit.top/images/games/skipit.webp',
        width: 1200,
        height: 630,
        alt: 'Skip It!',
      },
    ],
    url: 'https://skipit.top/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://skipit.top',
  },
  robots: "index, follow",
};

// JSON-LD 结构化数据
const gameJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Skip It! Game",
  "url": "https://skipit.top/",
  "description": "Play Skip It!, the ultimate rope jumping arcade game! Test your timing and reflexes online for free in this fun jump game.",
  "genre": ["Casual Game", "Arcade Game", "Action Game"],
  "playPlatform": "WebBrowser",
  "applicationCategory": "Game",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "bestRating": "5",
    "ratingCount": "100"
  },
  "image": "https://skipit.top/images/games/skipit.webp"
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to play Skip It!?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click the 'Play Now' button to start. Watch the swinging rope carefully, and tap or click to jump over it at the exact right moment. Avoid tripping to keep playing!"
      }
    },
    {
      "@type": "Question",
      "name": "What's the goal of the game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The goal is simple: jump over the rope as many times as possible without tripping. Test your focus and aim for the highest score!"
      }
    },
    {
      "@type": "Question",
      "name": "Is there a maximum score in Skip It!?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, there is no maximum score. The game continues endlessly as long as you successfully dodge the rope. It's the perfect challenge to beat your own high score!"
      }
    },
    {
      "@type": "Question",
      "name": "Why is timing important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skip It! is entirely based on timing. If you jump too early or too late, the rope will hit you and the game ends. Perfecting your rhythm is the key to mastering the game."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any tricks to win Skip It!?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus on the rhythm of the swinging rope. As the game speeds up, keep a steady pace and don't panic. Practicing regularly will train your reflexes to handle the faster speeds easily."
      }
    }
  ]
};



export default function HomePage() {
  const hasBottomAd = Boolean(ADSENSE_BOTTOM_SLOT);

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

      {hasBottomAd && (
        <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4 mt-8">
          <AdUnit slot={ADSENSE_BOTTOM_SLOT} className="my-4" />
        </div>
      )}

      {/* 游戏内容综合区域 */}
      <section className="py-16 bg-white">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
          {/* 关于游戏部分 */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">
                About <Link href="#play" className="hover://underline">Skip It! Game</Link>
              </h2>
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
                <strong>Skip It!</strong> is an exciting and addictive arcade game that brings players into a fast-paced world of rhythmic jumping and timing challenges. This <strong>jump game</strong> offers a delightful twist on classic rope-skipping activities, making <strong>Skip It!</strong> not just a simple reflex test, but a fun-filled adventure suitable for all ages. As you enter the <strong>Skip It!</strong> arena, you'll need sharp focus and quick reactions to dodge the ever-swinging rope. Whether you're searching for a casual <strong>arcade game</strong> or an intense timing challenge, Skip It! is the perfect choice to test your skills and beat your high score.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-stopwatch text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Perfect Timing Challenge</h3>
                <p className="text-gray-600">
                  The <strong>Skip It!</strong> game captures the essence of classic arcade action with precise timing physics and engaging gameplay. Play the <strong>Skip It!</strong> game online anytime to enjoy the ultimate test of reflexes!
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-gamepad text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy to Learn, Hard to Master</h3>
                <p className="text-gray-600">
                  The <strong>Skip It!</strong> game features intuitive one-button controls that anyone can pick up instantly. However, mastering the perfect jump timing as the rope speeds up requires practice and skill, making it endlessly entertaining.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-fire text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Endless Free Gameplay</h3>
                <p className="text-gray-600">
                  The <strong>Skip It!</strong> game stands out with its intensely addictive loop. There are no limits to how far you can go—jump over the rope continuously and challenge yourself to reach the top of the leaderboard without ever stopping!
                </p>
              </div>
            </div>
          </div>

          {/* 如何玩游戏部分 */}
          <div className="mb-16" id="how-to-play">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold mb-4 text-center text-gray-900 tracking-wide">
                How to Play <Link href="#play" className="hover://underline">Skip It! Online</Link>
              </h2>
              <p className="text-lg text-center text-gray-700 mb-10 max-w-4xl mx-auto">
                Learn how to play <strong>Skip It!</strong> and master this incredibly satisfying <strong>arcade game</strong>! Follow these simple steps and watch your reflexes improve as you jump for a new high score.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* 文字指南 */}
              <div className="text-left md:pr-5 shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">1. Start the Game</h3>
                    <p className="text-base text-gray-700">Click the "Play Now" button to launch <strong>Skip It!</strong> instantly in your browser.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">2. Watch the Rope</h3>
                    <p className="text-base text-gray-700">Pay close attention to the swinging rope as it rotates around the center pivot. The speed may vary!</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">3. Time Your Jump</h3>
                    <p className="text-base text-gray-700">Click your mouse, tap the screen, or use the spacebar at the perfect moment to jump. Timing is crucial—jump too early or too late and you'll trip!</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">4. Score Points</h3>
                    <p className="text-base text-gray-700">Every successful jump over the rope scores you points. Keep your unbroken streak going to maximize your score in this addictive <strong>arcade game</strong>.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">5. Avoid Tripping</h3>
                    <p className="text-base text-gray-700">One mistake and the game is over. Keep practicing to improve your reflexes and beat your high score!</p>
                  </div>
                </div>
                <p className="mt-6 text-base text-gray-600">
                  <strong>Tip:</strong> Stay calm and find the rhythm. As the rope speeds up, your instinct might be to panic—stay focused on the visual cues to jump perfectly every time!
                </p>
              </div>
              {/* YouTube视频嵌入 */}
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-full aspect-video max-w-lg rounded-lg shadow-lg overflow-hidden">
                  <iframe width="680" height="400" src="https://www.youtube-nocookie.com/embed/-ZeX-L9x9mA?si=15bk1pNG_jvF4kO5" title="How to Play Skip It!" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full h-64 md:h-80" loading="lazy"></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* 游戏特点部分 */}
          <div className="mb-16" id="features">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-12 tracking-wide">
                Special Features of <Link href="#features" className="hover:underline">Skip It!</Link>
              </h2>
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
                A fun part of <strong>Skip It!</strong> is its incredibly simple yet deeply challenging loop. The game features a rotating rope that gradually increases its speed, forcing you to constantly adapt your rhythm. There are no complicated power-ups or confusing controls—just pure, unadulterated arcade action. This makes <strong>Skip It!</strong> perfect for quick sessions or long marathons where you try to beat your highest score. It's a true test of focus and reflexes!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Dynamic Speed Curve</h3>
                <p className="text-gray-600 mb-6">
                  The difficulty in <strong>Skip It!</strong> scales dynamically based on your performance. As your unbroken jump streak grows, so does the speed of the rope:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-200 border border-green-400 flex items-center justify-center mr-3 mt-0.5"></span>
                    <span><strong>Start Slow:</strong> Get comfortable with the basic rhythm and easy jumps.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-200 border border-yellow-400 flex items-center justify-center mr-3 mt-0.5"></span>
                    <span><strong>Picking Pace:</strong> The rope turns faster, demanding sharper focus.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-300 border border-orange-500 flex items-center justify-center mr-3 mt-0.5"></span>
                    <span><strong>Intense Speed:</strong> The true arcade challenge begins; don't blink!</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-red-400 border border-red-600 flex items-center justify-center mr-3 mt-0.5"></span>
                    <span><strong>Lightning Fast:</strong> Only the best players with perfect timing survive here.</span>
                  </li>
                </ul>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Why You'll Love It</h3>
                <p className="text-gray-600 mb-6">
                  <strong>Skip It!</strong> strips away the bloat of modern games to deliver a pure skill-based experience:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-mouse-pointer text-blue-500 text-xl mr-3 mt-0.5"></i>
                    <span><strong>One-Tap Action:</strong> Click, tap, or press space. That's all you need.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-infinity text-purple-500 text-xl mr-3 mt-0.5"></i>
                    <span><strong>Endless Loop:</strong> No levels, no loading screens—just jump continuously.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-tachometer-alt text-red-500 text-xl mr-3 mt-0.5"></i>
                    <span><strong>Instant Restarts:</strong> Tripped? Jump right back in instantly.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-trophy text-yellow-500 text-xl mr-3 mt-0.5"></i>
                    <span><strong>Competitive Spirit:</strong> It pushes you to constantly beat your last high score.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips and Tricks 部分 */}
          <div className="mb-16" id="tips-and-tricks">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">
                Tips and Tricks for <Link href="#tips-and-tricks" className="hover:underline">Skip It!</Link>
              </h2>
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
                To excel at <strong>Skip It!</strong>, players need more than luck—they need skillful rhythm and quick reflexes. Whether you're new to this playful arcade game or aiming to set a new high score in <strong>Skip It!</strong> free, the following tips can help you time every single jump perfectly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-bullseye text-yellow-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Anticipate the Swing</h3>
                <p className="text-gray-600">
                  In <strong>Skip It!</strong>, controlling your timing is key. Observe the rope's path closely in this arcade game. Predicting the rope's trajectory in <strong>Skip It!</strong> will help you make more accurate jumps and boost your overall score. The more you practice <strong>Skip It!</strong>, the more skilled you'll become at mastering the rhythm.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-music text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Find the Rhythm</h3>
                <p className="text-gray-600">
                  <strong>Skip It!</strong> introduces an added layer of challenge as the speed increases. In this jump game, it's crucial to find a steady internal rhythm. Don't rely purely on visuals; tap your foot or nod your head to the beat of the swinging rope to lock in the perfect jump timing.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-bolt text-teal-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Quick Reaction</h3>
                <p className="text-gray-600">
                  One of the most important skills in <strong>Skip It!</strong> is developing an instinctual reaction. This arcade game rewards players who can respond instantly without overthinking. Sharpening your reflexes through regular practice in <strong>Skip It!</strong> free will dramatically increase your jump streak, letting you climb the leaderboard!
                </p>
              </div>
            </div>
            <p className="text-center text-lg text-gray-600 mt-10 max-w-6xl mx-auto">
              By combining anticipation, rhythm, and quick reflexes, you'll become a true champion in <strong>Skip It!</strong>. Keep playing <strong>Skip It!</strong> free, and enjoy the uniquely satisfying arcade game experience that fans everywhere can't stop playing!
            </p>
          </div>

          {/* FAQ部分 */}
          <div id="faq">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-12 tracking-wide">
                Frequently Asked Questions about <Link href="#faq" className="hover:underline">Skip It!</Link>
              </h2>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How to play Skip It!?</h3>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>As soon as the game loads, you'll see the rotating rope.</li>
                  <li>Click on the "Play Now" button to dive right in.</li>
                  <li>Time your spacebar presses or mouse clicks to jump over the rope without tripping.</li>
                </ul>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What's the goal of the game?</h3>
                <p className="text-gray-600">
                  The primary objective of <strong>Skip It!</strong> is to survive for as long as possible. The longer you jump over the rope without making a mistake, the higher your score will climb.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What's the highest score possible?</h3>
                <p className="text-gray-600">
                  In <strong>Skip It!</strong>, there's absolutely no maximum score limit. You can keep playing this arcade game for as long as your reflexes hold up. This makes <strong>Skip It!</strong> free a thrilling challenge for players who want a truly infinite experience.
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Why is timing so important?</h3>
                <p className="text-gray-600">
                  Because the rope constantly changes speed, your ability to adapt your jump rhythm is tested continuously. Jump too early, and you'll land on it. Jump too late, and you'll trip. Perfect timing is the only way to thrive in <strong>Skip It!</strong>
                </p>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Are there any tricks to win Skip It!?</h3>
                <p className="text-gray-600">
                  While <strong>Skip It!</strong> doesn't include any magical power-ups or shortcuts, you can improve drastically by focusing entirely on the center pivot. Don't look at your character—watch the rope's rotation point to best anticipate precisely when it will reach your feet. Practicing and keeping a calm rhythm will definitely boost your scores in this lively jump game.
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
