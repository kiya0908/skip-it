import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Doodle Baseball | Play on PC, Console, and Mobile',
  description: 'Get Doodle Baseball for your favorite platform! Download links and system requirements for PC (Steam), Xbox, PlayStation, Nintendo Switch, Android, and iOS.',
  keywords: 'Doodle Baseball, download, PC, console, mobile, Steam, Xbox, PlayStation, Nintendo Switch, Android, iOS',
};

const DownloadPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bangers text-gray-900 mb-4 tracking-wide">
            Download Doodle Baseball
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Experience the fun on your platform of choice. Doodle Baseball is available across multiple devices.
          </p>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bangers text-gray-900 mb-6 text-center tracking-wide">
            About Doodle Baseball
          </h2>
          <div className="text-gray-700 space-y-4 text-lg bg-white p-8 rounded-lg shadow-lg mb-8">
            <p>
              Hey there, game fans! Looking for a game that'll bring a smile to your face? You're in the right place! Doodle Baseball is now available, so you can get your game on wherever you are.
            </p>
            <p>
              Want to play on mobile? We've got you covered! Our mobile version brings the same exciting fun right to your pocket. The controls are perfectly tuned for touchscreens, so you won't miss a swing!
            </p>
            <p>
              PC gamers haven't been forgotten either! Play online and challenge your friends. The physics-based gameplay means no two games are ever the same.
            </p>
            <p>
              What makes Doodle Baseball special? It's simple - we've built a game that's easy to pick up and play, but hard to put down. The charming graphics and engaging gameplay will keep you entertained for hours.
            </p>
            <p>
              Our game is lightweight and designed for quick fun. We know your time is valuable. The game is optimized for fast loading and smooth performance on most devices.
            </p>
          </div>
        </section>

        {/* PC Downloads Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bangers text-gray-900 mb-8 text-center tracking-wide">
            PC Downloads
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center mb-16 relative">
            <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg font-bold">
              Coming Soon
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-32 h-32 mb-4 flex items-center justify-center">
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/steam.svg" 
                  alt="Steam" 
                  className="w-24 h-24"
                />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Steam</h3>
              <p className="text-gray-700 mb-6">Windows, macOS, Linux</p>
              <button
                disabled
                className="inline-block bg-gray-600 text-white font-bold py-2 px-6 rounded-md cursor-not-allowed"
                aria-label="Coming Soon to Steam"
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* Console Section */}
          <h2 className="text-4xl font-bangers text-gray-900 mb-8 text-center tracking-wide">
            Console
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Xbox */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 mb-4 flex items-center justify-center">
                  <img 
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/xbox.svg" 
                    alt="Xbox" 
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Xbox</h3>
                <p className="text-gray-700 mb-4">Xbox Series X|S, Xbox One</p>
                <a 
                  href="https://apps.microsoft.com/detail/9nbfjn90nrbr?" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#cd2121] text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
                  aria-label="Get on Xbox Store"
                  tabIndex={0}
                >
                  Get on Xbox Store
                </a>
              </div>
            </div>

            {/* PlayStation */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
              <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg font-bold">
                Coming Soon
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 mb-4 flex items-center justify-center">
                  <img 
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/playstation.svg" 
                    alt="PlayStation" 
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">PlayStation</h3>
                <p className="text-gray-700 mb-4">PS5, PS4</p>
                <button
                  disabled
                  className="inline-block bg-gray-600 text-white font-bold py-2 px-6 rounded-md cursor-not-allowed"
                  aria-label="Coming Soon to PlayStation"
                >
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Nintendo Switch */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
              <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg font-bold">
                Coming Soon
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 mb-4 flex items-center justify-center">
                  <img 
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/nintendoswitch.svg" 
                    alt="Nintendo Switch" 
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nintendo Switch</h3>
                <p className="text-gray-700 mb-4">Switch, Switch Lite</p>
                <button 
                  disabled 
                  className="inline-block bg-gray-600 text-white font-bold py-2 px-6 rounded-md cursor-not-allowed"
                  aria-label="Coming Soon to Nintendo Switch"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Section */}
          <h2 className="text-4xl font-bangers text-gray-900 mb-8 text-center tracking-wide">
            Mobile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Android */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 mb-4 flex items-center justify-center">
                  <img 
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/android.svg" 
                    alt="Android" 
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Android</h3>
                <p className="text-gray-700 mb-4">Android 8.0+</p>
                <a 
                  href="https://play.google.com/store/search?q=doodle%20baseball&c=apps" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#cd2121] text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
                  aria-label="Get on Google Play"
                  tabIndex={0}
                >
                  Get on Google Play
                </a>
              </div>
            </div>

            {/* iOS */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 mb-4 flex items-center justify-center">
                  <img 
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/appstore.svg" 
                    alt="iOS" 
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">iOS</h3>
                <p className="text-gray-700 mb-4">iOS 13.0+</p>
                <a 
                  href="https://apps.apple.com/us/app/doodle-baseball-game/id6473097811" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#cd2121] text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
                  aria-label="Get on App Store"
                  tabIndex={0}
                >
                  Get on App Store
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* System Requirements Section */}
        <section className="mb-16">
          <div className="relative mb-8">
            <h2 className="text-4xl font-bangers text-gray-900 mb-6 text-center tracking-wide">
              System Requirements
            </h2>
          </div>

          
          {/* PC Requirements */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">PC Requirements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl text-gray-700 font-bold mb-4">Minimum:</h4>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>OS: Windows 10 64-bit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Processor: Intel Core i5-4460 / AMD FX-8350</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Memory: 8 GB RAM</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Graphics: NVIDIA GTX 760 / AMD Radeon R7 260x</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>DirectX: Version 11</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Storage: 15 GB available space</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Sound Card: DirectX compatible</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-2xl text-gray-700 font-bold mb-4">Recommended:</h4>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>OS: Windows 10/11 64-bit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Processor: Intel Core i7-8700K / AMD Ryzen 5 3600X</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Memory: 16 GB RAM</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Graphics: NVIDIA GTX 1070 / AMD RX 5700</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>DirectX: Version 12</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Storage: 15 GB available space (SSD recommended)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Sound Card: DirectX compatible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Console Notes */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Console Notes</h3>
            
            <p className="text-gray-700 mb-4">Repo Game is optimized for both current and previous generation consoles:</p>
            
            <ul className="text-gray-700 space-y-3">
              <li className="flex items-start">
                <span className="text-gray-700 mr-2">•</span>
                <span><strong>PS5/Xbox Series X:</strong> 4K resolution at 60 FPS with enhanced lighting and physics effects</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-700 mr-2">•</span>
                <span><strong>PS4 Pro/Xbox One X:</strong> 1440p resolution at 30 FPS</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-700 mr-2">•</span>
                <span><strong>PS4/Xbox One:</strong> 1080p resolution at 30 FPS with reduced environmental details</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-700 mr-2">•</span>
                <span><strong>Nintendo Switch:</strong> 720p (handheld)/1080p (docked) at 30 FPS with optimized graphics</span>
              </li>
            </ul>
          </div>
          
          {/* Mobile Requirements */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Mobile Requirements</h3>
            
            <p className="text-gray-700 mb-4">For detailed mobile installation and optimization guides, please visit our <a href="#" className="text-gray-700 hover:underline">Mobile Guide</a> page.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl text-gray-700 font-bold mb-4">Android:</h4>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>Android 8.0 (Oreo) or higher</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>2GB RAM minimum (4GB recommended)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>1.5GB available storage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>OpenGL ES 3.0 support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>ARM64 processor architecture</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-2xl text-gray-700 font-bold mb-4">iOS:</h4>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>iOS 13.0 or later</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>iPhone 8 or newer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>iPad 6th generation or newer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>2GB available storage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>A11 Bionic chip or better</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-[#0c2461] rounded-lg shadow-xl">
          <h2 className="text-4xl font-bangers text-white mb-6 tracking-wide">
            Ready to Play?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the fun and hit some home runs! Click the button below to start playing Doodle Baseball instantly in your browser.
          </p>
          <Link href="/" legacyBehavior>
            <a className="inline-block bg-[#d7263d] text-gray-900 font-bangers text-2xl py-4 px-10 rounded-lg hover:bg-[#d7263d] transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
               aria-label="Play Doodle Baseball Now"
               tabIndex={0}>
              Play Doodle Baseball Now!
            </a>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default DownloadPage;