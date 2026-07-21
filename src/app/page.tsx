import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { AboutAnimation } from "@/components/about";
import { Timeline } from "@/components/timeline";
import { Clients } from "@/components/clients";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero />
      <Services />
      <AboutAnimation />
      <Timeline />
      <Clients />
      <Testimonials />
      <Footer />
    </main>
  );
}
