import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0c2461] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页脚链接 */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link href="/about" className="px-4 py-2 bg-white text-[#0c2461] rounded-md font-semibold hover:bg-gray-200 transition-colors flex items-center">
            <i className="fas fa-info-circle mr-2"></i> ABOUT US
          </Link>
          <Link href="/contact" className="px-4 py-2 bg-white text-[#0c2461] rounded-md font-semibold hover:bg-gray-200 transition-colors flex items-center">
            <i className="fas fa-envelope mr-2"></i> CONTACT US
          </Link>
          <Link href="/privacy" className="px-4 py-2 bg-white text-[#0c2461] rounded-md font-semibold hover:bg-gray-200 transition-colors flex items-center">
            <i className="fas fa-shield-alt mr-2"></i> PRIVACY POLICY
          </Link>
          <Link href="/terms" className="px-4 py-2 bg-white text-[#0c2461] rounded-md font-semibold hover:bg-gray-200 transition-colors flex items-center">
            <i className="fas fa-file-contract mr-2"></i> TERMS OF SERVICE
          </Link>
        </div>
        {/* 版权信息 */}
        <div className="text-center text-gray-400 text-sm">
          &copy; 2025{" "}
          <a
            href="https://link.zhihu.com/?target=https%3a%2f%2fdoodlebaseball.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline hover:text-gray-200 transition-colors"
          >
            Doodle Baseball
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
