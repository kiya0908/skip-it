"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import games from "@/data/games.json";
import { Suspense } from "react";

interface Game {
  slug: string;
  title: string;
  coverImage: string;
  isHot?: boolean;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const lowerCaseQuery = query.toLowerCase();

  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(lowerCaseQuery) ||
      (game.description &&
        game.description.toLowerCase().includes(lowerCaseQuery))
  );

  const hotGames = games.filter((game) => game.isHot);

  const highlightQuery = (text: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === lowerCaseQuery ? (
            <span key={index} className="bg-yellow-300 text-black">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {filteredGames.length > 0 ? (
        <div>
          <h1 className="text-2xl font-bold mb-6">
            Results for &apos;{query}&apos;
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredGames.map((game: Game) => (
              <Link
                href={`/games/${game.slug}`}
                key={game.slug}
                className="group"
              >
                <div className="overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center" style={{ width: 187, height: 106 }}>
                  <Image
                    src={game.coverImage}
                    alt={game.title}
                    width={187}
                    height={106}
                    className="object-cover object-center w-full h-full group-hover:opacity-75"
                    style={{ width: 187, height: 106 }}
                  />
                </div>
                <h3 className="mt-2 text-sm text-gray-700">
                  {highlightQuery(game.title)}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            No results for &apos;{query}&apos;
          </h1>
          <p className="mb-8">
            We couldn&apos;t find any games matching your search.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Homepage
          </Link>

          {hotGames.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">Recommended Games</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {hotGames.map((game: Game) => (
                  <Link
                    href={`/games/${game.slug}`}
                    key={game.slug}
                    className="group"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                      <Image
                        src={game.coverImage}
                        alt={game.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-2 text-sm text-gray-700">{game.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
