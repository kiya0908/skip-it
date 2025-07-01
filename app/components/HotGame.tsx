import Link from 'next/link';
import Image from 'next/image';
import gamesData from '../../data/games.json';

interface Game {
  slug: string;
  title: string;
  coverImage: string;
  rating: number;
  isHot?: boolean;
}

const HotGame = () => {
  const allGames: Game[] = gamesData;
  // 只筛选 isHot 为 true 的游戏，并限制显示前6个
  const hotGames = allGames.filter((game: any) => game.isHot).slice(0, 6);
  const targetWidth = 150; // pixels
  const targetHeight = 84; // pixels

  if (hotGames.length === 0) {
    return null; 
  }

  return (
    <div className="w-[250px] bg-[#0c2461] rounded-lg p-3"> 
      <h2 className="text-2xl font-bangers text-white mb-4">
        Hot Games
      </h2>
      <div className="grid grid-cols-2 gap-4">
          {hotGames.map((game) => (
            <Link 
              key={game.slug} 
              href={`/games/${game.slug}`}
              className="block group rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={game.coverImage}
                  alt={game.title}
                  fill
                  sizes="180px"
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                  <p className="text-white text-center font-bold text-sm px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {game.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      </div>
  );
};

export default HotGame;