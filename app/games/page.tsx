// 所有游戏列表页：/games 统一重定向到 /games/1，分页使用 /games/1、/games/2 等形式
import { redirect } from 'next/navigation';

export default function GamesPage() {
  redirect('/games/1');
}
