import Link from 'next/link';
import Image from 'next/image';
import gamesData from '../../data/games.json';

interface Game {
  slug: string;
  title: string;
  coverImage: string;
  isTopPick?: boolean;
}

const TopPicksGame = () => {
  const allGames: Game[] = gamesData;
  const topPicks = allGames.filter(game => game.isTopPick).slice(0, 5);

  if (topPicks.length === 0) {
    return null; 
  }

  return (
    <section className="py-8 bg-[#0c2461]"> {/* Синий фон как на изображении */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-3xl font-bangers text-white mb-6 text-center sm:text-left">
          Top Picks Game
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {topPicks.map((game) => (
            <Link key={game.slug} href={`/games/${game.slug}`} 
               className="block group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="aspect-square w-full relative">
                  <Image
                    src={game.coverImage}
                    alt={game.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    priority
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* 鼠标悬停时显示的游戏标题 */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-white text-center font-bold text-lg px-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      {game.title}
                    </p>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPicksGame;