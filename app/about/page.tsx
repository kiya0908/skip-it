import React from 'react';
import type { Metadata } from 'next';

// 建议为页面添加元数据
export const metadata: Metadata = {
  title: 'About Us - Skip It! Game',
  description: 'Learn more about Skip It! and our website where you can play this addicting rope-jumping arcade game for free!',
  keywords: 'skip it, about skip it, arcade game online, free jump game, timing game, skip it game',
  openGraph: {
    title: 'About Skip It! | Play Online for Free',
    description: 'Learn more about the Skip It! website and the popular rope-jumping arcade game!',
    images: [
      {
        url: 'https://skipit.top/images/games/skipit.webp',
        width: 1200,
        height: 630,
        alt: 'Skip It! Preview',
      },
    ],
    url: 'https://skipit.top/about',
    type: 'website',
  },
  robots: "index, follow",
  alternates: {
    canonical: 'https://skipit.top/about',
  },
};

export default function AboutPage() {
  return (
    <main className="bg-gray-100 py-10"> {/* 使用了更通用的背景色 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8"> {/* 卡片式容器 */}
          <h1 className="text-4xl font-bangers mb-8 text-center text-gray-900">
            About Us
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Welcome to <strong className="text-[#c0142d]">Skip It! (skipit.top)</strong>!
            </p>

            <p>
              We are a team of passionate game enthusiasts who love simple, addicting arcade games. We created this website to provide a convenient platform for players to enjoy the Skip It! rope-jumping game and find useful information about gameplay, tips, and frequently asked questions.
            </p>

            <p>On this site, you can:</p>
            <ul>
              <li>Play the Skip It! rope-jumping arcade game</li>
              <li>Learn the basic rules and one-tap controls</li>
              <li>Discover tips to improve your high score</li>
              <li>Explore a curated collection of other fun arcade games</li>
            </ul>

            <div className="mt-6 p-4 border-l-4 border-yellow-400 bg-yellow-50">
              <p className="font-semibold text-yellow-700 mb-2">Disclaimer:</p>
              <p className="mb-3">
                <strong className="text-[#c0142d]">skipit.top</strong> is a fan-made gaming platform. The games featured on this site are provided via third-party embeds.
              </p>
              <p className="mb-3">
                We <strong className="text-[#c0142d]">do not own the original game assets</strong> and provide this website purely for entertainment purposes.
              </p>
              <p>
                If you encounter any technical issues, feel free to reach out through our <a href="/contact" className="text-blue-600 hover:underline">Contact</a> page and we'll do our best to help.
              </p>
            </div>

            <p className="mt-6">
              Our goal is to provide a simple, fun, and content-rich platform for all arcade game fans. We hope you enjoy your time here!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}