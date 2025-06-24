import { MetadataRoute } from 'next';
import gamesData from '../data/games.json';

interface Game {
  slug: string;
}

const baseUrl = 'https://doodlebaseball.info';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    'about',
    'contact',
    'privacy',
    'terms',
    'doodle-baseball-download',
  ].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: (route === '' ? 'weekly' : 'weekly') as 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const gamesRoutes = gamesData.map((game: Game) => ({
    url: `${baseUrl}/games/${game.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...gamesRoutes];
} 