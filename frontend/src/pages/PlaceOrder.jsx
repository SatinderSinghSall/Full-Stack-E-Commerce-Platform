import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } },
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      let orderItems = [];

      for (const productId in cartItems) {
        const product = products.find((p) => p._id === productId);
        if (!product) continue;

        orderItems.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: cartItems[productId],
        });
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } },
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case "razorpay": {
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } },
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
            return;
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 sm:px-10 md:px-16 lg:px-20">
      {/* FULL SCREEN LOADER */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      >
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="flex gap-3">
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="First name"
            />
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="Last name"
            />
          </div>

          <input
            required
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Email address"
          />

          <input
            required
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Street"
          />

          <div className="flex gap-3">
            <input
              required
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="City"
            />
            <input
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="State"
            />
          </div>

          <div className="flex gap-3">
            <input
              required
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="Zipcode"
            />
            <input
              required
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="Country"
            />
          </div>

          <input
            required
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Phone"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="mt-8">
          <CartTotal />

          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              />
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>

            {/* ✅ BUTTON LOADER */}
            <div className="w-full text-end mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`bg-black text-white px-16 py-3 text-sm flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
