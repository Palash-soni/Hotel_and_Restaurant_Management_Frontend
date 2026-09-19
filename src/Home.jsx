import React from 'react'
import Hero from "./components/Hero";
import ExploreSection from "./components/ExploreSection";
import Footer from "./components/Footer";
import HomeReviewSection from './components/HomeReviewSection';


console.log(localStorage.getItem("role"));

const Home = () => {
  return (
    <div>
      <Hero />
      <ExploreSection />
      <HomeReviewSection />
      <Footer />
    </div>
  )
}

export default Home
