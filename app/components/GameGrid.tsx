import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

interface Game {
  slug: string;
  title: string;
  coverImage: string;
}

interface GameGridProps {
  games: Game[];
  title: string;
}

export default function GameGrid({ games, title }: GameGridProps) {
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;
  const totalPages = Math.ceil(games.length / pageSize);
  // 当前页要显示的游戏
  const pagedGames = games.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // 生成页码按钮（最多显示前5页，后面是“下一页”和“最后一页”）
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pageButtons = [];
    const maxPageButtons = 5;
    const showNext = currentPage < totalPages;
    // 只显示前maxPageButtons页
    for (let i = 1; i <= Math.min(totalPages, maxPageButtons); i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-12 h-12 mx-1 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-colors
            ${currentPage === i ? "bg-red-700 border-yellow-400 text-yellow-100" : "bg-[#102c6e] border-white text-white hover:bg-blue-900"}`}
          style={{ outline: currentPage === i ? '2px solid #FFD600' : 'none' }}
          aria-label={`第${i}页`}
        >
          {i}
        </button>
      );
    }
    // 下一页按钮
    if (showNext) {
      pageButtons.push(
        <button
          key="next"
          onClick={() => setCurrentPage(currentPage + 1)}
          className="w-12 h-12 mx-1 rounded-lg border-2 border-white bg-[#102c6e] text-white flex items-center justify-center text-lg font-bold hover:bg-blue-900"
          aria-label="下一页"
        >
          <span>&rarr;</span>
        </button>
      );
      // 跳转到最后一页按钮
      pageButtons.push(
        <button
          key="last"
          onClick={() => setCurrentPage(totalPages)}
          className="w-12 h-12 mx-1 rounded-lg border-2 border-white bg-[#102c6e] text-white flex items-center justify-center text-lg font-bold hover:bg-blue-900"
          aria-label="最后一页"
        >
          <span>&#8677;</span>
        </button>
      );
    }
    return (
      <div className="flex justify-center mt-8">
        {pageButtons}
      </div>
    );
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pagedGames.map((game) => (
            <Link href={`/games/${game.slug}`} key={game.slug} className="group flex flex-col items-center">
              {/* 固定图片容器尺寸为 187x106px，保证所有图片显示一致且为横向矩形 */}
              <div className="overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center" style={{ width: 187, height: 106 }}>
                <Image
                  src={game.coverImage}
                  alt={`${game.title} game`}
                  width={187}
                  height={106}
                  className="object-cover object-center w-full h-full group-hover:opacity-75"
                  style={{ width: 187, height: 106 }}
                />
              </div>
              <h3 className="mt-2 text-sm text-gray-700 text-center">{game.title}</h3>
            </Link>
          ))}
        </div>
        {/* 分页导航 */}
        {renderPagination()}
      </div>
    </section>
  );
}
