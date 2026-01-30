import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      }

      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="px-6 sm:px-10 md:px-16 lg:px-20 border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* EMPTY CART */}
      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          {/* Icon */}
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 mb-6">
            <img
              src={assets.cart_icon}
              alt="Empty cart"
              className="w-12 opacity-70"
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>

          {/* Subtext */}
          <p className="text-gray-500 max-w-sm mb-8">
            Looks like you haven’t added anything to your cart yet. Start
            exploring and find something you love.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-8 py-3 text-sm rounded-full hover:opacity-90 transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          {/* CART ITEMS */}
          <div>
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id,
              );

              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      className="w-16 sm:w-20"
                      src={productData.image[0]}
                      alt={productData.name}
                    />

                    <div>
                      <p className="text-sm sm:text-lg font-medium">
                        {productData.name}
                      </p>

                      <p className="mt-2">
                        {currency}
                        {productData.price}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, Number(e.target.value))
                    }
                    className="border max-w-16 px-2 py-1"
                  />

                  {/* REMOVE */}
                  <img
                    onClick={() => updateQuantity(item._id, 0)}
                    className="w-4 sm:w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt="Remove"
                  />
                </div>
              );
            })}
          </div>

          {/* CART TOTAL */}
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />

              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black text-white text-sm my-8 px-8 py-3"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
