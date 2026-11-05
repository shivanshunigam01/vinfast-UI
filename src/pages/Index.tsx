import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickActionBar from "@/components/QuickActionBar";
import ModelDiscovery from "@/components/ModelDiscovery";
import WhyVinFast from "@/components/WhyVinFast";
import VirtualShowroom from "@/components/VirtualShowroom";
import OwnershipSection from "@/components/OwnershipSection";
import OffersSection from "@/components/OffersSection";
import LeadCaptureStrip from "@/components/LeadCaptureStrip";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { usePageSeo } from "@/hooks/usePageSeo";
import { HOME_ANSWER_BLOCK, HOME_PAGE_H1, HOME_PAGE_SEO } from "@/lib/seoBlueprint";

const Index = () => {
  usePageSeo(HOME_PAGE_SEO);

  return (
    <div className="public-page-shell">
      <Navbar />
      <HeroSection />
      <section className="border-b border-border/40 bg-muted/30 px-4 py-6 lg:py-8" aria-labelledby="home-seo-intro">
        <div className="container mx-auto max-w-3xl text-center">
          <h1
            id="home-seo-intro"
            className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-3 tracking-tight"
          >
            {HOME_PAGE_H1}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{HOME_ANSWER_BLOCK}</p>
        </div>
      </section>
      <QuickActionBar />
      <ModelDiscovery />
      <WhyVinFast />
      <VirtualShowroom />
      <OwnershipSection />
      <OffersSection />
      <LeadCaptureStrip />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
