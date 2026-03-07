import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Poppins, Bangers } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import ClientOptimizer from "./components/ClientOptimizer";
import Script from "next/script"; // 新增引入  next Script 组件

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '600', '700'], // 减少字体权重
});

const bangers = Bangers({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bangers',
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skipit.top"),
  title: "Skip It! | Fun Rope Jumping Arcade Game Online Free",
  description: "Play the addictive Skip It! game online for free! Test your timing and reflexes as you jump over the swinging rope in this fun arcade game.",
  keywords: "skip it, jump game, arcade game, timing game, free online game, rope jumping, unlocked game",
  openGraph: {
    title: "Skip It! Game | Fun Rope Jumping Arcade Game Online Free",
    description: "Play the addictive Skip It! game online for free! Test your timing and reflexes as you jump over the swinging rope in this fun arcade game.",
    images: "/images/games/skipit.webp",
    type: "website"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script - 延迟加载 */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

        {/* Font Awesome CDN 样式 */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        {/* 游戏资源预连接优化 */}
        <link rel="preconnect" href="https://games.crazygames.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://hotgames.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://games.crazygames.com" />
        <link rel="dns-prefetch" href="https://hotgames.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/images/games/skipit.webp" />
      </head>
      <body className={`${poppins.variable} ${bangers.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ClientOptimizer />

        {/* 【新增 3】AdSense 核心脚本移到这里 */}
        {/* strategy="afterInteractive" 确保页面可交互后再加载，避免白屏和 React 冲突 */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7718142048250196"
          crossOrigin="anonymous"
        />
        {/* 添加Google Analytics */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
      </body>
    </html>
  );
}
