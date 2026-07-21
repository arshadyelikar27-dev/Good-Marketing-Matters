"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, X, Sparkles, Brain, Trophy, Zap, Play, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const MINI_GAMES = [
  {
    id: "memory",
    title: "Logo Memory Match",
    description: "Match agency tech & brand logos to test your focus!",
    icon: Brain,
    badge: "Puzzle",
    color: "from-blue-500 to-cyan-500",
    bgAccent: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "tictactoe",
    title: "Tic-Tac-Toe AI",
    description: "Beat our smart AI bot in a strategic grid battle!",
    icon: Trophy,
    badge: "Strategy",
    color: "from-amber-500 to-yellow-400",
    bgAccent: "bg-amber-500/10 text-amber-500",
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    description: "Battle our smart AI in a classic showdown with win streaks!",
    icon: Gamepad2,
    badge: "Battle",
    color: "from-emerald-500 to-teal-400",
    bgAccent: "bg-emerald-500/10 text-emerald-500",
  },
  {
    id: "reflex",
    title: "Reflex Speed Test",
    description: "How fast are your reactions? Test speed in milliseconds!",
    icon: Zap,
    badge: "Action",
    color: "from-purple-500 to-pink-500",
    bgAccent: "bg-purple-500/10 text-purple-500",
  },
];

export function GamesToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const router = useRouter();

  const handleLaunchGame = (gameId: string) => {
    setSelectedGame(gameId);
    setTimeout(() => {
      setIsOpen(false);
      setSelectedGame(null);
      router.push(`/games?game=${gameId}`);
    }, 400);
  };

  return (
    <>
      {/* FLOATING TOGGLE BUTTON - Bottom Right */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative group flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-black text-white font-heading font-bold shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-primary/40 hover:border-primary transition-all duration-300 overflow-hidden"
        >
          {/* Animated Glowing Ring */}
          <span className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:animate-shine pointer-events-none" />

          {/* Pulse Dot */}
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-primary"></span>
          </span>

          <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
          
          <span className="text-xs sm:text-sm tracking-wide hidden sm:inline-block">
            {isOpen ? "Close Arena" : "Mini Games"}
          </span>

          {/* Sparkles Icon */}
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary opacity-80" />
        </motion.button>
      </div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-xl"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl border border-black/10 overflow-y-auto max-h-[85vh] z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-black shadow-md">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-black text-black">
                      GMM Arcade <span className="text-primary-dark">Zone</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-black/60 font-medium">
                      Select a mini-game to play and challenge your skills!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 4 Games Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MINI_GAMES.map((game, idx) => {
                  const Icon = game.icon;
                  const isLaunching = selectedGame === game.id;

                  return (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLaunchGame(game.id)}
                      className={`relative group p-5 rounded-2xl border border-black/10 bg-white hover:border-black/30 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl overflow-hidden ${
                        isLaunching ? "ring-2 ring-primary scale-[0.98]" : ""
                      }`}
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${game.bgAccent}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/5 text-black/70">
                          {game.badge}
                        </span>
                      </div>

                      {/* Info */}
                      <h4 className="font-heading font-bold text-lg text-black mb-1 group-hover:text-primary transition-colors flex items-center gap-1.5">
                        {game.title}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h4>
                      <p className="text-xs text-black/60 leading-relaxed mb-4">
                        {game.description}
                      </p>

                      {/* Launch Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-black/5 text-xs font-bold text-black group-hover:text-black">
                        <span className="flex items-center gap-1">
                          <Play className="w-3.5 h-3.5 fill-black text-black" />
                          Play Now
                        </span>
                        <span className="text-[11px] text-black/40 font-normal">
                          Instant Load
                        </span>
                      </div>

                      {/* Selection Wave Effect */}
                      {isLaunching && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center font-heading font-bold text-black"
                        >
                          Launching Game...
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Footer Note */}
              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-black/50">
                <span>🎮 4 Free Arcade Mini-Games</span>
                <span className="font-medium text-black/70">Great Marketing Matters</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
