import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { AboutAnimation } from "@/components/about";
import { Clients } from "@/components/clients";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero />
      <Services />
      <AboutAnimation />
      <Clients />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
