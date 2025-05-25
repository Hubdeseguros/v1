import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Solutions from '@/components/Solutions';
import Modules from '@/components/Modules';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="pt-20"> {/* Espacio para el navbar fijo */}
        <Hero />
        <Features />
        <Solutions />
        <Modules />
        <Footer />
      </div>
    </main>
  );
}
