import React, { useEffect, useState } from "react";
import { FiStar, FiUser, FiMessageSquare } from "react-icons/fi";

const testimonials = [
  {
    name: "Rohit Gupta",
    role: "Wedding Planner · Jaipur",
    review:
      "Wedding Gift House has been our most reliable partner for premium wedding gifting. Impeccable quality and flawless delivery.",
  },
  {
    name: "Neha Sharma",
    role: "Retail Buyer · Delhi",
    review:
      "The finishing and presentation feel truly luxury. Customers immediately notice the premium difference.",
  },
  {
    name: "Rahul Mehta",
    role: "Event Manager · Mumbai",
    review:
      "We source gifting items for high-end events. Their professionalism and consistency are unmatched.",
  },
  {
    name: "Pooja Agarwal",
    role: "Boutique Owner · Bengaluru",
    review:
      "Wedding Gift House helped elevate our boutique’s gifting range with consistent premium quality.",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-50 py-5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-gray-900">
            Trusted by Our Clients
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Premium gifting solutions trusted across India
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border shadow-sm p-8 hover:shadow-md transition"
            >
              {/* Quote + Stars */}
              {/* <div className="flex items-center justify-between mb-4">
                <FiMessageSquare className="text-gray-300 text-2xl" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
              </div> */}

              {/* Review */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                “{item.review}”
              </p>

              {/* User */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  <FiUser className="text-lg" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
