import React from 'react';
import games from '../../../data/games.json';
import GameClient from './GameClient';
import GamesContent from '../components/GamesContent';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AdUnit from '@/app/components/AdUnit';
import { ADSENSE_BOTTOM_SLOT } from '@/lib/adsense';

const GAMES_PER_PAGE = 30;
const baseUrl = 'https://doodlebaseball.info';

/** 判断是否为分页用的数字 slug（如 "1"、"2"），与游戏 slug 区分 */
function isPageSlug(s: string): boolean {
  return /^\d+$/.test(s);
}

/** 游戏列表页的元数据（用于 /games/1、/games/2 等） */
function listMetadata(pageNumber: number) {
  const baseTitle = 'All Games | Doodle Baseball - Free Online Games Collection';
  const baseDescription = 'Browse our complete collection of free online games. Play baseball games, puzzle games, action games and more at Doodle Baseball.';
  const title = pageNumber > 1 ? `${baseTitle} - Page ${pageNumber}` : baseTitle;
  const description = pageNumber > 1 ? `${baseDescription} - Page ${pageNumber}` : baseDescription;
  const canonical = `${baseUrl}/games/${pageNumber}`;
  return {
    title,
    description,
    keywords: 'online games, free games, baseball games, game collection, play games online',
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website' as const, images: '/images/games/games.png' },
    robots: 'index, follow' as const,
  };
}

// 动态生成元数据（同时支持游戏详情页与分页列表页）
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;

  if (isPageSlug(slug)) {
    const pageNumber = Math.max(1, parseInt(slug, 10));
    return listMetadata(pageNumber);
  }

  const game = games.find((g) => g.slug === slug);
  if (!game) {
    return { title: 'Game Not Found', description: 'The requested game could not be found.' };
  }

  return {
    title: game.seo?.title || game.title,
    description: game.seo?.description || game.description,
    keywords: game.seo?.keywords || '',
    alternates: { canonical: `${baseUrl}/games/${game.slug}` },
    openGraph: {
      title: game.seo?.title || game.title,
      description: game.seo?.description || game.description,
      images: [{ url: game.coverImage, width: 1200, height: 630, alt: `${game.title} Preview` }],
    },
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  // 数字 slug 表示分页：/games/1、/games/2 等
  if (isPageSlug(slug)) {
    const totalPages = Math.max(1, Math.ceil(games.length / GAMES_PER_PAGE));
    let page = parseInt(slug, 10);
    if (page < 1) redirect('/games/1');
    if (page > totalPages) redirect(`/games/${totalPages}`);
    return <GamesContent currentPage={page} />;
  }

  const game = games.find((g) => g.slug === slug);
  const hasBottomAd = Boolean(ADSENSE_BOTTOM_SLOT);

  if (!game) {
    return <div className="max-w-2xl mx-auto py-20 text-center text-xl">Game Not Found</div>;
  }

  if (game.slug === 'doodle-baseball') {
    redirect('/');
  }
  
  // JSON-LD 结构化数据 - 优化为更完整的游戏信息
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.description.replace(/<\/?b>/g, ''), // 移除HTML标签以确保纯文本
    "image": game.coverImage,
    "url": `https://doodlebaseball.info/games/${game.slug}`,
    "genre": ["Sports Game", "Browser Game", "Online Game"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": game.rating.toString(),
      "bestRating": "5",
      "ratingCount": "1"
    }
  };
  
  return (
    <>
      {/* 添加结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 页面主内容 */}
      <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
        <GameClient game={game} />
        {hasBottomAd && (
          <div className="my-8">
            <AdUnit slot={ADSENSE_BOTTOM_SLOT} />
          </div>
        )}
      </div>
    </>
  );
}

