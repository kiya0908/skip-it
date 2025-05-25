import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Poppins, Bangers } from 'next/font/google';

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
  title: "Doodle Baseball | Fun Food Baseball Game",
  description: "Play Doodle Baseball and other fun online games for free. Enjoy food-themed baseball action and more!",
  keywords: "doodle baseball, baseball game, online game, free game",
  openGraph: {
    title: "Doodle Baseball Game | Play Online for Free",
    description: "Take up the bat and strike as many balls as possible in this delicious food-themed baseball game. Test your reflexes and timing!",
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
        {/* 添加 Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${poppins.variable} ${bangers.variable} antialiased`}>
        <Header />
        <main>{children}</main> {/* 建议将主要内容包裹在 <main> 标签中 */}
        <Footer />
      </body>
    </html>
  );
}
