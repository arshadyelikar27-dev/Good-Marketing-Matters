"use client";

interface MarqueeTextProps {
  text: string;
  repeat?: number;
}

export function MarqueeText({ text, repeat = 6 }: MarqueeTextProps) {
  const items = Array(repeat).fill(text);

  return (
    <div className="overflow-hidden py-5 border-y border-black/5 bg-black/[0.015]">
      <div className="marquee-track flex gap-0 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 font-bold tracking-tighter text-black/8 uppercase shrink-0 px-10"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {item}
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
