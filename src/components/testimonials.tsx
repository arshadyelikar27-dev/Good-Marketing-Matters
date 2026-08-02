import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonials';

const testimonials = [
  {
    name: 'Rahul Sharma',
    username: '@rahul_s',
    body: 'GMM ne hamari online sales ko doguna kar diya! Unka marketing strategy bahut effective hai.',
    img: 'https://randomuser.me/api/portraits/men/44.jpg',
    country: '🇮🇳 India',
  },
  {
    name: 'Priya Desai',
    username: '@priya_designs',
    body: 'Website design itna premium hai ki har client impress ho jata hai. Highly recommended!',
    img: 'https://randomuser.me/api/portraits/women/12.jpg',
    country: '🇮🇳 India',
  },
  {
    name: 'Vikram Singh',
    username: '@vikram_tech',
    body: 'Inki SEO optimization ne hamari website ko Google ke pehle page par laa diya hai.',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
    country: '🇮🇳 India',
  },
  {
    name: 'Sneha Reddy',
    username: '@sneha_r',
    body: 'Brand strategy aur content writing ekdum top-notch hai. Humara ROI kaafi badh gaya.',
    img: 'https://randomuser.me/api/portraits/women/33.jpg',
    country: '🇮🇳 India',
  },
  {
    name: 'Amit Patel',
    username: '@amit_patel',
    body: 'GMM ki team bahut professional aur fast hai. App development project time par deliver hua.',
    img: 'https://randomuser.me/api/portraits/men/67.jpg',
    country: '🇮🇳 India',
  },
  {
    name: 'Ananya Iyer',
    username: '@ananya_i',
    body: 'Inke Meta Ads campaigns ne hamare business ko ek nayi reach di hai. Superb work!',
    img: 'https://randomuser.me/api/portraits/women/45.jpg',
    country: '🇮🇳 India',
  },
  {
    name: 'Rohan Kapoor',
    username: '@rohan_k',
    body: 'Agar digital growth chahiye toh GMM se behtar koi agency nahi hai.',
    img: 'https://randomuser.me/api/portraits/men/82.jpg',
    country: '🇮🇳 India',
  },
  {
    name: 'Neha Gupta',
    username: '@neha_creates',
    body: 'Graphic design aur branding me inka kaam outstanding hai. I love their creativity.',
    img: 'https://randomuser.me/api/portraits/women/56.jpg',
    country: '🇮🇳 India',
  },
  {
    name: 'Kabir Das',
    username: '@kabir_business',
    body: 'Ekdum bharosemand team. Inhone hamare offline business ko online successful banaya.',
    img: 'https://randomuser.me/api/portraits/men/91.jpg',
    country: '🇮🇳 India',
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-64 bg-card/50 backdrop-blur-md border-border hover:border-primary transition-all duration-300 shadow-lg group hover:shadow-[0_0_20px_rgba(104, 17, 201,0.3)]">
      <CardContent className="p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="flex items-center gap-2.5 relative z-10">
          <Avatar className="size-9 border border-primary/30 group-hover:border-accent transition-colors">
            <AvatarImage src={img} alt={username} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-bold text-white flex items-center gap-1 group-hover:text-accent transition-colors">
              {name} <span className="text-xs font-normal text-white">{country}</span>
            </figcaption>
            <p className="text-xs font-medium text-accent">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-white leading-snug relative z-10">{body}</blockquote>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="relative w-full py-24 sm:py-32 bg-background overflow-hidden">
      {/* Background graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Header */}
      <div className="container relative z-10 mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-white drop-shadow-[0_0_20px_rgba(104, 17, 201,0.3)]">
          Client <span className="text-accent">Stories</span>
        </h2>
        <p className="text-lg text-white max-w-xl mx-auto">
          Hear from the visionaries and industry leaders who scaled their digital presence with GMM.
        </p>
      </div>

      <div className="w-full flex justify-center items-center py-10 relative z-10">
        <div className="border border-border/30 rounded-3xl relative flex h-[500px] w-full max-w-[1000px] flex-row items-center justify-center overflow-hidden gap-4 [perspective:400px] bg-surface/30 backdrop-blur-sm shadow-2xl">
          <div
            className="flex flex-row items-center gap-4 w-full justify-center"
            style={{
              transform:
                'translateX(0px) translateY(0px) translateZ(-50px) rotateX(15deg) rotateY(-10deg) rotateZ(10deg)',
            }}
          >
            {/* Vertical Marquee (downwards) */}
            <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
              {testimonials.map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (upwards) */}
            <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:45s]">
              {testimonials.slice().reverse().map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (downwards) */}
            <Marquee vertical pauseOnHover repeat={3} className="[--duration:35s] hidden md:flex">
              {testimonials.map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (upwards) */}
            <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s] hidden lg:flex">
              {testimonials.slice().reverse().map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>
          
          {/* Gradient overlays for vertical marquee fading effect */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
