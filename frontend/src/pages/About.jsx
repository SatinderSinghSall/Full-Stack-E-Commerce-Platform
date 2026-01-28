import React from "react";
import Title from "../components/Title";
import { assets2 } from "../assets/assets";
import { FiGift, FiLayers, FiUsers } from "react-icons/fi";

const About = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="pt-8 pb-10 text-center border-t text-4xl sm:text-5xl">
        <Title text1="ABOUT" text2="US" />
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          Trusted wholesale and retail gifting solutions crafted for weddings,
          celebrations, and meaningful occasions.
        </p>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative">
            <img
              src={assets2.about_img2}
              alt="Wedding Gift House Store"
              className="w-full h-[520px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 text-gray-600 text-sm leading-relaxed">
            <h2 className="text-3xl font-semibold text-gray-900">
              Wedding Gift House
            </h2>

            <p>
              Wedding Gift House is a dedicated wholesale and retail gifting
              destination, specializing in elegant wedding gifts, return gifts,
              and premium packaging solutions. Our products are designed to add
              charm, meaning, and sophistication to every celebration.
            </p>

            <p>
              From decorative gift boxes and handcrafted baskets to premium
              return gifts and packaging accessories, our collection supports
              event planners, retailers, and bulk buyers with quality-driven,
              presentation-focused solutions.
            </p>

            {/* Mission */}
            <div className="mt-4 p-6 bg-gray-50 rounded-xl border">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Our Mission
              </h3>
              <p>
                To simplify gifting through reliable wholesale solutions,
                consistent quality, and timeless designs — empowering businesses
                and individuals to deliver memorable gifting experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-20">
        <div className="text-center mb-14 text-4xl sm:text-5xl">
          <Title text1="WHY" text2="CHOOSE US" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card */}
          <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
            <FiGift className="text-2xl text-gray-900 mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">
              Curated Gifting Collection
            </h4>
            <p className="text-gray-600 text-sm">
              A refined selection of wedding gifts, return gifts, decorative
              boxes, baskets, and packaging items tailored for celebrations of
              all sizes.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
            <FiLayers className="text-2xl text-gray-900 mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">
              Wholesale & Bulk Expertise
            </h4>
            <p className="text-gray-600 text-sm">
              Built for retailers and event professionals, offering scalable
              supply, transparent pricing, and dependable fulfillment.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
            <FiUsers className="text-2xl text-gray-900 mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">
              Trusted Gifting Partner
            </h4>
            <p className="text-gray-600 text-sm">
              We focus on long-term relationships through consistent quality,
              timely delivery, and a customer-first approach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
