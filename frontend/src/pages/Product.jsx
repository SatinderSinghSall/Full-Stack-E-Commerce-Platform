import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import ProductSkeleton from "../components/ProductSkeleton";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return <ProductSkeleton />;
  }

  return productData ? (
    <>
      <Helmet>
        <title>{productData.name} | Wholesale Wedding Gift</title>
        <meta
          name="description"
          content={`Buy ${productData.name} in bulk for weddings, return gifts and festive ceremonies. Premium quality wholesale wedding gift available across India.`}
        />
        <link
          rel="canonical"
          href={`https://gifthouse.vercel.app/product/${productData._id}`}
        />
      </Helmet>

      <div className="px-6 sm:px-10 md:px-16 lg:px-20 border-t-2 pt-10 transition-opacity duration-500 opacity-100">
        {/* Product Data */}
        <div className="flex gap-12 flex-col sm:flex-row">
          {/* Images */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
              {productData.image.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setImage(item)}
                  src={item}
                  className="w-[24%] sm:w-full sm:mb-3 cursor-pointer"
                  alt="product"
                />
              ))}
            </div>

            <div className="w-full sm:w-[80%]">
              <img className="w-full h-auto" src={image} alt="product" />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} className="w-3" />
              <img src={assets.star_icon} className="w-3" />
              <img src={assets.star_icon} className="w-3" />
              <img src={assets.star_icon} className="w-3" />
              <img src={assets.star_dull_icon} className="w-3" />
              <p className="pl-2">(122)</p>
            </div>

            <p className="mt-5 text-3xl font-medium">
              {currency}
              {productData.price}
            </p>

            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>

            <button
              onClick={() => addToCart(productData._id)}
              className="bg-black text-white px-8 py-3 text-sm mt-8 active:bg-gray-700"
            >
              ADD TO CART
            </button>

            <hr className="mt-8 sm:w-4/5" />

            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available.</p>
              {/* <p>Easy return and exchange within 7 days.</p> */}
            </div>
          </div>
        </div>

        {/* Description */}
        {/* <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Premium handcrafted cane basket designed for durability,
            eco-friendliness, and everyday use. Ideal for gifting, storage, and
            wholesale requirements.
          </p>
        </div>
      </div> */}

        {/* Related Products */}
        <RelatedProducts category={productData.category} />
      </div>
    </>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
