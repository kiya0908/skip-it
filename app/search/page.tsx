import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "./components/SearchResults";

// 动态生成元数据
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}): Promise<Metadata> {
  const query = searchParams.q || "";
  const page = searchParams.page || "1";
  const pageNumber = Number(page);

  // 为空搜索提供默认元数据
  if (!query) {
    return {
      title: "Search Games | Skip It!",
      description: "Search for your favorite games on Skip It!",
      alternates: {
        canonical: "https://skipit.top/search",
      },
      robots: "index, follow",
    };
  }

  // 动态生成基于搜索词和页码的元数据
  const baseTitle = `Searching for: ${query}`;
  const title = pageNumber > 1 ? `${baseTitle} - Page ${pageNumber}` : baseTitle;
  const description = pageNumber > 1 ? `Search results for: ${query} - Page ${pageNumber}` : `Search results for: ${query}`;

  const canonicalUrl = pageNumber > 1
    ? `https://skipit.top/search?q=${encodeURIComponent(query)}&page=${pageNumber}`
    : `https://skipit.top/search?q=${encodeURIComponent(query)}`;

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
      images: "/images/games/skipit.webp",
    },
    robots: "index, follow",
  };
}

// 服务端组件 - 接收 searchParams
export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const query = searchParams.q || "";
  const currentPage = Number(searchParams.page) || 1;

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading...</div>}>
      <SearchResults query={query} currentPage={currentPage} />
    </Suspense>
  );
}
