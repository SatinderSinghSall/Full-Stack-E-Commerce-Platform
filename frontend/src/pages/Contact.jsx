import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import {
  FiPhone,
  FiMail,
  FiInstagram,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";

const Contact = () => {
  return (
    <div className="bg-white">
      {/* Page Title */}
      <div className="pt-14 pb-10 text-center border-t text-4xl sm:text-5xl">
        <Title text1="CONTACT" text2="US" />
        <p className="mt-4 text-sm sm:text-base text-gray-500">
          We’re here to help with bulk orders & business enquiries
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Image */}
          <div className="w-full">
            <img
              src={assets.contact_img}
              alt="Wedding Gift House Bangalore"
              className="rounded-xl shadow-md w-full object-cover"
            />
          </div>

          {/* Contact Card */}
          <div className="bg-gray-50 rounded-xl shadow-sm p-10 flex flex-col gap-8">
            {/* Brand */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Wedding Gift House
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Wholesale Wedding Gifts & Packaging Solutions
              </p>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <FiMapPin className="text-xl text-gray-700 mt-1" />
              <div className="text-gray-600 text-sm leading-relaxed">
                <p className="font-medium text-gray-800">
                  Bengaluru, Karnataka, India
                </p>
                <p className="mt-1">
                  Char Street.40, 3rd Floor, K.V Cross,
                  <br />
                  H Ramaiah Lane, Jolly Mohalla,
                  <br />
                  Bengaluru – 560053
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 text-gray-600">
                <FiPhone />
                <span className="font-medium">8003999724</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FiMail />
                <span className="font-medium">
                  southindiagiftsdecor@gmail.com
                </span>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3 text-gray-600">
              <FiInstagram />
              <a
                href="https://www.instagram.com/weddinggiftshouse/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-gray-800 hover:underline"
              >
                instagram.com/weddinggiftshouse
              </a>
            </div>

            {/* Business Section */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-3 mb-2">
                <FiBriefcase className="text-gray-700" />
                <h3 className="font-semibold text-lg text-gray-800">
                  Wholesale & Bulk Orders
                </h3>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                We specialize in wedding gifts, return gifts, decorative boxes,
                hampers, and customized packaging solutions. Ideal for
                retailers, event planners, and corporate gifting partners.
              </p>
            </div>

            {/* CTA */}
            <button className="mt-4 w-fit px-8 py-3 border border-black text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
              Contact for Bulk Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
