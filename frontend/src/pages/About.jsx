import React from "react";
import Title from "../components/Title";
import { assets2 } from "../assets/assets";
import { FiGift, FiLayers, FiUsers } from "react-icons/fi";

const About = () => {
  return (
    <div className="bg-[#FFF8F1]">
      {/* Header */}
      <div className="pt-10 pb-12 text-center border-t border-[#e6d6c6]">
        <Title text1="ABOUT" text2="US" />
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Celebrating traditions with thoughtfully curated wedding gifts,
          festive décor, and timeless packaging solutions.
        </p>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl border border-[#e7cfa8] pointer-events-none" />
            <img
              src={assets2.about_us}
              alt="Wedding Gift House Store"
              className="w-full h-[520px] object-cover rounded-3xl shadow-md"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 text-gray-700 text-sm leading-relaxed">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Wedding Gift House
            </h2>

            <p>
              Wedding Gift House is a trusted destination for traditional
              wedding gifts, return gifts, and festive packaging. Our
              collections are inspired by Indian celebrations — rich in culture,
              warmth, and craftsmanship.
            </p>

            <p>
              From handcrafted baskets and decorative trays to premium gift
              boxes and bulk gifting essentials, we support families, retailers,
              and event planners with products that elevate every ceremony.
            </p>

            {/* Mission */}
            <div className="mt-4 p-6 bg-[#FFFBF6] rounded-2xl border border-[#ead9c5]">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Our Promise
              </h3>
              <p>
                To honor traditions through quality craftsmanship, reliable
                wholesale supply, and designs that make every wedding moment
                feel special.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-b from-[#FFF3E4] to-[#FFF8F1] py-24">
        <div className="text-center mb-16">
          <Title text1="WHY" text2="CHOOSE US" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card */}
          <div className="bg-[#FFFBF6] p-8 rounded-3xl border border-[#ead9c5] shadow-sm hover:shadow-md transition">
            <FiGift className="text-2xl text-[#8b5a2b] mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">
              Festive Gifting Collection
            </h4>
            <p className="text-gray-600 text-sm">
              Traditional wedding gifts, decorative trays, baskets, and return
              gift solutions designed for Indian ceremonies and celebrations.
            </p>
          </div>

          {/* Card */}
          <div className="bg-[#FFFBF6] p-8 rounded-3xl border border-[#ead9c5] shadow-sm hover:shadow-md transition">
            <FiLayers className="text-2xl text-[#8b5a2b] mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">
              Bulk & Wholesale Strength
            </h4>
            <p className="text-gray-600 text-sm">
              Seamless bulk ordering, consistent quality, and pricing tailored
              for retailers, wedding planners, and large events.
            </p>
          </div>

          {/* Card */}
          <div className="bg-[#FFFBF6] p-8 rounded-3xl border border-[#ead9c5] shadow-sm hover:shadow-md transition">
            <FiUsers className="text-2xl text-[#8b5a2b] mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">
              Rooted in Trust
            </h4>
            <p className="text-gray-600 text-sm">
              Built on long-term relationships, timely delivery, and a deep
              understanding of traditional Indian wedding needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
