import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setVisible(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 sm:px-10 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* LOGO */}
          <Link to="/" className="w-full sm:w-auto">
            <p className="prata-regular text-[22px] sm:text-[26px] text-center sm:text-left tracking-[0.02em] text-gray-900">
              Wedding Gift House
            </p>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden sm:flex items-center gap-10 text-[14px] tracking-wide text-gray-600">
            {["/", "/collection", "/about", "/contact"].map((path, i) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative pb-1 transition-all duration-200 ${
                    isActive
                      ? "text-gray-900 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-gray-900"
                      : "hover:text-gray-900"
                  }`
                }
              >
                {["HOME", "COLLECTION", "ABOUT", "CONTACT"][i]}
              </NavLink>
            ))}
          </nav>

          {/* ICONS */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-7 px-6 sm:px-0">
            {/* Search */}
            <img
              src={assets.search_icon}
              alt="search"
              className="w-[18px] cursor-pointer opacity-70 hover:opacity-100 hover:scale-105 transition"
              onClick={() => {
                setShowSearch(true);
                navigate("/collection");
              }}
            />

            {/* Profile */}
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt="profile"
                className="w-[18px] cursor-pointer opacity-70 hover:opacity-100 hover:scale-105 transition"
                onClick={() => (!token ? navigate("/login") : null)}
              />

              {token && (
                <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
                  <div className="bg-white border border-gray-100 rounded-lg shadow-lg text-sm w-36 overflow-hidden">
                    <p
                      onClick={() => navigate("/profile")}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate("/orders")}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      Orders
                    </p>
                    <p
                      onClick={logout}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                alt="cart"
                className="w-[18px] opacity-70 hover:opacity-100 hover:scale-105 transition"
              />
              {getCartCount() > 0 && (
                <span className="absolute -right-2 -bottom-2 min-w-[16px] h-[16px] bg-gray-900 text-white text-[10px] rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <img
              src={assets.menu_icon}
              alt="menu"
              className="w-[18px] cursor-pointer sm:hidden opacity-70 hover:opacity-100 hover:scale-105 transition"
              onClick={() => setVisible(true)}
            />
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[75%] max-w-xs bg-white shadow-xl transform transition-transform duration-300 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <button
            onClick={() => setVisible(false)}
            className="mb-8 text-sm text-gray-600"
          >
            ← Back
          </button>

          <nav className="flex flex-col gap-6 text-[16px] tracking-wide text-gray-700">
            {["/", "/collection", "/about", "/contact"].map((path, i) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setVisible(false)}
                className="hover:text-gray-900 transition"
              >
                {["HOME", "COLLECTION", "ABOUT", "CONTACT"][i]}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
