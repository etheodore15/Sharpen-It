import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import HowItWorks from '../components/HowItWorks';
import KnifeEstimator from '../components/KnifeEstimator';
import Pricing from '../components/Pricing';
import WhatWeSharpen from '../components/WhatWeSharpen';
import AddOns from '../components/AddOns';
import OrderForm from '../components/OrderForm';
import FrequencyCalculator from '../components/FrequencyCalculator';
import StatsBar from '../components/StatsBar';
import B2BSection from '../components/B2BSection';
import GiftCards from '../components/GiftCards';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import MobileCTA from '../components/MobileCTA';

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <KnifeEstimator />
        <Pricing />
        <WhatWeSharpen />
        <AddOns />
        <OrderForm />
        <FrequencyCalculator />
        <StatsBar />
        <B2BSection />
        <GiftCards />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
