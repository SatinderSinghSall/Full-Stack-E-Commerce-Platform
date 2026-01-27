import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-32">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-16 grid gap-12 sm:grid-cols-2 md:grid-cols-4 text-sm text-gray-600">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="prata-regular text-2xl text-black mb-4">
            WholeSale Cane Baskets
          </p>

          <p className="font-medium text-gray-800 mb-2">
            Wholesale & Supply Store
          </p>

          <p className="text-gray-600 mb-3">HOUSE OF HANDMADE PRODUCTS</p>

          <p className="max-w-md leading-relaxed">
            Bulk hampers, gifts, and eco-friendly packaging materials.
            Handcrafted with care for retail and wholesale needs.
          </p>

          {/* Social Icons */}
          {/* <div className="flex gap-4 mt-6">
            <img
              src={assets.facebook_icon}
              alt="facebook"
              className="w-5 cursor-pointer opacity-70 hover:opacity-100"
            />
            <img
              src={assets.instagram_icon}
              alt="instagram"
              className="w-5 cursor-pointer opacity-70 hover:opacity-100"
            />
            <img
              src={assets.twitter_icon}
              alt="twitter"
              className="w-5 cursor-pointer opacity-70 hover:opacity-100"
            />
          </div> */}
        </div>

        {/* Company */}
        <div>
          <p className="text-base font-semibold text-black mb-4">COMPANY</p>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" className="hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover:text-black">
                Collection
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-black">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Address */}
        <div>
          <p className="text-base font-semibold text-black mb-4">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-2 mb-4">
            <li>📞 95352 24571</li>
            <li>✉️ contact@wholesalecanebaskets.com</li>
          </ul>

          <p className="text-black font-medium mb-1">📍 Store Address</p>
          <p className="leading-relaxed text-gray-600">
            13-128, Mamulpet Rd, Ragipet, Kumbarpet, Mamulpet, Chickpet,
            Bengaluru, Karnataka – 560053, Bangalore, India
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <p className="text-center text-xs text-gray-500 py-5">
          © 2024 WholeSale Cane Baskets. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
