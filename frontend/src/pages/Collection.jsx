import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import CollectionSkeleton from "../components/CollectionSkeleton";

const ITEMS_PER_PAGE = 16;

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  /* -------------------- FILTER HANDLERS -------------------- */
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  /* -------------------- APPLY FILTER -------------------- */
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    setFilterProducts(productsCopy);
  };

  /* -------------------- SORT -------------------- */
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        fpCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        fpCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }

    setFilterProducts(fpCopy);
  };

  /* -------------------- EFFECTS -------------------- */

  // Loading logic (FIXED)
  // useEffect(() => {
  //   if (!products || products.length === 0) {
  //     setLoading(true);
  //     return;
  //   }

  //   setLoading(false);
  // }, [products]);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  useEffect(() => {
    applyFilter();
    setCurrentPage(1);
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  /* -------------------- PAGINATION -------------------- */
  const totalPages = Math.ceil(filterProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filterProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);

    return pages;
  };

  const isEmpty = !loading && filterProducts.length === 0;

  /* -------------------- JSX -------------------- */
  return (
    <>
      <Helmet>
        <title>
          Wedding Gift Collections | Bulk & Wholesale Wedding Gifts in India
        </title>
        <meta
          name="description"
          content="Explore our complete range of wedding gifts, return gifts, trays, baskets and festive packaging available in bulk and wholesale quantities across India."
        />
        <link rel="canonical" href="https://gifthouse.vercel.app/collection" />
      </Helmet>

      <div className="px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
          {/* Filters */}
          <div className="min-w-60">
            <p
              onClick={() => setShowFilter(!showFilter)}
              className="my-2 text-xl flex items-center cursor-pointer gap-2"
            >
              FILTERS
              <img
                className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
                src={assets.dropdown_icon}
                alt=""
              />
            </p>

            <div
              className={`border border-gray-300 pl-5 py-3 mt-6 ${
                showFilter ? "" : "hidden"
              } sm:block`}
            >
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    value="Decorations"
                    onChange={toggleCategory}
                  />
                  Decorations
                </label>

                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    value="Gifts"
                    onChange={toggleCategory}
                  />
                  Gifts
                </label>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1">
            <div className="flex justify-between text-base sm:text-2xl mb-4">
              <Title text1="ALL" text2="COLLECTIONS" />
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border-2 border-gray-300 text-sm px-2"
              >
                <option value="relavent">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

            {/* Content */}
            {loading ? (
              <CollectionSkeleton count={12} />
            ) : isEmpty ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  No products available
                </h2>
                <p className="text-gray-500 max-w-md mb-6">
                  Products haven’t been added to this collection yet.
                </p>

                {(category.length > 0 || subCategory.length > 0 || search) && (
                  <button
                    onClick={() => {
                      setCategory([]);
                      setSubCategory([]);
                      setCurrentPage(1);
                    }}
                    className="px-6 py-2 border border-black hover:bg-black hover:text-white transition"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                  {paginatedProducts.map((item) => (
                    <ProductItem
                      key={item._id}
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                      First
                    </button>

                    <button
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                      Prev
                    </button>

                    {getPageNumbers().map((page, i) =>
                      page === "..." ? (
                        <span key={i} className="px-2 text-gray-500">
                          ...
                        </span>
                      ) : (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 border rounded ${
                            currentPage === page
                              ? "bg-black text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                      Next
                    </button>

                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                      Last
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
