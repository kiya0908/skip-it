//所有游戏列表页
'use client';

import React from 'react';
import Link from 'next/link';
import gamesData from '../../data/games.json';
import GameGrid from '../components/GameGrid';

export default function GamesPage() {
  const games = gamesData;
  return (
    <>

      <main className="bg-[#f0f2f5] min-h-screen py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bangers text-center text-gray-900 mb-6 sm:mb-10">All Games</h1>
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:underline">
              <span className="flex items-center">
                <i className="fas fa-arrow-left mr-2"></i> Back to Home
              </span>
            </Link>
          </div>
          <GameGrid games={games} title="" />
        </div>
      </main>

    </>
  );
}