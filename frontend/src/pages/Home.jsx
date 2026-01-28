import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import Testimonials from "../components/Testimonials";
import InstagramFeed from "../components/InstagramFeed";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <InstagramFeed />
      <Testimonials />
      {/* <OurPolicy /> */}
      {/* <NewsletterBox /> */}
    </div>
  );
};

export default Home;
