"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  className?: string;
  avatar?: string;
  username?: string;
  handle?: string;
  content?: string;
  date?: string;
  verified?: boolean;
  likes?: number;
  retweets?: number;
  tweetUrl?: string;
  onHover?: () => void;
  onLeave?: () => void;
  isActive?: boolean;
  onTap?: () => void;
}



function TestimonialCard({
  className,
  avatar,
  username = "PEPE",
  handle = "@PEPE_bigbrother",
  content = "This is amazing! 🔥 Absolutely loving what the team is building here. Can't wait to see what comes next!",
  date = "Jan 5, 2026",
  verified = true,
  likes = 142,
  retweets = 23,
  tweetUrl,
  onHover,
  onLeave,
  isActive,
  onTap,
}: TestimonialCardProps) {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      // On mobile: first tap activates, second tap navigates
      if (!isActive) {
        e.preventDefault();
        onTap?.();
      }
    }
  };

  return (
    <a
      href={tweetUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "relative flex h-auto min-h-[140px] sm:min-h-[180px] w-[260px] sm:w-[380px] -skew-y-[8deg] select-none flex-col rounded-2xl border border-white/20 bg-transparent backdrop-blur-md px-4 py-4 transition-all duration-500 hover:border-accent/60 hover:bg-white/5 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] cursor-pointer text-left",
        isActive && "ring-2 ring-primary/50",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
        <div className="size-9 sm:size-11 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center overflow-hidden shrink-0">
          {avatar ? (
            <img src={avatar} alt={username} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm sm:text-base font-bold text-black uppercase">{username?.[0] || "A"}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-bold text-white truncate text-xs sm:text-base block">{username}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-white/90 text-xs sm:text-[15px] leading-relaxed line-clamp-3 sm:line-clamp-4">
        {content}
      </p>
    </a>
  );
}

interface TestimonialsProps {
  cards?: TestimonialCardProps[];
}

export function TestimonialsCards({ cards }: TestimonialsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getCardClassName = (index: number, baseClassName: string) => {
    // When hovering/active on back card (0), push middle (1) and front (2) down
    // When hovering/active on middle card (1), push front (2) down
    const focusedIndex = hoveredIndex ?? activeIndex;
    
    if (focusedIndex === 0 && index === 1) {
      return baseClassName + " !translate-y-20 sm:!translate-y-32 !translate-x-14 sm:!translate-x-24";
    }
    if (focusedIndex === 0 && index === 2) {
      return baseClassName + " !translate-y-28 sm:!translate-y-44 !translate-x-24 sm:!translate-x-40";
    }
    if (focusedIndex === 1 && index === 2) {
      return baseClassName + " !translate-y-24 sm:!translate-y-40 !translate-x-24 sm:!translate-x-40";
    }
    return baseClassName;
  };

  const handleTap = (index: number) => {
    if (activeIndex === index) {
      return;
    }
    setActiveIndex(index);
  };

  // We enforce taking exactly 3 cards for the stack to work optimally
  const displayCards = cards?.slice(0, 3) || [];

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 py-10 w-full">
      {displayCards.map((cardProps, index) => {
        // Add the required positional classes that the component uses internally if they aren't provided
        let positionalClass = "";
        if (index === 0) {
          positionalClass = "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:rounded-2xl before:h-[100%] before:content-[''] hover:before:opacity-0 before:transition-opacity before:duration-500 before:left-0 before:top-0";
        } else if (index === 1) {
          positionalClass = "[grid-area:stack] translate-x-8 sm:translate-x-16 translate-y-6 sm:translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:rounded-2xl before:h-[100%] before:content-[''] hover:before:opacity-0 before:transition-opacity before:duration-500 before:left-0 before:top-0 z-10";
        } else if (index === 2) {
          positionalClass = "[grid-area:stack] translate-x-16 sm:translate-x-32 translate-y-12 sm:translate-y-20 hover:translate-y-6 sm:hover:translate-y-10 z-20";
        }

        return (
          <TestimonialCard
            key={index}
            {...cardProps}
            className={getCardClassName(index, cn(positionalClass, cardProps.className))}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            isActive={activeIndex === index}
            onTap={() => handleTap(index)}
          />
        );
      })}
    </div>
  );
}
