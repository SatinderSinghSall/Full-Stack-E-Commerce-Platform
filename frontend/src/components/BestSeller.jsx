import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import BestSellerSkeleton from "./BestSellerSkeleton";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // if products are not yet available, keep loading
  //   if (!products || products.length === 0) {
  //     setLoading(true);
  //     return;
  //   }

  //   // once products arrive
  //   const bestProduct = products.filter((item) => item.bestseller);
  //   setBestSeller(bestProduct.slice(0, 5));
  //   setLoading(false);
  // }, [products]);

  useEffect(() => {
    if (!products) return; // still fetching

    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
    setLoading(false);
  }, [products]);

  const isEmpty = !loading && bestSeller.length === 0;

  return (
    <section className="my-10">
      <div className="px-6 sm:px-10 md:px-16 lg:px-20">
        {/* Header */}
        <div className="text-center text-3xl py-8">
          <Title text1="BEST" text2="SELLERS" />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Our most loved and frequently purchased products — trusted by
            retailers, event planners, and bulk buyers.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <BestSellerSkeleton count={5} />
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No best sellers yet
            </h3>
            <p className="text-gray-500 max-w-md">
              Best-selling products will appear here once they are marked by the
              admin.
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default BestSeller;
