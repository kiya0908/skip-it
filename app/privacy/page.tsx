import React from 'react';
import type { Metadata } from 'next';

// 为页面添加元数据
export const metadata: Metadata = {
  title: 'Privacy Policy - Doodle Baseball Game',
  description: 'Read our privacy policy to understand how we protect your personal information.',
  keywords: 'doodle baseball game privacy policy, data protection, user privacy',
  openGraph: {
    title: 'Privacy Policy | Play Online for Free',
    description: 'Read our privacy policy to understand how we protect your personal information！',
    images: [
      {
        url: 'https://doodlebaseball.info/images/games/doodlebaseball.png', // 请替换为您的实际图片URL
        width: 1200,
        height: 630,
        alt: 'Doodle Baseball Preview',
      },
    ],
    url: 'https://doodlebaseball.info/privacy', // 请替换为您的实际页面URL
    type: 'website',
  },
  robots: "index, follow",
  alternates: {
    canonical: 'https://doodlebaseball.info/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h1 className="text-4xl font-bangers mb-8 text-center text-gray-900">
            Privacy Policy
          </h1>
          
          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Information We Collect</p>
            <p className="mb-2">When you use the REPO game, we collect minimal information, including:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Basic device information (such as browser type and device type)</li>
              <li>Game progress and preferences (stored locally)</li>
              <li>Anonymous gameplay statistics</li>
            </ul>
          </div>

          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">How We Use Information</p>
            <p className="mb-2">The information we collect is used to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Optimize game performance across various devices</li>
              <li>Save your game progress and preferences locally</li>
              <li>Enhance game features based on player feedback</li>
              <li>Ensure that games remain accessible and unblocked</li>
            </ul>
          </div>

          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Data Storage</p>
            <p className="text-gray-700">
              The REPO game utilizes local storage in your browser to save game progress and settings. No personal information is stored on our servers. You can clear this data at any time through your browser settings.
            </p>
          </div>
          
          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Cookies and Local Storage</p>
            <p className="text-gray-700">
              We use local storage to improve your gaming experience by saving your progress and preferences. This data remains on your device and is not shared with any third parties.
            </p>
          </div>

          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Third-Party Services</p>
            <p className="text-gray-700">
              Our website may utilize third-party analytics services to enhance game performance and user experience. These services collect anonymous usage data and do not track personal information.
            </p>
          </div>
        
          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Children's Privacy</p>
            <p className="text-gray-700">
              The REPO game is suitable for players of all ages. We do not knowingly collect personal information from children under 13. Our games can be played without providing any personal information.
            </p>
          </div>

          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Changes to Privacy Policy</p>
            <p className="text-gray-700">
              We may occasionally update this privacy policy. Continued use of our games after changes indicates acceptance of the updated policy.
            </p>
            <p className="text-gray-700 mt-2 font-medium">
              Last updated: April 29, 2025
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}