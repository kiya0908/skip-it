import React from 'react';
import games from '../../../data/games.json';
import GameClient from './GameClient';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AdUnit from '@/app/components/AdUnit';
import { ADSENSE_BOTTOM_SLOT } from '@/lib/adsense';


// 动态生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const game = games.find((g) => g.slug === params.slug);
  
  if (!game) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found.'
    };
  }
  
  const baseUrl = 'https://doodlebaseball.info'; // 添加 base URL

  return {
    title: game.seo?.title || game.title,
    description: game.seo?.description || game.description,
    keywords: game.seo?.keywords || '',
    alternates: {
      canonical: `${baseUrl}/games/${game.slug}`,
    },
    openGraph: {
      title: game.seo?.title || game.title,
      description: game.seo?.description || game.description,
      images: [
        {
          url: game.coverImage,
          width: 1200,
          height: 630,
          alt: `${game.title} Preview`,
        },
      ],
    },
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);
  const hasBottomAd = Boolean(ADSENSE_BOTTOM_SLOT);
  
  if (!game) {
    return <div className="max-w-2xl mx-auto py-20 text-center text-xl">Game Not Found</div>;
  }

  // 如果是 doodle-baseball，重定向到主页
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

