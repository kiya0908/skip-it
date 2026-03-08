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
    <div className="py-10 text-center text-white bg-[#33b3fa]">
      Loading related games…
    </div>
  ),
});

// 为页面添加元数据
export const metadata: Metadata = {
  title: 'Skip It! | Fun Rope Jumping Arcade Game Online Free',
  description: 'Play Skip It!, the ultimate rope jumping arcade game! Test your timing, dodge the swinging rope, and master the fast rhythm for endless fun online for free now!',
  keywords: 'skip it, jump game, arcade game, timing game, free online game',
  openGraph: {
    title: 'Skip It! | Fun Rope Jumping Arcade Game Online Free',
    description: 'Play Skip It!, the ultimate rope jumping arcade game! Test your timing, dodge the swinging rope, and master the fast rhythm for endless fun online for free now!',
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
  "name": "Skip It!",
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
                <Link href="#play" className="hover://underline">Skip It!</Link>: The Ultimate Digital Stone-Skipping Arcade Overview
              </h2>
              <div className="text-lg text-gray-600 max-w-6xl mx-auto space-y-4">
                <p>
                  <strong>Skip It!</strong> is a high-energy arcade challenge that transforms the nostalgic childhood activity of skipping stones into a competitive digital race across a vast, hazard-filled ocean. As a browser-based HTML5 skill game, <strong>Skip It!</strong> allows players to launch projectiles and navigate them across a living water surface using PC, tablets, or mobile devices <strong>without the need for installation</strong>.
                </p>
                <p>
                  The primary objective in <strong>Skip It!</strong> is simple yet deeply engaging: achieve the maximum possible distance in a single run to earn rewards and climb the global leaderboards.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-bullseye text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Core Gameplay and Precision Mechanics</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  The experience of playing <strong>Skip It!</strong> is defined by a precision-based launch and active mid-air navigation.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li><strong>The Perfect Launch:</strong> Every round begins with a timed power meter. Release at the "peak power" for maximum velocity.</li>
                  <li><strong>Active Navigation:</strong> Slide left or right to avoid obstacles like logs, rocks, and buoys. One collision ends the run immediately.</li>
                  <li><strong>Momentum Recovery:</strong> Aim for "Boost Gates" to restore momentum and provides a temporary speed burst.</li>
                </ul>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-arrow-up text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Depth of the Upgrade and Progression System</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Every meter covered in <strong>Skip It!</strong> is converted into currency to invest in four vital permanent upgrades:
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li><strong>Strength:</strong> Amps up the initial launch drive and stronger early momentum.</li>
                  <li><strong>Speed:</strong> Increases overall glide velocity and reduces water friction impact.</li>
                  <li><strong>Skipping Efficiency:</strong> Improves bounce performance to resist sinking as velocity drops.</li>
                  <li><strong>Offline Earnings:</strong> Generates passive income while you are away from the game.</li>
                </ul>
              </div>

              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-fire text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Why Skip It! is a Must-Play Experience</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The appeal of <strong>Skip It!</strong> lies in its "just one more throw" philosophy. With quick, high-tension runs lasting 1–4 minutes, it offers immediate feedback and measurable growth. Reach distance milestones to unlock <strong>unique stone skins</strong> and cosmetic items. Whether for relaxing physics simulation or high-stakes challenge, <strong>Skip It!</strong> delivers a polished arcade experience for all ages.
                </p>
              </div>
            </div>
          </div>

          {/* 如何玩游戏部分 */}
          <div className="mb-16" id="how-to-play">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold mb-4 text-center text-gray-900 tracking-wide">
                How to Play <Link href="#play" className="hover:underline">Skip It! Online</Link>
              </h2>
              <p className="text-lg text-center text-gray-700 mb-10 max-w-4xl mx-auto">
                In <strong>Skip It!</strong>, players aim to throw stones across the water using precise physics simulation, utilizing surface bounces to break distance records. The core mechanics are broken down into the following structured phases:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* 文字描述 - 左侧栏 */}
              <div className="space-y-8">
                <div className="shadcn-card p-6 border border-gray-200 rounded-lg bg-blue-50/30">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                    The Perfect Launch Phase
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Power Control:</strong> Every round starts with building a power reserve. Click and hold the left mouse button or touchscreen to watch the meter fluctuate.</p>
                    <p><strong>Release Timing:</strong> Release exactly when the pointer hits the <strong>"red zone"</strong> for the strongest initial burst of speed.</p>
                    <p><strong>Angle Adjustment:</strong> Drag downward to set the entry angle. A low angle is ideal for continuous skipping.</p>
                  </div>
                </div>

                <div className="shadcn-card p-6 border border-gray-200 rounded-lg bg-green-50/30">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                    Active Navigation and Control
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Horizontal Steering:</strong> Guide the stone by dragging left or right to avoid dangerous hazards.</p>
                    <p><strong>Capturing Boost Gates:</strong> Steer toward "Power Gates" or energy portals to restore momentum and significantly extend distance.</p>
                    <p><strong>Control Precision:</strong> Smooth micro-adjustments are vital; oversteering causes severe energy loss.</p>
                  </div>
                </div>
              </div>

              {/* 文字描述 - 右侧栏 */}
              <div className="space-y-8">
                <div className="shadcn-card p-6 border border-gray-200 rounded-lg bg-amber-50/30">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                    Risk Management and Dynamic Challenges
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Environmental Threats:</strong> Avoid logs, rocks, and buoys. Any slight collision causes the stone to sink instantly.</p>
                    <p><strong>Sinking Judgment:</strong> The stone will sink if velocity falls below a critical threshold. Upgrade stats to reduce friction.</p>
                  </div>
                </div>

                <div className="shadcn-card p-6 border border-gray-200 rounded-lg bg-purple-50/30">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                    Progression and Reward System
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Currency Conversion:</strong> Distance traveled is converted into gold or coins at the end of each attempt.</p>
                    <p><strong>Stat Upgrades:</strong> Spend currency to enhance Strength, Speed, Skipping, and Offline Earning.</p>
                    <p><strong>Unlocking Personalization:</strong> Reach milestones to unlock quirky stone skins and cosmetic items.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* YouTube视频嵌入 (已暂时注释)
            <div className="mt-12 flex flex-col items-center justify-center">
              <div className="w-full aspect-video max-w-lg rounded-lg shadow-lg overflow-hidden">
                <iframe width="680" height="400" src="https://www.youtube-nocookie.com/embed/-ZeX-L9x9mA?si=15bk1pNG_jvF4kO5" title="How to Play Skip It!" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full h-64 md:h-80" loading="lazy"></iframe>
              </div>
            </div>
            */}

            <div className="mt-10 text-center">
              <p className="text-lg text-gray-600 max-w-4xl mx-auto italic">
                "This structured loop of skill and strategy makes Skip It! a highly addictive and rewarding arcade experience."
              </p>
            </div>
          </div>

          {/* 游戏特点部分 */}
          <div className="mb-16" id="features">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-6 tracking-wide">
                Special Features of <Link href="#features" className="hover:underline">Skip It!</Link>
              </h2>
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
                The special features of <strong>Skip It!</strong> elevate it from a simple stone-throwing activity to a deep, mechanics-driven challenge. Each element is designed to balance casual arcade fun with strategic growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-arrow-up-right-dots text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Advanced Upgrade System</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A core component is the permanent progression loop. Invest in <strong>Strength</strong> (launch force), <strong>Speed</strong> (velocity), <strong>Skipping</strong> (efficiency), and <strong>Offline Earning</strong> (passive income).
                </p>
              </div>

              {/* Feature 2 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-atom text-indigo-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Realistic Physics Simulation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Utilizes a physics-based engine where entry angle and timing are paramount. Master the rhythmic cadence to achieve a <strong>"Perfect Throw"</strong> for a visible performance spike.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-water text-cyan-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Dynamic Water Environments</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The "living" surface is populated with interactive elements. Navigate through logs, buoys, rocks, and docks. Sharp steering is required to avoid instant-end collisions.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-bolt-lightning text-orange-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Strategic Momentum Boosters</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Steer through glowing <strong>Power Gates</strong> to restore dwindling speed. Essential for reaching distant milestones and breaking your personal records.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-palette text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Extensive Customization</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Earn more than just currency! Unlock a collection of unique, funny, and <strong>"crazy" stone skins</strong> and cosmetic items as you reach specific distance goals.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-trophy text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Competitive Social Integration</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Global leaderboards and performance tracking keep you engaged. Receive <strong>"New Best!"</strong> notifications as you optimize your throws within the community.
                </p>
              </div>

              {/* Feature 7 - Full width on lg if needed or just centered */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow lg:col-span-3">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <i className="fas fa-mobile-screen-button text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-gray-900">High Accessibility & Design</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Built on <strong>HTML5 technology</strong>, Skip It! is designed for seamless play across desktops, tablets, and mobile devices <strong>without installation</strong>. Simple one-button controls make it easy for all ages to enjoy, while the depth of its mechanics ensures it is difficult to master.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-700 max-w-4xl mx-auto font-medium">
                Overall, these special features create a polished and satisfying loop that balances casual arcade fun with deep strategic growth.
              </p>
            </div>
          </div>

          {/* Tips and Tricks 部分 */}
          <div className="mb-16" id="tips-and-tricks">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-gray-900 mb-4 tracking-wide">
                Tips and Tricks for <Link href="#tips-and-tricks" className="hover:underline">Skip It!</Link>
              </h2>
              <p className="text-lg text-gray-600 max-w-6xl mx-auto">
                To excel at <strong>Skip It!</strong>, players need more than luck—they need skillful rhythm and quick reflexes. Mastering these seven pro tips is the best way to dominate the <strong>Skip It! leaderboard</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Tip 1 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-stopwatch text-yellow-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Perfect the Launch</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Step one is mastering the initial launch. Release the button exactly when the power bar reaches the <strong>"red zone"</strong> to ensure maximum velocity and a performance spike.
                </p>
              </div>

              {/* Tip 2 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-compass text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Calculate Entry Angle</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Success depends on realistic physics. Use the mouse to set a <strong>low, flat entry angle</strong> rather than a high one to maintain consistent bounces and prevent early sinking.
                </p>
              </div>

              {/* Tip 3 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-hand-pointer text-teal-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Avoid Oversteering</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Use <strong>micro-adjustments</strong> to guide your stone around hazards. Large swipes often lead to over-correction, resulting in fatal collisions that end your run instantly.
                </p>
              </div>

              {/* Tip 4 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-coins text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Prioritize Upgrades</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Invest strategically early on. Focus on <strong>Strength and Skipping</strong> efficiency to reach greater distances faster than focusing solely on raw speed.
                </p>
              </div>

              {/* Tip 5 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-gate text-orange-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Target Energy Gates</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Glowy <strong>Power Gates</strong> act like fuel refills. Steering into these boosters is essential for restoring momentum and can double your previous distance record.
                </p>
              </div>

              {/* Tip 6 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-bed text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Leverage Offline Gains</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Don't ignore the \"Offline Earning\" feature! Regular check-ins allow you to afford permanent boosts that make every future attempt more powerful.
                </p>
              </div>
            </div>

            <div className="mt-12 shadcn-card p-8 border border-gray-200 rounded-lg bg-gray-50 max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <i className="fas fa-heart text-red-600 text-2xl"></i>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Stay Calm at High Speeds</h3>
                  <p className="text-lg text-gray-700 italic leading-relaxed">
                    "As your stone accelerates, the window to react narrows. Watch the horizon, maintain a steady rhythm, and don't panic. Mastering your nerves is the ultimate key to dominating the Skip It! community!"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ部分 */}
          <div id="faq">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bangers font-bold text-center text-gray-900 mb-12 tracking-wide">
                Frequently Asked Questions about <Link href="#faq" className="hover:underline">Skip It!</Link>
              </h2>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* FAQ 1 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">What is the core objective of Skip It!?</h3>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Skip It!</strong> is a high-energy arcade game that transforms the classic childhood activity of skipping stones into a competitive digital race. The goal is to throw your stone across a vast ocean, navigating past hazards to achieve the longest distance possible. Every meter covered is converted into currency for <strong>permanent character and skill upgrades</strong>.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">How do I perform a "Perfect Throw" in Skip It!?</h3>
                <p className="text-gray-600 leading-relaxed">
                  To master the launch, click and hold your mouse or touch the screen to charge the power bar. You must <strong>release the button exactly when the meter hits the "red zone"</strong> to trigger a power bonus. This ensures your stone enters the water with maximum velocity.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Why does my stone sink even if I avoid hitting obstacles?</h3>
                <p className="text-gray-600 leading-relaxed">
                  In the <strong>Skip It!</strong> physics simulation, the stone requires a specific amount of velocity to remain buoyant. If your speed drops below a critical threshold, the friction of the water overcomes the stone's momentum. Upgrading your <strong>Speed and Skipping</strong> efficiency stats is essential to stay afloat longer.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">What are the Power Gates found during a Skip It! run?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Power Gates are glowing energy portals on the water surface. Steering through these gates is a vital strategy to <strong>restore momentum</strong> and gain a temporary speed burst. Catching these can transform a fading run into a record-breaking glide.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Which upgrades should I focus on first?</h3>
                <p className="text-gray-600 leading-relaxed">
                  For beginners, it is highly recommended to prioritize <strong>Strength and Skipping</strong> stats. Strength provides a more powerful initial force during launch, while Skipping improves bounce efficiency, preventing premature sinking.
                </p>
              </div>

              {/* FAQ 6 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Can I earn rewards even when I am not playing?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes! <strong>Skip It!</strong> features a rewarding <strong>"Offline Earning"</strong> system. This passive income feature ensures that your bank account continues to grow even after you close the session, allowing you to afford permanent stat boosts when you return.
                </p>
              </div>

              {/* FAQ 7 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">How do I unlock new stone skins?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reach specific distance milestones or complete goals to personalize your experience. These targets allow you to unlock a variety of <strong>unique, "crazy," or funny stone skins</strong> that add visual flair to your attempts.
                </p>
              </div>

              {/* FAQ 8 */}
              <div className="shadcn-card p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">What platforms support Skip It!?</h3>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Skip It!</strong> is built on HTML5 technology, making it accessible directly in your browser on <strong>desktop PCs, tablets, and mobile phones</strong> without needing any installation.
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
