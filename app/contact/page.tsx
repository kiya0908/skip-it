import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faClock, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

// 为页面添加元数据
export const metadata: Metadata = {
  title: 'Contact Us - Skip It! Game',
  description: 'Contact the Skip It! team with your questions, comments, or suggestions. We\'re here to help improve your arcade gaming experience!',
  keywords: 'skip it contact, contact us, arcade game help, skip it support, game feedback',
  openGraph: {
    title: 'Contact Skip It! | Get in Touch With Us',
    description: 'Have questions or feedback about Skip It!? Contact our team and we\'ll get back to you promptly.',
    images: [
      {
        url: 'https://skipit.top/images/games/skipit.webp', // 请替换为您的实际图片URL
        width: 1200,
        height: 630,
        alt: 'Skip It! Preview',
      },
    ],
    url: 'https://skipit.top/contact', // 请替换为您的实际页面URL
    type: 'website',
  },
  robots: "index, follow",
  alternates: {
    canonical: 'https://skipit.top/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h1 className="text-4xl font-bangers mb-8 text-center text-gray-900">
            Contact Us
          </h1>

          <div className="shadcn-card p-8 border border-gray-200">
            <div className="text-center mb-8">
              <p className="text-xl font-semibold text-gray-800">
                Need assistance? We're available to help!
              </p>
            </div>

            <p className="text-gray-700 mb-6 text-center">
              In case you have any inquiries, comments, or proposals on how we can improve our platform, don't hesitate to contact us. You can drop us a line at <a href="mailto:contact@skipit.top" className="text-blue-600 hover:underline font-medium">contact@skipit.top</a>, and we'll make every effort to reply promptly.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 text-xl" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Email</h4>
                <p className="text-gray-600">
                  <a href="mailto:contact@skipit.top" className="text-blue-600 hover:underline">contact@skipit.top</a>
                </p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faClock} className="text-green-600 text-xl" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Response Time</h4>
                <p className="text-gray-600">We typically respond within 24-48 hours</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faQuestionCircle} className="text-red-600 text-xl" />
                </div>
                <h4 className="text-lg font-semibold mb-2">FAQ</h4>
                <p className="text-gray-600">
                  <Link href="/#faq" className="text-blue-600 hover:underline">
                    Check our FAQ section
                  </Link> for quick answers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}