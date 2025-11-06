//所有游戏列表页
import type { Metadata } from "next";
import GamesContent from "./components/GamesContent";

// 静态SEO元数据
export const metadata: Metadata = {
  title: "All Games | Doodle Baseball - Free Online Games Collection",
  description: "Browse our complete collection of free online games. Play baseball games, puzzle games, action games and more at Doodle Baseball.",
  keywords: "online games, free games, baseball games, game collection, play games online",
  alternates: {
    canonical: "https://doodlebaseball.info/games",
  },
  openGraph: {
    title: "All Games | Doodle Baseball",
    description: "Browse our complete collection of free online games. Play baseball games, puzzle games, action games and more at Doodle Baseball.",
    url: "https://doodlebaseball.info/games",
    type: "website",
    images: "/images/games/games.png",
  },
  robots: "index, follow",
};

export default function GamesPage() {
  return <GamesContent />;
}
