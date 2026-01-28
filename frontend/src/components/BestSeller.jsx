import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <section className="my-10">
      <div className="px-6 sm:px-10 md:px-16 lg:px-20">
        {/* Section Header */}
        <div className="text-center text-3xl py-8">
          <Title text1="BEST" text2="SELLERS" />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Our most loved and frequently purchased products — trusted by
            retailers, event planners, and bulk buyers for their quality,
            design, and value.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {bestSeller.map((item) => (
            <div
              key={item._id}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
