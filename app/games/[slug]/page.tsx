import React from 'react';
import games from '../../../data/games.json';
import GameClient from './GameClient';
import { Metadata } from 'next';

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
  
  if (!game) {
    return <div className="max-w-2xl mx-auto py-20 text-center text-xl">Game Not Found</div>;
  }
  
  // JSON-LD 结构化数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.description,
    "image": game.coverImage,
    "url": `https://doodlebaseball.info/games/${game.slug}`,
    "genre": "Sports Game",
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
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
      
      {/* 使用客户端组件渲染游戏详情 */}
      <GameClient game={game} />
    </>
  );
}

// 步骤 5: 更新 page.tsx 中的 JSON-LD 结构
