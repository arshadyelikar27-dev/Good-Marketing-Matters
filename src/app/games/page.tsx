"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, Brain, Trophy, Zap, ArrowLeft, 
  Sparkles, RotateCcw 
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ============================================================================
// GAME 1: LOGO MEMORY MATCH
// ============================================================================
const MEMORY_ICONS = ["🚀", "⚡", "🎨", "🔥", "💡", "🎯", "💎", "🏆"];

function MemoryMatchGame() {
  const [cards, setCards] = useState<Array<{ id: number; icon: string; flipped: boolean; matched: boolean }>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initializeGame = () => {
    const deck = [...MEMORY_ICONS, ...MEMORY_ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, idx) => ({ id: idx, icon, flipped: false, matched: false }));
    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
    setMatchesCount(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === first || c.id === second ? { ...c, matched: true } : c))
          );
          setFlippedCards([]);
          setMatchesCount((m) => {
            const nextMatches = m + 1;
            if (nextMatches === MEMORY_ICONS.length) setIsWon(true);
            return nextMatches;
          });
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === first || c.id === second ? { ...c, flipped: false } : c))
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      {/* Top Score Bar */}
      <div className="flex items-center justify-between w-full mb-6 px-5 py-3.5 bg-black/90 backdrop-blur-xl rounded-2xl border border-black shadow-xl">
        <div className="text-sm font-bold text-white">
          Moves: <span className="text-accent font-black text-lg ml-1">{moves}</span>
        </div>
        <div className="text-sm font-bold text-white">
          Matched: <span className="text-accent font-black text-lg ml-1">{matchesCount} / {MEMORY_ICONS.length}</span>
        </div>
        <button
          onClick={initializeGame}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-black hover:bg-primary-hover transition-all duration-300 shadow-[0_0_15px_rgba(212, 224, 0,0.3)] cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3.5 w-full max-w-md">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-2xl flex items-center justify-center text-3xl font-bold cursor-pointer transition-all duration-300 border ${
              card.matched
                ? "bg-primary/20 text-accent border-primary shadow-[0_0_20px_rgba(212, 224, 0,0.4)]"
                : card.flipped
                ? "bg-black text-white border-2 border-primary shadow-2xl scale-105"
                : "bg-black/80 text-white border-black hover:border-primary/60 hover:shadow-lg"
            }`}
          >
            {card.flipped || card.matched ? card.icon : <span className="text-accent/40 text-2xl font-black">?</span>}
          </motion.div>
        ))}
      </div>

      {/* Victory Popup */}
      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-8 p-8 bg-black border-2 border-primary text-white rounded-3xl text-center shadow-[0_0_40px_rgba(212, 224, 0,0.3)] w-full max-w-md"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-accent animate-bounce" />
            <h3 className="font-heading font-black text-3xl mb-1 text-accent">Congratulations!</h3>
            <p className="text-sm font-medium mb-6 text-white/90">You matched all cards in {moves} moves!</p>
            <button
              onClick={initializeGame}
              className="px-8 py-3.5 rounded-full bg-primary text-white font-black text-sm hover:bg-primary-hover transition-all duration-300 shadow-lg cursor-pointer"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// GAME 2: TIC TAC TOE AI
// ============================================================================
function TicTacToeGame() {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every((s) => s !== null) ? "Draw" : null;
  };

  const winner = calculateWinner(board);

  // AI Turn
  useEffect(() => {
    if (!isXNext && !winner) {
      const emptyIndices = board
        .map((val, idx) => (val === null ? idx : null))
        .filter((val): val is number => val !== null);

      if (emptyIndices.length > 0) {
        const timer = setTimeout(() => {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = [...board];
          newBoard[randomIndex] = "O";
          setBoard(newBoard);
          setIsXNext(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isXNext, winner, board]);

  useEffect(() => {
    if (winner === "X") setScores((s) => ({ ...s, player: s.player + 1 }));
    else if (winner === "O") setScores((s) => ({ ...s, ai: s.ai + 1 }));
    else if (winner === "Draw") setScores((s) => ({ ...s, draws: s.draws + 1 }));
  }, [winner]);

  const handleClick = (idx: number) => {
    if (board[idx] || winner || !isXNext) return;
    const newBoard = [...board];
    newBoard[idx] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Scoreboard */}
      <div className="grid grid-cols-3 gap-4 w-full mb-6 text-center">
        <div className="p-3.5 bg-black/90 backdrop-blur-xl rounded-2xl border border-black shadow-xl">
          <div className="text-xs font-bold text-white">YOU (X)</div>
          <div className="text-2xl font-black text-accent">{scores.player}</div>
        </div>
        <div className="p-3.5 bg-black/90 backdrop-blur-xl rounded-2xl border border-black shadow-xl">
          <div className="text-xs font-bold text-white">DRAWS</div>
          <div className="text-2xl font-black text-white">{scores.draws}</div>
        </div>
        <div className="p-3.5 bg-black/90 backdrop-blur-xl rounded-2xl border border-black shadow-xl">
          <div className="text-xs font-bold text-white">AI BOT (O)</div>
          <div className="text-2xl font-black text-white">{scores.ai}</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3.5 w-full aspect-square bg-black/90 p-4 rounded-3xl border border-black backdrop-blur-xl shadow-2xl">
        {board.map((cell, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleClick(idx)}
            className={`rounded-2xl text-4xl sm:text-5xl font-black flex items-center justify-center transition-all duration-300 border cursor-pointer ${
              cell === "X"
                ? "bg-black text-accent border-2 border-primary shadow-[0_0_15px_rgba(212, 224, 0,0.4)]"
                : cell === "O"
                ? "bg-white text-white border-2 border-white shadow-xl"
                : "bg-black/80 border-black hover:border-primary/60"
            }`}
          >
            {cell}
          </motion.button>
        ))}
      </div>

      {/* Status Bar */}
      <div className="mt-6 flex items-center justify-between w-full px-2">
        <span className="text-sm font-bold text-white font-heading">
          {winner
            ? winner === "Draw"
              ? "🤝 Match Tied!"
              : `🏆 ${winner === "X" ? "You Won!" : "AI Bot Won!"}`
            : isXNext
            ? "Your turn (X)"
            : "AI Bot is thinking..."}
        </span>
        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-black hover:bg-primary-hover transition-all duration-300 shadow-[0_0_15px_rgba(212, 224, 0,0.3)] cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Next Round
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// GAME 3: ROCK PAPER SCISSORS AI
// ============================================================================
const RPS_CHOICES = [
  { id: "rock", name: "Rock", emoji: "✊" },
  { id: "paper", name: "Paper", emoji: "✋" },
  { id: "scissors", name: "Scissors", emoji: "✌️" },
];

function RockPaperScissorsGame() {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [aiChoice, setAiChoice] = useState<string | null>(null);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState({ player: 0, ai: 0 });

  const handlePlay = (choiceId: string) => {
    setPlayerChoice(choiceId);
    setAiChoice(null);
    setResult(null);

    setTimeout(() => {
      const randomAi = RPS_CHOICES[Math.floor(Math.random() * RPS_CHOICES.length)].id;
      setAiChoice(randomAi);

      if (choiceId === randomAi) {
        setResult("draw");
      } else if (
        (choiceId === "rock" && randomAi === "scissors") ||
        (choiceId === "paper" && randomAi === "rock") ||
        (choiceId === "scissors" && randomAi === "paper")
      ) {
        setResult("win");
        setStreak((s) => s + 1);
        setScore((sc) => ({ ...sc, player: sc.player + 1 }));
      } else {
        setResult("lose");
        setStreak(0);
        setScore((sc) => ({ ...sc, ai: sc.ai + 1 }));
      }
    }, 600);
  };

  const getEmoji = (id: string | null) => {
    return RPS_CHOICES.find((c) => c.id === id)?.emoji || "❓";
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Scoreboard */}
      <div className="grid grid-cols-3 gap-4 w-full mb-6 text-center">
        <div className="p-3.5 bg-black/90 backdrop-blur-xl rounded-2xl border border-black shadow-xl">
          <div className="text-xs font-bold text-white">YOU</div>
          <div className="text-2xl font-black text-accent">{score.player}</div>
        </div>
        <div className="p-3.5 bg-black/90 backdrop-blur-xl rounded-2xl border border-black shadow-xl">
          <div className="text-xs font-bold text-white">STREAK</div>
          <div className="text-2xl font-black text-accent">🔥 {streak}</div>
        </div>
        <div className="p-3.5 bg-black/90 backdrop-blur-xl rounded-2xl border border-black shadow-xl">
          <div className="text-xs font-bold text-white">AI BOT</div>
          <div className="text-2xl font-black text-white">{score.ai}</div>
        </div>
      </div>

      {/* Showdown Arena */}
      <div className="w-full bg-black/90 backdrop-blur-xl p-6 rounded-3xl border border-black mb-6 flex flex-col items-center justify-center min-h-[230px] shadow-2xl">
        <div className="flex items-center justify-around w-full">
          {/* Player Choice */}
          <div className="text-center">
            <div className="text-xs font-bold text-white mb-2">YOUR PICK</div>
            <motion.div
              key={playerChoice || "none"}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 rounded-2xl bg-black border-2 border-primary text-white flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(212, 224, 0,0.3)]"
            >
              {getEmoji(playerChoice)}
            </motion.div>
          </div>

          <div className="font-heading font-black text-xl text-white/40">VS</div>

          {/* AI Choice */}
          <div className="text-center">
            <div className="text-xs font-bold text-white mb-2">AI PICK</div>
            <motion.div
              key={aiChoice || "waiting"}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 rounded-2xl bg-black border border-black text-white flex items-center justify-center text-5xl shadow-xl"
            >
              {aiChoice ? getEmoji(aiChoice) : "❓"}
            </motion.div>
          </div>
        </div>

        {/* Result Message */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 text-lg font-black font-heading px-6 py-2 rounded-full border shadow-lg ${
              result === "win"
                ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(212, 224, 0,0.4)]"
                : result === "lose"
                ? "bg-black text-white border-black"
                : "bg-black text-white border-black"
            }`}
          >
            {result === "win" && "🎉 Victory!"}
            {result === "lose" && "🤖 AI Wins!"}
            {result === "draw" && "🤝 It's a Tie!"}
          </motion.div>
        )}
      </div>

      {/* Options Selector */}
      <div className="grid grid-cols-3 gap-3.5 w-full">
        {RPS_CHOICES.map((choice) => (
          <motion.button
            key={choice.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePlay(choice.id)}
            className="p-4 rounded-2xl bg-black border border-black hover:border-primary flex flex-col items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
          >
            <span className="text-4xl mb-1">{choice.emoji}</span>
            <span className="text-xs font-bold text-white font-heading">{choice.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// GAME 4: REFLEX SPEED TEST
// ============================================================================
function ReflexTestGame() {
  const [state, setState] = useState<"idle" | "waiting" | "ready" | "result">("idle");
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setState("waiting");
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 3000) + 2000;
    timerRef.current = setTimeout(() => {
      setState("ready");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (state === "waiting") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setState("idle");
      alert("Too early! Wait for yellow color!");
    } else if (state === "ready") {
      const time = Date.now() - startTime;
      setReactionTime(time);
      if (!bestTime || time < bestTime) setBestTime(time);
      setState("result");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Top Info */}
      <div className="flex items-center justify-between w-full mb-6 px-5 py-3.5 bg-black/90 backdrop-blur-xl rounded-2xl border border-black shadow-xl">
        <div className="text-sm font-bold text-white">
          Last: <span className="text-accent font-black text-lg ml-1">{reactionTime ? `${reactionTime} ms` : "--"}</span>
        </div>
        <div className="text-sm font-bold text-white">
          Best Record: <span className="text-accent font-black text-lg ml-1">{bestTime ? `${bestTime} ms` : "--"}</span>
        </div>
      </div>

      {/* Main Interactive Box */}
      <div
        onClick={state === "idle" ? startTest : handleClick}
        className={`w-full aspect-square rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 border shadow-2xl ${
          state === "idle"
            ? "bg-black border-black hover:border-primary"
            : state === "waiting"
            ? "bg-red-500/90 text-white border-2 border-red-500 animate-pulse"
            : state === "ready"
            ? "bg-primary text-white border-2 border-primary scale-[1.03] shadow-[0_0_50px_rgba(212, 224, 0,0.8)]"
            : "bg-primary/20 text-accent border-2 border-primary"
        }`}
      >
        {state === "idle" && (
          <>
            <Zap className="w-14 h-14 text-accent mb-4 animate-bounce" />
            <h3 className="font-heading font-black text-2xl text-white mb-1">Reflex Speed Test</h3>
            <p className="text-xs text-white max-w-xs leading-relaxed">
              Click anywhere inside this box to start. When screen turns YELLOW, click as fast as you can!
            </p>
          </>
        )}

        {state === "waiting" && (
          <>
            <h3 className="font-heading font-black text-3xl mb-1 text-white">Wait for Yellow...</h3>
            <p className="text-xs text-white/80">Don't click yet!</p>
          </>
        )}

        {state === "ready" && (
          <>
            <h3 className="font-heading font-black text-4xl mb-1 uppercase tracking-wider text-white">TAP NOW!</h3>
          </>
        )}

        {state === "result" && (
          <>
            <Sparkles className="w-12 h-12 mb-2 text-accent animate-pulse" />
            <div className="text-5xl font-black font-heading mb-1 text-accent">{reactionTime} ms</div>
            <p className="text-sm font-bold text-white mb-6">
              {reactionTime! < 200
                ? "⚡ Lightning Speed! Incredible!"
                : reactionTime! < 300
                ? "🔥 Great Marketing Reflexes!"
                : "🐢 Pretty good! Try again to go faster!"}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="px-8 py-3 rounded-full bg-primary text-white font-black text-xs hover:bg-primary-hover transition-all duration-300 shadow-lg"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
function GamesPageContent() {
  const searchParams = useSearchParams();
  const initialGame = searchParams.get("game") || "memory";
  const [activeTab, setActiveTab] = useState(initialGame);

  return (
    <main className="min-h-screen w-full bg-black text-white relative flex flex-col pb-32 sm:pb-48 select-none">
      {/* Background Dotted Pattern Effect */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(#D4E000 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} 
      />

      {/* Blurred Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-24 relative z-10 max-w-5xl flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black border border-black text-white font-bold text-xs sm:text-sm hover:border-primary hover:text-accent transition-all duration-300 shadow-lg group"
          >
            <ArrowLeft className="w-4 h-4 text-accent group-hover:-translate-x-1 transition-transform" /> Back to Website
          </Link>

          <div className="flex items-center gap-2 font-heading font-black text-lg sm:text-xl text-white">
            <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-accent animate-pulse" /> GMM Arcade
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white mb-3 tracking-tight">
            Mini Games <span className="text-accent underline decoration-primary/40">Arena</span>
          </h1>
          <p className="text-white text-sm sm:text-base max-w-xl mx-auto font-medium px-2 leading-relaxed">
            Take a quick mental break! Play any of our 4 interactive mini-games directly in your browser.
          </p>
        </div>

        {/* 4 Tabs Selector */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 mb-10 sm:mb-12 overflow-x-auto pb-2 px-1 no-scrollbar">
          {[
            { id: "memory", label: "Memory Match", icon: Brain },
            { id: "tictactoe", label: "Tic-Tac-Toe", icon: Trophy },
            { id: "rps", label: "Rock Paper Scissors", icon: Gamepad2 },
            { id: "reflex", label: "Reflex Test", icon: Zap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full font-black text-xs sm:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-primary text-white border border-primary shadow-[0_0_20px_rgba(212, 224, 0,0.4)] scale-105"
                    : "bg-black text-white border border-black hover:border-primary/50 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Game View */}
        <div className="w-full flex justify-center pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {activeTab === "memory" && <MemoryMatchGame />}
              {activeTab === "tictactoe" && <TicTacToeGame />}
              {activeTab === "rps" && <RockPaperScissorsGame />}
              {activeTab === "reflex" && <ReflexTestGame />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

export default function GamesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-accent font-black">Loading Arena...</div>}>
      <GamesPageContent />
    </Suspense>
  );
}
