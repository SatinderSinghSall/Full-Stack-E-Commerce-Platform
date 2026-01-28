import React from "react";
import { FiInstagram } from "react-icons/fi";

const posts = [
  "https://www.instagram.com/reel/DSmlcF2kgq4/",
  "https://www.instagram.com/reel/DTS38ZHE895/",
  "https://www.instagram.com/reel/DTVGtyhEgid/",
];

const InstagramFeed = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center items-center gap-2 mb-4">
            <FiInstagram className="text-2xl" />
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Follow Us on Instagram
            </h2>
          </div>

          <p className="text-gray-600 max-w-xl mx-auto">
            Explore our latest wedding gifts, baskets, and premium packaging —
            straight from our store.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((url, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition"
            >
              <iframe
                src={`${url}embed`}
                className="w-full h-[480px]"
                frameBorder="0"
                scrolling="no"
                allowTransparency
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="https://www.instagram.com/weddinggiftshouse/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-black px-10 py-3 text-sm hover:bg-black hover:text-white transition"
          >
            <FiInstagram />
            View More on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
