import React from 'react';
import type { Metadata } from 'next';

// 为页面添加元数据
export const metadata: Metadata = {
  title: 'Terms of Service - Doodle Baseball Game',
  description: 'Read the terms of service for using Doodle Baseball Game.',
  keywords: 'doodle baseball game terms of service, user agreement, game rules',
  openGraph: {
    title: 'Terms of Service | Play Online for Free',
    description: 'Read the terms of service for using Doodle Baseball Game！',
    images: [
      {
        url: ' https://doodlebaseball.info/images/games/doodlebaseball.png', // 请替换为您的实际图片URL
        width: 1200,
        height: 630,
        alt: 'Doodle Baseball Preview',
      },
    ],
    url: 'https://doodlebaseball.info/terms', // 请替换为您的实际页面URL
    type: 'website',
  },
  robots: "index, follow",
  alternates: {
    canonical: 'https://doodlebaseball.info/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h2 className="text-4xl font-bangers mb-8 text-center text-gray-900">
            Terms of Service
          </h2>
          
          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Acceptance of Terms</p>
            <p className="text-gray-700">
              By accessing and playing games on Doodle Baseball Game, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website. 
            </p>
          </div>

          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Game Access</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>All games are provided free of charge.</li>
              <li>No registration or account creation is required.</li>
              <li>Games are accessible through most modern web browsers using an embedded iframe.</li>
              <li>We strive to keep games unblocked and accessible.</li>
              <li>We reserve the right to modify or discontinue any game at any time.</li>
            </ul>
          </div>
          
          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Gameplay Rules</p>
            <p className="text-gray-700">
              Each game has its own specific rules and mechanics. Games are designed for entertainment purposes. We may update game features and mechanics periodically. Fair play and good sportsmanship are expected. 
            </p>
          </div>
          
          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Data and Storage</p>
            <p className="text-gray-700">
              Our games use your browser's local storage to save progress and preferences. This data remains on your device and can be cleared through your browser settings at any time. We do not store personal information on our servers. 
            </p>
          </div>

          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">User Conduct</p>
            <p className="text-gray-700 mb-2">Users must not:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Attempt to hack, modify, or reverse engineer the games.</li>
              <li>Use automated programs or bots.</li>
              <li>Distribute modified versions of our games.</li>
              <li>Use our games for commercial purposes.</li>
              <li>Interfere with other users' gaming experience.</li>
            </ul>
          </div>

          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Disclaimer</p>
            <p className="text-gray-700">
              Games are provided "as is" without any warranties. We are not responsible for any technical issues, interruptions, or losses that may occur while playing our games. 
            </p>
          </div>

          <div className="text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">Changes to Terms</p>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Continued use of our website after changes constitutes acceptance of the updated terms. 
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}