import Link from 'next/link';
import Image from 'next/image';
import gamesData from '../../data/games.json';

interface Game {
  slug: string;
  title: string;
  coverImage: string;
  isRelated?: boolean;
}

const RelatedGames = () => {
  const allGames: Game[] = gamesData as Game[];
  // 筛选isRelated=true的游戏，并且最多显示30个
  const relatedGames = allGames.filter(game => game.isRelated === true).slice(0, 30);
  const targetWidth = 187; // pixels
  const targetHeight = 106; // pixels

  if (relatedGames.length === 0) {
    return null; 
  }

  return (
    <section className="py-8 bg-[#0c2461]"> 
      <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
        <p className="text-3xl font-bangers text-white mb-6 text-center sm:text-left">
          Related Games
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {relatedGames.map((game) => (
            <Link key={game.slug} href={`/games/${game.slug}`} 
               className="block group shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                  <div className="relative group rounded-lg overflow-hidden w-full aspect-[187/106]">
                      <Image
                        src={game.coverImage}
                        alt={game.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                        priority
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-white text-center font-bold text-lg px-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      {game.title}
                    </p>
                  </div>
                </div>
            </Link>
          ))}
        </div>
        {/* More Games按钮 */}
        <div className="text-center">
          <Link href="/games"
                className="inline-block bg-white text-[#0c2461] px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
            More Games
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedGames;