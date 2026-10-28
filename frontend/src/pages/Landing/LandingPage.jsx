import React from 'react';
import Hero from '../../components/landing/Hero';
import FeaturedDoctor from '../../components/landing/FeaturedDoctor';
import Advisor from '../../components/landing/Advisor';
import BeforeAfterSlider from '../../components/landing/BeforeAfterSlider';
import SanctuarySection from '../../components/landing/SanctuarySection';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Hero />
      <FeaturedDoctor />
      <Advisor />
      <BeforeAfterSlider />
      <SanctuarySection />
    </div>
  );
};

export default LandingPage;
