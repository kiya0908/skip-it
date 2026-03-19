import { MetadataRoute } from 'next';
import gamesData from '../data/games.json';

// 游戏类型声明，便于类型检查
interface Game {
  slug: string;
}

const baseUrl = 'https://skipit.top';
const GAMES_PER_PAGE = 30; // ⚠️ 页面实际的分页数量

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 静态页面路由（首页、about、contact等；games 分页见下方 paginationRoutes）
  const staticRoutes = [
    '', // 首页
    'about',
    'contact',
    'privacy',
    'terms',
  ].map((route) => ({
    url: route === '' ? `${baseUrl}/` : `${baseUrl}/${route}`,
    lastModified: new Date(), // 官方推荐直接用Date对象
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. 所有游戏详情页（不包含 skip-it）
  const gamesRoutes = gamesData
    .filter((game: Game) => game.slug && game.slug !== 'skip-it' && game.slug !== 'skip_it')
    .map((game: Game) => ({
      url: `${baseUrl}/games/${game.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  // 3. games 游戏列表分页：/games/1、/games/2、...
  const totalGames = gamesData.length;
  const totalPages = Math.ceil(totalGames / GAMES_PER_PAGE);
  const paginationRoutes = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationRoutes.push({
      url: `${baseUrl}/games/${i}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    });
  }

  // 4. 合并所有路由，返回给Next.js生成标准sitemap
  return [...staticRoutes, ...gamesRoutes, ...paginationRoutes];
}
