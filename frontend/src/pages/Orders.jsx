import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const loadOrderData = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders.length === 0 && (
        <p className="text-gray-500 text-center py-20">
          You have not placed any orders yet.
        </p>
      )}

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border rounded-md p-5 flex flex-col gap-4"
          >
            {/* Order Items */}
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-5 border-b pb-4 last:border-none"
              >
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-lg">{item.name}</p>

                  <div className="flex gap-4 text-sm text-gray-600 mt-1">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Qty: {item.quantity}</p>
                  </div>

                  <p className="text-sm text-gray-400 mt-1">
                    Ordered on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-sm text-right">
                  <p className="font-medium">{order.status}</p>
                  <p className="text-gray-400">{order.paymentMethod}</p>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="flex justify-between items-center text-sm pt-2">
              <p>
                Total:{" "}
                <span className="font-medium">
                  {currency}
                  {order.amount}
                </span>
              </p>

              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm hover:bg-black hover:text-white transition"
              >
                Refresh Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
