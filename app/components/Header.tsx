"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import games from "@/data/games.json"; // Import game data

// Define the structure of a game item
interface Game {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  youtube: string;
  playUrl: string;
  rating: number;
  howToPlay: string[];
  features: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  isTopPick?: boolean;
  isHot?: boolean;
  isHeader?: boolean;
}

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // 搜索输入框的状态
  const [searchQuery, setSearchQuery] = useState("");

  // 选择header组件的游戏 (first 5 games with isHeader: true)
  const headerGames = games.filter(game => game.isHeader === true).slice(0, 5);

  // 处理搜索表单提交
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 跳转到 /search?q=关键词
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-[#33b3fa] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 左侧Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              className="h-10 w-auto"
              src="/images/games/skipit.webp"
              alt="Skip It! Logo"
              width={40}
              height={40}
              priority
            />
            <p className="ml-2 text-2xl font-bangers text-white">Skip It!</p>
          </Link>
          {/* PC端主导航+搜索表单 */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* Games Button */}
            <Link href="/games" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium" aria-label="View all games">
              Games
            </Link>
            {/* Hot Game Buttons */}
            {headerGames.map((game) => (
              <Link key={game.slug} href={`/games/${game.slug}`} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium" aria-label={`Play ${game.title}`}>
                {game.title}
              </Link>
            ))}
            {/* 搜索表单 */}
            <form className="flex items-center ml-2" onSubmit={handleSearch} aria-label="Search games">
              <input
                type="text"
                className="rounded-l-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search games..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search games input"
              />
              <button
                type="submit"
                className="bg-[#33b3fa] hover:bg-red-600 text-white px-3 py-1 rounded-r-md text-sm font-medium"
                aria-label="Search"
              >
                Search
              </button>
            </form>
          </nav>
          {/* 移动端汉堡菜单按钮 */}
          <button
            className="md:hidden flex flex-col justify-center items-center ml-2 focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {/* 汉堡图标 */}
            <span className="block w-7 h-1 bg-white mb-1 rounded"></span>
            <span className="block w-7 h-1 bg-white mb-1 rounded"></span>
            <span className="block w-7 h-1 bg-white rounded"></span>
          </button>
        </div>
        {/* 移动端菜单抽屉，仅控制目录项 */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#33b3fa] shadow-lg rounded-b-lg animate-fadeIn">
            <nav className="flex flex-col py-2 px-4 space-y-1">
              {/* Games 目录项 */}
              <Link href="/games" className="text-white font-bold py-2 px-2 rounded hover:bg-blue-900" aria-label="View all games" onClick={() => setMobileMenuOpen(false)}>
                Games
              </Link>
              {/* 热门游戏列表 */}
              {/* 遍历 headerGames，将每个游戏渲染为一个导航链接 */}
              {headerGames.map((game) => (
                // 单个游戏链接项
                <Link
                  key={game.slug}
                  href={`/games/${game.slug}`}
                  className="text-white font-bold py-2 px-2 rounded hover:bg-blue-900"
                  aria-label={`Play ${game.title}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {/* 链接文本：显示游戏名称 */}
                  {game.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
        {/* 移动端搜索表单，始终显示 */}
        <div className="md:hidden bg-[#33b3fa] px-4 pb-2 pt-2">
          <form className="flex items-center" onSubmit={handleSearch} aria-label="Search games">
            <input
              type="text"
              className="flex-1 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search games..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search games input"
            />
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-800 text-white px-3 py-2 rounded-r-md text-lg font-bold flex items-center justify-center"
              aria-label="Search"
            >
              {/* 放大镜SVG图标 */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
