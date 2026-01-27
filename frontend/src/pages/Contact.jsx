import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      {/* Page Title */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Contact Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="Wholesale Cane Baskets Store"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-700">
            Our Wholesale Store
          </p>

          <p className="text-gray-600 leading-relaxed">
            13-128, Mamulpet Rd, Ragipet, Kumbarpet, Mamulpet, Chickpet,
            Bengaluru, Karnataka – 560053, India
          </p>

          <p className="text-gray-600">
            📞 Phone: <span className="font-medium">95352 24571</span> <br />
            ✉️ Email:{" "}
            <span className="font-medium">
              contact@wholesalecanebaskets.com
            </span>
          </p>

          <p className="text-gray-600">
            📸 Instagram:{" "}
            <a
              href="https://www.instagram.com/baskets_wholesale/"
              target="_blank"
              rel="noreferrer"
              className="text-black font-medium hover:underline"
            >
              @baskets_wholesale
            </a>
          </p>

          <p className="font-semibold text-xl text-gray-700">
            Bulk Orders & Business Enquiries
          </p>

          <p className="text-gray-600">
            We specialize in wholesale and bulk supply of handmade cane baskets,
            gift hampers, and eco-friendly packaging materials. Contact us for
            pricing, customization, and large orders.
          </p>

          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Contact for Wholesale
          </button>
        </div>
      </div>

      {/* Newsletter */}
      {/* <NewsletterBox /> */}
    </div>
  );
};

export default Contact;
