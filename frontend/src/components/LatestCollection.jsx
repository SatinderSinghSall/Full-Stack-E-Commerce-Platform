import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="mt-10 mb-26">
      {/* Section Header */}
      <div className="text-center text-3xl py-8">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest handcrafted cane baskets and eco-friendly
          packaging solutions — designed for bulk orders, gifting, and everyday
          use.
        </p>
      </div>

      {/* Products Grid */}
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-16">
          {latestProducts.map((item) => (
            <div
              key={item._id}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <Link
          to="/collection"
          className="inline-block border border-black px-14 py-4 text-sm tracking-wider hover:bg-black hover:text-white transition-all duration-300"
        >
          View All Collections
        </Link>
      </div>
    </section>
  );
};

export default LatestCollection;
