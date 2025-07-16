import { Poppins, Bangers } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '600', '700'], // 减少字体权重，只保留必要的
  preload: true,
});

export const bangers = Bangers({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bangers',
  weight: ['400'],
  preload: true,
});