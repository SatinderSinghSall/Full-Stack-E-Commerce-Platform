import React from "react";
import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-32 border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-16 grid gap-14 sm:grid-cols-2 md:grid-cols-4 text-sm text-gray-600">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="prata-regular text-2xl text-gray-900 mb-4">
            Wedding Gift House
          </p>

          <p className="text-sm font-medium text-gray-800 mb-2">
            Wholesale & Supply Store
          </p>

          <p className="text-xs tracking-widest text-gray-500 mb-4">
            HOUSE OF GIFTS
          </p>

          <p className="max-w-md leading-relaxed text-gray-600">
            Premium wedding gifts, bulk hampers, and elegant packaging
            solutions. Handcrafted collections designed for retailers, event
            planners, and large celebrations.
          </p>

          {/* Social */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://www.instagram.com/weddinggiftshouse/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <FiInstagram className="text-lg" />
              <span className="text-sm">@weddinggiftshouse</span>
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <p className="text-sm font-semibold tracking-wide text-gray-900 mb-4">
            COMPANY
          </p>

          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/" className="hover:text-gray-900 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-900 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover:text-gray-900 transition">
                Collection
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-900 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold tracking-wide text-gray-900 mb-4">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-3 mb-5">
            <li className="flex items-start gap-3">
              <FiPhone className="mt-1 text-gray-500" />
              <span>+91 80039 99724</span>
            </li>

            <li className="flex items-start gap-3">
              <FiMail className="mt-1 text-gray-500" />
              <span>southindiagiftsdecor@gmail.com</span>
            </li>
          </ul>

          <div className="flex items-start gap-3">
            <FiMapPin className="mt-1 text-gray-500" />
            <p className="leading-relaxed text-gray-600">
              Char Street.40, 3rd Floor, K.V Cross, H Ramaiah Ln, Jolly Mohalla,
              Bengaluru, Karnataka 560053
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <p className="text-center text-xs text-gray-500 py-5 tracking-wide">
          © {new Date().getFullYear()} Wedding Gift House. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
