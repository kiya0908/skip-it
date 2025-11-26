import { MetadataRoute } from 'next';
import gamesData from '../../data/games.json';

// 游戏类型声明，便于类型检查
interface Game {
  slug: string;
}

const baseUrl = 'https://doodlebaseball.info';
const GAMES_PER_PAGE = 30; // ⚠️ 页面实际的分页数量

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 静态页面路由（首页、about、contact等）
  const staticRoutes = [
    '', // 首页
    'about',
    'contact',
    'privacy',
    'terms',
    'games', // games的第1页
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
  
  // 3. games游戏列表页动态生成分页路由 
  // 计算总页数
  const totalGames = gamesData.length;
  const totalPages = Math.ceil(totalGames / GAMES_PER_PAGE);
  
  const paginationRoutes = [];
  // 从第2页开始循环 (因为第1页就是 /games，已经在 staticRoutes 里了)
  for (let i = 2; i <= totalPages; i++) {
    paginationRoutes.push({
      url: `${baseUrl}/games?page=${i}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7, // 分页的重要性通常比详情页和首页低一点
    });
  }

  // 4. 合并所有路由，返回给Next.js生成标准sitemap
  return [...staticRoutes, ...gamesRoutes, ...paginationRoutes];
}