import React from 'react';
import type { Metadata } from 'next';

// 建议为页面添加元数据
export const metadata: Metadata = {
  title: 'About Us - Doodle Baseball Game',
  description: 'Learn more about Doodle Baseball and our fan-made website where you can play this food-themed baseball game for free!',
  keywords: 'doodle baseball, about doodle baseball, baseball game online, free baseball game, baseball simulator, food baseball game',
  openGraph: {
    title: 'About Doodle Baseball | Play Online for Free',
    description: 'Learn more about our fan-made Doodle Baseball website and the popular food-themed baseball game!',
    images: [
      {
        url: 'https://example.com/images/doodle-baseball-preview.jpg', // 替换为您的实际图片URL
        width: 1200, // 可选
        height: 630, // 可选
        alt: 'Doodle Baseball Preview', // 可选
      },
    ],
    url: 'https://doodlebaseball.info/about', // 替换为您的实际页面URL
    type: 'website',
  },
  robots: "index, follow",
  alternates: {
    canonical: 'https://doodlebaseball.info/about',
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
          
          <div className="prose prose-lg max-w-none text-gray-700"> {/* prose 类用于优化长文本显示 */}
            <p>
              Welcome to <strong className="text-[#c0142d]">Doodle Baseball (doodlebaseball.info)</strong>!
            </p>

            <p>
              We are a group of passionate fans who love the classic sports-themed game Doodle Baseball. We created this website to provide a convenient platform for enthusiasts to experience this fun game and find information about gameplay, tips, and frequently asked questions.
            </p>

            <p>On this site, you can:</p>
            <ul> {/* 使用 Tailwind prose 插件会自动处理列表样式 */}
              <li>Play the Doodle Baseball game</li>
              <li>Learn the basic rules and controls</li>
              <li>Discover tips to improve your score</li>
              <li>Learn about the different characters in the game</li>
            </ul>

            <div className="mt-6 p-4 border-l-4 border-yellow-400 bg-yellow-50"> {/* 强调免责声明 */}
              <p className="font-semibold text-yellow-700 mb-2">Important Disclaimer:</p>
              <p className="mb-3">
                Please note that <strong className="text-[#c0142d]">doodlebaseball.info</strong> is an <strong className="text-[#c0142d]">unofficial fan website</strong> dedicated to the popular game Doodle Baseball. 
              </p>
              <p className="mb-3">
                We <strong className="text-[#c0142d]">do not own the Doodle Baseball game</strong> or claim any rights to it. This website exists solely as a platform for fans to engage with and enjoy content related to the game. 
              </p>
              <p className="mb-3">
                We are <strong className="text-[#c0142d]">not affiliated with or authorized by Google</strong>, the developer of the game. 
              </p>
              <p>
                We are not Google. If you encounter any technical issues or have gameplay questions about the game itself, please contact Google directly for official support. We can only provide assistance related to the content on this website.
              </p>
            </div>

            <p className="mt-6">
              Our goal is to provide a simple, fun, and content-rich platform for all Doodle Baseball enthusiasts. We hope you enjoy your time here! 
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}