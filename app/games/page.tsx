//所有游戏列表页
import type { Metadata } from "next";
import GamesContent from "./components/GamesContent";

// 动态生成元数据（支持分页）
export async function generateMetadata({ searchParams }: { searchParams: { page?: string } }): Promise<Metadata> {
  const page = searchParams.page || '1';
  const pageNumber = Number(page);

  const baseTitle = "All Games | Doodle Baseball - Free Online Games Collection";
  const baseDescription = "Browse our complete collection of free online games. Play baseball games, puzzle games, action games and more at Doodle Baseball.";
  const baseUrl = "https://doodlebaseball.info/games";

  // 如果是第1页，使用基础元数据；否则添加页码
  const title = pageNumber > 1 ? `${baseTitle} - Page ${pageNumber}` : baseTitle;
  const description = pageNumber > 1 ? `${baseDescription} - Page ${pageNumber}` : baseDescription;
  const canonical = pageNumber > 1 ? `${baseUrl}?page=${pageNumber}` : baseUrl;

  return {
    title,
    description,
    keywords: "online games, free games, baseball games, game collection, play games online",
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: "/images/games/games.png",
    },
    robots: "index, follow",
  };
}

export default function GamesPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1;
  return <GamesContent currentPage={currentPage} />;
}
