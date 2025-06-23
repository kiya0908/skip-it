//所有游戏列表页
'use client';

import React from 'react';
import Link from 'next/link';
import gamesData from '../../data/games.json';

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {games.map((game: any) => (
              <Link href={`/games/${game.slug}`} key={game.slug} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105 cursor-pointer">
                <img src={game.coverImage} alt={game.title + ' cover'} className="w-full h-40 sm:h-48 object-cover" />
                <div className="p-3 sm:p-4">
                  <h2 className="text-lg sm:text-xl font-bold">{game.title}</h2>
                </div>
               </Link>
            ))}
          </div>
        </div>
      </main>

    </>
  );
}