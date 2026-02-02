import React from "react";
import { Helmet } from "react-helmet-async";

import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import Testimonials from "../components/Testimonials";
import InstagramFeed from "../components/InstagramFeed";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          Wholesale Wedding Gifts & Return Gifts in India | Wedding Gift House
        </title>
        <meta
          name="description"
          content="Buy wholesale wedding gifts, return gifts, trays, baskets and festive gift packaging from Wedding Gift House. Trusted bulk supplier across India."
        />
        <link rel="canonical" href="https://gifthouse.vercel.app/" />
      </Helmet>

      <div>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <InstagramFeed />
        <Testimonials />
        {/* <OurPolicy /> */}
        {/* <NewsletterBox /> */}
      </div>
    </>
  );
};

export default Home;
