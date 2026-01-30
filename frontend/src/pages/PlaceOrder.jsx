import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  /* ---------------- RAZORPAY ---------------- */
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
            setCartItems({});
            setLoading(false); // ✅ stop loader
            setShowSuccessModal(true); // ✅ show modal
          }
        } catch (error) {
          setLoading(false);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  /* ---------------- SUBMIT ---------------- */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const orderItems = [];

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

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      /* COD */
      if (method === "cod") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          { headers: { token } },
        );

        if (response.data.success) {
          setCartItems({});
          setLoading(false); // ✅ stop loader
          setShowSuccessModal(true); // ✅ show modal
          return;
        } else {
          setLoading(false);
          toast.error(response.data.message);
        }
      }

      /* Razorpay */
      if (method === "razorpay") {
        const response = await axios.post(
          backendUrl + "/api/order/razorpay",
          orderData,
          { headers: { token } },
        );

        if (response.data.success) {
          initPay(response.data.order);
          return;
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
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
        {/* LEFT */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          <div className="flex gap-3">
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              className="border rounded py-2 px-3 w-full"
              placeholder="First name"
            />
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              className="border rounded py-2 px-3 w-full"
              placeholder="Last name"
            />
          </div>

          <input
            required
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            className="border rounded py-2 px-3 w-full"
            placeholder="Email address"
          />
          <input
            required
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            className="border rounded py-2 px-3 w-full"
            placeholder="Street"
          />

          <div className="flex gap-3">
            <input
              required
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              className="border rounded py-2 px-3 w-full"
              placeholder="City"
            />
            <input
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              className="border rounded py-2 px-3 w-full"
              placeholder="State"
            />
          </div>

          <div className="flex gap-3">
            <input
              required
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              className="border rounded py-2 px-3 w-full"
              placeholder="Zipcode"
            />
            <input
              required
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              className="border rounded py-2 px-3 w-full"
              placeholder="Country"
            />
          </div>

          <input
            required
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            className="border rounded py-2 px-3 w-full"
            placeholder="Phone"
          />
        </div>

        {/* RIGHT */}
        <div className="mt-8">
          <CartTotal />

          <div className="mt-12">
            <Title text1="PAYMENT" text2="METHOD" />

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-3 cursor-pointer mt-4"
            >
              <span
                className={`w-4 h-4 rounded-full border ${method === "cod" ? "bg-green-500" : ""}`}
              />
              <p className="text-sm font-medium text-gray-600">
                CASH ON DELIVERY
              </p>
            </div>

            <div className="w-full text-end mt-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-16 py-3 text-sm rounded-full flex items-center justify-center gap-2 disabled:opacity-70"
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

      {/* SUCCESS MODAL (AFTER LOADING) */}
      {!loading && showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-[90%] max-w-md p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              Order Placed Successfully!
            </h2>

            <p className="text-gray-500 mb-6">
              Thank you for your order. We will contact you very soon for final
              confirmation.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/orders")}
                className="bg-black text-white py-3 rounded-full text-sm"
              >
                View My Orders
              </button>

              <button
                onClick={() => navigate("/")}
                className="text-sm text-gray-500 hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
