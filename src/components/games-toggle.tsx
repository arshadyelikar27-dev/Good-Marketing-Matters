"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, X, Brain, Trophy, Zap, Play, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const MINI_GAMES = [
  {
    id: "memory",
    title: "Logo Memory Match",
    description: "Match agency tech & brand logos to test your focus!",
    icon: Brain,
    badge: "Puzzle",
    color: "from-[#9333EA] to-[#7E22CE]",
    bgAccent: "bg-[#9333EA]/10 text-[#9333EA]",
  },
  {
    id: "tictactoe",
    title: "Tic-Tac-Toe AI",
    description: "Beat our smart AI bot in a strategic grid battle!",
    icon: Trophy,
    badge: "Strategy",
    color: "from-[#9333EA] to-[#7E22CE]",
    bgAccent: "bg-[#7E22CE]/10 text-[#9333EA]",
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    description: "Battle our smart AI in a classic showdown with win streaks!",
    icon: Gamepad2,
    badge: "Battle",
    color: "from-[#9333EA] to-[#7E22CE]",
    bgAccent: "bg-[#9333EA]/15 text-[#9333EA]",
  },
  {
    id: "reflex",
    title: "Reflex Speed Test",
    description: "How fast are your reactions? Test speed in milliseconds!",
    icon: Zap,
    badge: "Action",
    color: "from-[#9333EA] to-[#7E22CE]",
    bgAccent: "bg-[#7E22CE]/15 text-[#9333EA]",
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
      {/* FLOATING TOGGLE — Right Edge, Vertically Centered, Connected to Edge */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 pointer-events-auto">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 280, damping: 26 }}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open Mini Games"
          className="relative flex flex-col items-center justify-center gap-3 px-3 py-6 bg-background border border-primary/40 border-r-0 rounded-l-2xl text-white shadow-[-6px_0px_30px_rgba(147, 51, 234,0.18)] hover:shadow-[-10px_0px_40px_rgba(147, 51, 234,0.35)] hover:border-primary/80 hover:bg-background transition-all duration-300 group"
        >
          {/* Top & bottom accent lines */}
          <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
          <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

          {/* Pulsing live dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>

          {/* Icon: Gamepad or X */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-accent" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Gamepad2 className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
            )}
          </AnimatePresence>


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
              className="relative w-full max-w-2xl bg-[#050505] rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl border border-white/10 overflow-y-auto max-h-[85vh] z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-md">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-black text-white">
                      GMM Arcade <span className="text-accent">Zone</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#BDBDBD] font-medium">
                      Select a mini-game to play and challenge your skills!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-[#111111] hover:bg-[#111111]/80 flex items-center justify-center text-white transition-colors"
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
                      className={`relative group p-5 rounded-2xl border border-white/10 bg-background hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl overflow-hidden ${
                        isLaunching ? "ring-2 ring-primary scale-[0.98]" : ""
                      }`}
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${game.bgAccent}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#111111] text-[#BDBDBD]">
                          {game.badge}
                        </span>
                      </div>

                      {/* Info */}
                      <h4 className="font-heading font-bold text-lg text-white mb-1 group-hover:text-accent transition-colors flex items-center gap-1.5">
                        {game.title}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h4>
                      <p className="text-xs text-[#BDBDBD] leading-relaxed mb-4">
                        {game.description}
                      </p>

                      {/* Launch Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-bold text-[#BDBDBD] group-hover:text-white">
                        <span className="flex items-center gap-1">
                          <Play className="w-3.5 h-3.5 fill-[#BDBDBD] text-[#BDBDBD] group-hover:fill-white group-hover:text-white" />
                          Play Now
                        </span>
                        <span className="text-[11px] text-[#BDBDBD]/60 font-normal">
                          Instant Load
                        </span>
                      </div>

                      {/* Selection Wave Effect */}
                      {isLaunching && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center font-heading font-bold text-white"
                        >
                          Launching Game...
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Footer Note */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#BDBDBD]">
                <span>🎮 4 Free Arcade Mini-Games</span>
                <span className="font-medium text-white">Good Marketing Matters</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
