import { TestimonialsCards } from "@/components/ui/twitter-testimonial-cards";

const testimonials = [
  {
    name: 'Suryadakshinidli',
    username: '@suryadakshinidli',
    body: 'GMM doubled our online sales! Their data-driven marketing strategies are insanely effective.',
  },
  {
    name: 'Sindbaad Bhandi',
    username: '@sindbaad_bhandi',
    body: 'The website design is so sleek and premium that every visiting client is instantly impressed. Highly recommended!',
  },
  {
    name: 'Sunalk',
    username: '@sunalk',
    body: 'Their SEO optimization skyrocketed our web traffic right onto the first page of Google.',
  },
  {
    name: 'Mantri Construction',
    username: '@mantri_construction',
    body: 'Their brand strategy and copywriting are top-notch. Our ROI saw a massive jump within weeks.',
  },
  {
    name: 'Noman Shaikh',
    username: '@noman_shaikh',
    body: 'The GMM team is incredibly professional and fast. Delivered our custom web app right on schedule.',
  },
  {
    name: 'Arshad Khan',
    username: '@arshad_khan',
    body: 'Their targeted ad campaigns gave our brand a huge surge in reach and high-converting leads. Superb work!',
  }
];

export function Testimonials() {
  const mappedCards = testimonials.map((t, index) => ({
    username: t.name,
    handle: t.username,
    content: t.body,
    date: "Aug 5, 2026",
    verified: true,
    likes: 340 + index * 42,
    retweets: 45 + index * 7,
    avatar: undefined // Explicitly no profile pic
  }));

  return (
    <section id="reviews" className="relative w-full py-16 sm:py-24 md:py-32 bg-transparent overflow-hidden">
      {/* Header */}
      <div className="container relative z-10 mx-auto px-6 mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter mb-3 sm:mb-4 text-heading">
          Client <span className="text-accent">Stories</span>
        </h2>
        <p className="text-sm sm:text-lg text-body-text max-w-xl mx-auto">
          Hear from the visionaries and industry leaders who scaled their digital presence with GMM.
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-12 py-10 relative z-10 -ml-4 sm:-ml-8 lg:-ml-16">
        <TestimonialsCards cards={mappedCards.slice(0, 3)} />
        <TestimonialsCards cards={mappedCards.slice(3, 6)} />
      </div>
    </section>
  );
}
