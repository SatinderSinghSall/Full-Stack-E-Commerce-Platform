import React from "react";
import Title from "../components/Title";
import { assets2 } from "../assets/assets";
import {
  FiPhone,
  FiMail,
  FiInstagram,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";

const Contact = () => {
  return (
    <div className="bg-[#FFF8F1]">
      {/* Page Title */}
      <div className="pt-14 pb-12 text-center border-t border-[#ead9c5]">
        <Title text1="CONTACT" text2="US" />
        <p className="mt-4 text-sm sm:text-base text-gray-600">
          We’re happy to assist with wedding, festive & bulk gifting enquiries
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl border border-[#e7cfa8] pointer-events-none" />
            <img
              src={assets2.contact_us}
              alt="Wedding Gift House Bangalore"
              className="rounded-3xl shadow-md w-full object-cover"
            />
          </div>

          {/* Contact Card */}
          <div className="bg-[#FFFBF6] rounded-3xl border border-[#ead9c5] shadow-sm p-10 flex flex-col gap-8">
            {/* Brand */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Wedding Gift House
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Traditional Wedding Gifts & Packaging Solutions
              </p>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <FiMapPin className="text-xl text-[#8b5a2b] mt-1" />
              <div className="text-gray-700 text-sm leading-relaxed">
                <p className="font-medium text-gray-900">
                  Bengaluru, Karnataka
                </p>
                <p className="mt-1">
                  Char Street, 40, 3rd Floor, K.V Cross,
                  <br />
                  H Ramaiah Lane, Jolly Mohalla,
                  <br />
                  Bengaluru – 560053
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 text-gray-700">
                <FiPhone className="text-[#8b5a2b]" />
                <span className="font-medium">8003999724</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700 break-all">
                <FiMail className="text-[#8b5a2b]" />
                <span className="font-medium">
                  southindiagiftsdecor@gmail.com
                </span>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3 text-gray-700">
              <FiInstagram className="text-[#8b5a2b]" />
              <a
                href="https://www.instagram.com/weddinggiftshouse/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-gray-900 hover:underline"
              >
                instagram.com/weddinggiftshouse
              </a>
            </div>

            {/* Business Section */}
            <div className="border-t border-[#ead9c5] pt-6">
              <div className="flex items-center gap-3 mb-2">
                <FiBriefcase className="text-[#8b5a2b]" />
                <h3 className="font-semibold text-lg text-gray-900">
                  Wholesale & Bulk Orders
                </h3>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                We specialize in traditional wedding gifts, return gifts,
                decorative boxes, hampers, and customized packaging — perfect
                for retailers, wedding planners, and large celebrations.
              </p>
            </div>

            {/* CTA */}
            <button className="mt-4 w-fit px-8 py-3 border border-[#8b5a2b] text-sm font-medium text-[#8b5a2b] hover:bg-[#8b5a2b] hover:text-white transition-all duration-300">
              Enquire for Bulk Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
