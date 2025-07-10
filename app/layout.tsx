import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Poppins, Bangers } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
});

const bangers = Bangers({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bangers',
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.doodlebaseball.com"),
  title: "Doodle Baseball | Fun Food Baseball Game Online Free",
  description: "Play the addictive Doodle Baseball game online for free! Swing your bat, hit home runs in this fun food-themed baseball simulator. Test your timing & reflexes!",
  keywords: "doodle baseball, baseball game, food baseball, online free, baseball simulator, unlocked game, sports game",
  openGraph: {
    title: "Doodle Baseball Game | Fun Food Baseball Game Online Free",
    description: "Play the addictive Doodle Baseball game online for free! Swing your bat, hit home runs in this fun food-themed baseball simulator. Test your timing & reflexes!",
    images: "/images/games/games.png", // 确保此图片路径相对于 public 文件夹是正确的
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
        {/* Google AdSense Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7718142048250196"
          crossOrigin="anonymous"></script>
        {/* 添加 Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${poppins.variable} ${bangers.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      {/* 添加Google Analytics */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
    </html>
  );
}
