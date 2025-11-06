import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "./components/SearchResults";

// 动态生成元数据
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Promise<Metadata> {
  const query = searchParams.q || "";

  // 为空搜索提供默认元数据
  if (!query) {
    return {
      title: "Search Games | Doodle Baseball",
      description: "Search for your favorite games on Doodle Baseball",
      alternates: {
        canonical: "https://doodlebaseball.info/search",
      },
      robots: "index, follow",
    };
  }

  // 动态生成基于搜索词的元数据
  const title = `Searching for: ${query}`;
  const description = `Searching for: ${query}`;
  const canonicalUrl = `https://doodlebaseball.info/search?q=${encodeURIComponent(query)}`;

  return {
    title,
    description,
    keywords: query,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: "/images/games/games.png",
    },
    robots: "index, follow",
  };
}

// 服务端组件 - 接收 searchParams
export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading...</div>}>
      <SearchResults query={query} />
    </Suspense>
  );
}
