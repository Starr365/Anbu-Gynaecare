import Hero from './Hero';
import WhyChooseAnbu from './WhyChooseAnbu';
import Tools from './Tools';
import Testimonials from './Testimonials';
import FinalCTA from './FinalCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhyChooseAnbu />
      <Tools />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}