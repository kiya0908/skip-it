"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const menuItems = [
  { href: "/#play", label: "Play Game" },
  { href: "/#how-to-play", label: "How to Play" },
  { href: "/#features", label: "Features" },
  { href: "/#tips-and-tricks", label: "Tips&Tricks" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#0c2461] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                className="h-10 w-auto"
                src="/images/games/index.png"
                alt="Doodle Baseball Logo"
                width={40}
                height={40}
                priority
              />
              <p className="ml-2 text-2xl font-bangers text-white">Doodle Baseball</p>
            </Link>
          </div>
          {/* 移动端菜单按钮，仅小屏显示 */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span className="sr-only">mainmamu</span>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="block w-full h-0.5 bg-white"></span>
                <span className="block w-full h-0.5 bg-white"></span>
                <span className="block w-full h-0.5 bg-white"></span>
              </div>
            </button>
          </div>
          {/* PC端菜单 */}
          <nav className="hidden lg:flex lg:space-x-8 lg:items-center">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            <button
              className="ml-4 bg-[#d7263d] text-white px-5 py-2 rounded-md font-bold text-sm hover:bg-[#a81c2a] transition-colors"
              onClick={() => window.location.href = "/doodle-baseball-download"}
            >
              Download
            </button>
          </nav>
        </div>
      </div>
      {/* 移动端菜单，仅小屏显示 */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden absolute left-0 right-0 z-40 bg-[#0c2461] shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#1e3c72]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              className="mt-2 px-5 py-2 rounded-md bg-[#d7263d] text-white font-bold text-base hover:bg-[#a81c2a] transition-colors shadow"
              onClick={() => { setMobileMenuOpen(false); window.location.href = "/doodle-baseball-download"; }}
            >
              Download
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
