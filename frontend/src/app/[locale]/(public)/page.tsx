import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import ExcursionsSection from '@/components/sections/ExcursionsSection';
import Partners from '@/components/sections/Partners';
import Testimonials from '@/components/sections/Testimonials';
import Gallery from '@/components/sections/Gallery';
import Faq from '@/components/sections/Faq';
import CTA from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ExcursionsSection />
      <Partners />
      <Testimonials />
      <Gallery />
      <Faq />
      <CTA />
    </>
  );
}