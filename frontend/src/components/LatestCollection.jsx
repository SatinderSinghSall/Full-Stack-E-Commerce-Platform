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
    <section className="my-20">
      {/* Section Header */}
      <div className="text-center mb-12 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />

        <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
          Discover our newest handcrafted cane baskets and eco-friendly
          packaging solutions — designed for bulk orders, gifting, and everyday
          use.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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

      {/* Call To Action */}
      <div className="text-center mt-14">
        <Link
          to="/collection"
          className="inline-block border border-black px-10 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-300"
        >
          View All Collections
        </Link>
      </div>
    </section>
  );
};

export default LatestCollection;
