import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Arsenal from "@/components/Arsenal";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Manifesto />
      <Work />
      <Arsenal />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
