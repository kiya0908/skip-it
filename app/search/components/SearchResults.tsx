"use client";

import Link from "next/link";
import Image from "next/image";
import games from "@/data/games.json";

interface Game {
  slug: string;
  title: string;
  coverImage: string;
  description?: string;
  isHot?: boolean;
}

interface SearchResultsProps {
  query: string;
  currentPage: number;
}

export default function SearchResults({ query, currentPage }: SearchResultsProps) {
  const lowerCaseQuery = query.toLowerCase();

  // 过滤搜索结果
  const filteredGames = games.filter(
    (game) => game.title.toLowerCase().includes(lowerCaseQuery)
  );

  // 分页逻辑
  const pageSize = 30;
  const totalPages = Math.ceil(filteredGames.length / pageSize);
  const pagedGames = filteredGames.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
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

  // 渲染分页按钮（复用GameGrid的样式）
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageButtons = [];
    const maxPageButtons = 5;
    const showNext = currentPage < totalPages;

    // 只显示前maxPageButtons页
    for (let i = 1; i <= Math.min(totalPages, maxPageButtons); i++) {
      pageButtons.push(
        <Link
          key={i}
          href={`/search?q=${encodeURIComponent(query)}&page=${i}`}
          className={`w-12 h-12 mx-1 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-colors
            ${currentPage === i ? "bg-red-700 border-yellow-400 text-yellow-100" : "bg-[#102c6e] border-white text-white hover:bg-blue-900"}`}
          style={{ outline: currentPage === i ? '2px solid #FFD600' : 'none' }}
          aria-label={`page ${i}`}
        >
          {i}
        </Link>
      );
    }

    // 下一页按钮
    if (showNext) {
      pageButtons.push(
        <Link
          key="next"
          href={`/search?q=${encodeURIComponent(query)}&page=${currentPage + 1}`}
          className="w-12 h-12 mx-1 rounded-lg border-2 border-white bg-[#102c6e] text-white flex items-center justify-center text-lg font-bold hover:bg-blue-900"
          aria-label="next page"
        >
          <span>&rarr;</span>
        </Link>
      );

      // 跳转到最后一页按钮
      pageButtons.push(
        <Link
          key="last"
          href={`/search?q=${encodeURIComponent(query)}&page=${totalPages}`}
          className="w-12 h-12 mx-1 rounded-lg border-2 border-white bg-[#102c6e] text-white flex items-center justify-center text-lg font-bold hover:bg-blue-900"
          aria-label="final page"
        >
          <span>&#8677;</span>
        </Link>
      );
    }

    return (
      <div className="flex justify-center mt-8">
        {pageButtons}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {filteredGames.length > 0 ? (
        <div>
          <h1 className="text-2xl font-bold mb-6">
            Results for &apos;{query}&apos; ({filteredGames.length} {filteredGames.length === 1 ? 'result' : 'results'})
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pagedGames.map((game: Game) => (
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
                <h2 className="mt-2 text-sm text-gray-700">
                  {highlightQuery(game.title)}
                </h2>
              </Link>
            ))}
          </div>

          {/* 分页导航 */}
          {renderPagination()}
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
                    <h2 className="mt-2 text-sm text-gray-700">{game.title}</h2>
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
