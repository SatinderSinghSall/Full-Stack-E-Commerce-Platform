import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import OrdersSkeleton from "../components/OrdersSkeleton";
import toast from "react-hot-toast";

const ORDERS_PER_PAGE = 5;

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- LOAD ORDERS ---------------- */
  const loadOrderData = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  /* ---------------- STATUS STYLE ---------------- */
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* ---------------- SEARCH ---------------- */
  const filteredOrders = useMemo(() => {
    if (!search) return orders;

    return orders.filter(
      (order) =>
        order.items.some((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ) || order.status.toLowerCase().includes(search.toLowerCase()),
    );
  }, [orders, search]);

  /* Reset page on search */
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE,
  );

  /* Scroll to top on page change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  /* ---------------- INVOICE DOWNLOAD ---------------- */
  // const downloadInvoice = async (orderId) => {
  //   try {
  //     const response = await axios.get(
  //       `${backendUrl}/api/order/invoice/${orderId}`,
  //       {
  //         headers: { token },
  //         responseType: "blob",
  //       },
  //     );

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", `invoice-${orderId}.pdf`);
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (err) {
  //     console.error("Invoice download failed", err);
  //   }
  // };

  const downloadInvoice = () => {
    toast("Invoice download coming soon 🧾", {
      icon: "🚧",
      duration: 3000,
    });
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="border-t pt-16 px-6 sm:px-10 md:px-16 lg:px-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <Title text1="MY" text2="ORDERS" />

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-72 text-sm"
        />
      </div>

      {loading ? (
        <OrdersSkeleton />
      ) : paginatedOrders.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No orders found.</p>
      ) : (
        <>
          <div className="space-y-8">
            {paginatedOrders.map((order, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden bg-white"
              >
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-gray-50 px-5 py-4 border-b">
                  <div>
                    <p className="text-sm text-gray-500">
                      Ordered on {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Payment: {order.paymentMethod}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-sm rounded-full w-fit ${getStatusStyle(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="divide-y">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 px-5 py-4 items-start">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />

                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {currency}
                          {item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-5 py-4 border-t bg-gray-50">
                  <p className="text-sm">
                    Total:{" "}
                    <span className="font-semibold">
                      {currency}
                      {order.amount}
                    </span>
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => downloadInvoice(order._id)}
                      className="border px-4 py-2 text-sm rounded hover:bg-gray-200 transition"
                    >
                      Download Invoice
                    </button>

                    <button
                      onClick={loadOrderData}
                      className="border px-4 py-2 text-sm rounded hover:bg-black hover:text-white transition"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-black text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
