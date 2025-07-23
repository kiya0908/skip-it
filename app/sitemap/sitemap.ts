import { MetadataRoute } from 'next';
import gamesData from '../../data/games.json';

// 游戏类型声明，便于类型检查
interface Game {
  slug: string;
}

const baseUrl = 'https://doodlebaseball.info';

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 静态页面路由（首页、about、contact等）
  const staticRoutes = [
    '', // 首页
    'about',
    'contact',
    'privacy',
    'terms',
    'games', // 所有游戏列表页
  ].map((route) => ({
    url: route === '' ? `${baseUrl}/` : `${baseUrl}/${route}`,
    lastModified: new Date(), // 官方推荐直接用Date对象
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. 所有游戏详情页（不包含 doodle-baseball）
  const gamesRoutes = gamesData
    .filter((game: Game) => game.slug && game.slug !== 'doodle-baseball')
    .map((game: Game) => ({
      url: `${baseUrl}/games/${game.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  // 3. 合并所有路由，返回给Next.js生成标准sitemap
  return [...staticRoutes, ...gamesRoutes];
}