import React, { useEffect, useState } from "react";
import { assets2 } from "../assets/assets";
import { Link } from "react-router-dom";

const images = [
  assets2.hero_img1,
  assets2.hero_img2,
  assets2.hero_img3,
  assets2.hero_img4,
  assets2.hero_img5,
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[70vh] sm:h-[85vh] lg:h-[90vh] overflow-hidden">
      {/* Background Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Wedding Gift House"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20 sm:bg-gradient-to-r sm:from-black/50 sm:via-black/30 sm:to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end sm:items-center">
        <div className="max-w-7xl mx-auto px-6 pb-16 sm:pb-0 w-full">
          <div className="max-w-xl text-white">
            {/* Eyebrow */}
            <p className="tracking-[0.25em] text-xs uppercase text-white/80 mb-4">
              Wedding Gift House
            </p>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              Traditional Wedding
              <br />
              Gifts & Decorations
            </h1>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-lg text-white/90 leading-relaxed">
              Premium baskets, return gifts & eco-friendly packaging solutions
              crafted for weddings, celebrations & bulk gifting across India.
            </p>

            {/* Actions */}
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
              <Link
                to="/collection"
                className="bg-white text-black px-7 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition duration-300"
              >
                Shop Collections
              </Link>

              <Link
                to="/contact"
                className="border border-white/80 px-7 py-3 text-sm tracking-wide text-white hover:bg-white hover:text-black transition duration-300"
              >
                Bulk Orders
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              i === current ? "bg-white w-5" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
