import React from "react";
import Title from "../components/Title";
import { assets, assets2 } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      {/* Page Title */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* About Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets2.about_img2}
          alt="Handmade Cane Baskets"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            WholeSale Cane Baskets was founded with a deep appreciation for
            traditional craftsmanship and a vision to bring beautifully
            handcrafted cane products to businesses and customers across the
            country. What started as a small initiative has grown into a trusted
            wholesale and supply store for handmade baskets and packaging
            solutions.
          </p>

          <p>
            We specialize in premium-quality cane baskets, gift hampers, and
            eco-friendly packaging materials that combine durability,
            functionality, and timeless design. Each product reflects the skill,
            care, and dedication of experienced artisans who have perfected
            their craft over generations.
          </p>

          <b className="text-gray-800">Our Mission</b>

          <p>
            Our mission is to support sustainable living while empowering
            retailers, businesses, and individuals with reliable handmade
            products. We aim to preserve traditional artistry, promote
            eco-conscious alternatives, and deliver consistent quality at
            competitive wholesale prices.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Authentic Handmade Quality</b>
          <p className="text-gray-600">
            Every basket and product is carefully handcrafted using natural cane
            materials, ensuring strength, longevity, and a unique finish in
            every piece.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Wholesale & Bulk Expertise</b>
          <p className="text-gray-600">
            We specialize in bulk orders for retailers, gifting businesses,
            events, and packaging needs, offering reliable supply and timely
            fulfillment.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Customer-Centric Service</b>
          <p className="text-gray-600">
            From product selection to after-sales support, we are committed to
            providing a smooth, transparent, and satisfying experience for every
            customer.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      {/* <NewsletterBox /> */}
    </div>
  );
};

export default About;
