"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, Brain, Trophy, Zap, ArrowLeft, RefreshCw, 
  Sparkles, CheckCircle2, RotateCcw, Play, Pause, PlaySquare 
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

  useEffect(() => {
    if (isWon) {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    }
  }, [isWon]);

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
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full mb-6 px-4 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-black/10">
        <div className="text-sm font-bold text-black">
          Moves: <span className="text-primary font-black text-lg">{moves}</span>
        </div>
        <div className="text-sm font-bold text-black">
          Matched: <span className="text-emerald-600 font-black text-lg">{matchesCount} / {MEMORY_ICONS.length}</span>
        </div>
        <button
          onClick={initializeGame}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-primary hover:text-black transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3 w-full max-w-md">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-2xl flex items-center justify-center text-3xl font-bold cursor-pointer transition-all duration-300 border ${
              card.matched
                ? "bg-emerald-500 text-white border-emerald-600 shadow-md"
                : card.flipped
                ? "bg-black text-white border-black shadow-2xl scale-105"
                : "bg-white text-black border-black/15 hover:border-black hover:shadow-lg"
            }`}
          >
            {card.flipped || card.matched ? card.icon : <span className="text-black/40 text-2xl font-black">?</span>}
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
            className="mt-8 p-6 bg-black text-white rounded-3xl text-center shadow-2xl w-full border border-black/10"
          >
            <Sparkles className="w-10 h-10 mx-auto mb-2 text-primary" />
            <h3 className="font-heading font-black text-2xl mb-1 text-primary">Congratulations!</h3>
            <p className="text-sm font-medium mb-4 text-white/80">You matched all cards in {moves} moves!</p>
            <button
              onClick={initializeGame}
              className="px-6 py-3 rounded-full bg-primary text-black font-bold text-sm hover:bg-white transition-colors"
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
        <div className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-black/10">
          <div className="text-xs font-bold text-black/60">PLAYER (X)</div>
          <div className="text-xl font-black text-black">{scores.player}</div>
        </div>
        <div className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-black/10">
          <div className="text-xs font-bold text-black/60">DRAWS</div>
          <div className="text-xl font-black text-black">{scores.draws}</div>
        </div>
        <div className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-black/10">
          <div className="text-xs font-bold text-black/60">AI BOT (O)</div>
          <div className="text-xl font-black text-black">{scores.ai}</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 w-full aspect-square bg-white/40 p-4 rounded-3xl border border-black/10 backdrop-blur-md">
        {board.map((cell, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(idx)}
            className={`rounded-2xl text-4xl sm:text-5xl font-black flex items-center justify-center transition-all border ${
              cell === "X"
                ? "bg-black text-primary border-black"
                : cell === "O"
                ? "bg-primary text-black border-primary"
                : "bg-white border-black/10 hover:border-black/30"
            }`}
          >
            {cell}
          </motion.button>
        ))}
      </div>

      {/* Status Bar */}
      <div className="mt-6 flex items-center justify-between w-full">
        <span className="text-sm font-bold text-black">
          {winner
            ? winner === "Draw"
              ? "🤝 Match Tied!"
              : `🏆 ${winner === "X" ? "You Won!" : "AI Won!"}`
            : isXNext
            ? "Your turn (X)"
            : "AI is thinking..."}
        </span>
        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-primary hover:text-black transition-colors"
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

    // AI Picks after a brief suspense delay
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
        <div className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-black/10">
          <div className="text-xs font-bold text-black/60">YOU</div>
          <div className="text-xl font-black text-black">{score.player}</div>
        </div>
        <div className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-black/10">
          <div className="text-xs font-bold text-black/60">STREAK</div>
          <div className="text-xl font-black text-emerald-600">🔥 {streak}</div>
        </div>
        <div className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-black/10">
          <div className="text-xs font-bold text-black/60">AI BOT</div>
          <div className="text-xl font-black text-black">{score.ai}</div>
        </div>
      </div>

      {/* Showdown Arena */}
      <div className="w-full bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-black/10 mb-6 flex flex-col items-center justify-center min-h-[220px]">
        <div className="flex items-center justify-around w-full">
          {/* Player Choice */}
          <div className="text-center">
            <div className="text-xs font-bold text-black/60 mb-2">YOUR PICK</div>
            <motion.div
              key={playerChoice || "none"}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 rounded-2xl bg-black text-white flex items-center justify-center text-5xl shadow-xl"
            >
              {getEmoji(playerChoice)}
            </motion.div>
          </div>

          <div className="font-heading font-black text-xl text-black/40">VS</div>

          {/* AI Choice */}
          <div className="text-center">
            <div className="text-xs font-bold text-black/60 mb-2">AI PICK</div>
            <motion.div
              key={aiChoice || "waiting"}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 rounded-2xl bg-white border border-black/15 text-black flex items-center justify-center text-5xl shadow-xl"
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
            className={`mt-6 text-xl font-black font-heading px-6 py-2 rounded-full ${
              result === "win"
                ? "bg-emerald-500 text-white"
                : result === "lose"
                ? "bg-black text-white"
                : "bg-amber-400 text-black"
            }`}
          >
            {result === "win" && "🎉 Victory!"}
            {result === "lose" && "🤖 AI Wins!"}
            {result === "draw" && "🤝 It's a Tie!"}
          </motion.div>
        )}
      </div>

      {/* Options Selector */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {RPS_CHOICES.map((choice) => (
          <motion.button
            key={choice.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePlay(choice.id)}
            className="p-4 rounded-2xl bg-white border border-black/10 hover:border-black flex flex-col items-center justify-center shadow-md transition-all"
          >
            <span className="text-4xl mb-1">{choice.emoji}</span>
            <span className="text-xs font-bold text-black">{choice.name}</span>
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
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2s - 5s
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
      <div className="flex items-center justify-between w-full mb-6 px-4 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-black/10">
        <div className="text-sm font-bold text-black">
          Last: <span className="text-primary font-black text-lg">{reactionTime ? `${reactionTime} ms` : "--"}</span>
        </div>
        <div className="text-sm font-bold text-black">
          Best Record: <span className="text-emerald-600 font-black text-lg">{bestTime ? `${bestTime} ms` : "--"}</span>
        </div>
      </div>

      {/* Main Interactive Box */}
      <div
        onClick={state === "idle" ? startTest : handleClick}
        className={`w-full aspect-square rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 border shadow-2xl ${
          state === "idle"
            ? "bg-white border-black/10 hover:border-primary"
            : state === "waiting"
            ? "bg-red-500 text-white border-red-600 animate-pulse"
            : state === "ready"
            ? "bg-primary text-black border-yellow-400 scale-[1.02]"
            : "bg-emerald-500 text-white border-emerald-600"
        }`}
      >
        {state === "idle" && (
          <>
            <Zap className="w-14 h-14 text-primary mb-4 animate-bounce" />
            <h3 className="font-heading font-black text-2xl text-black mb-1">Reflex Speed Test</h3>
            <p className="text-xs text-black/60 max-w-xs">
              Click anywhere inside this box to start. When screen turns YELLOW, click as fast as you can!
            </p>
          </>
        )}

        {state === "waiting" && (
          <>
            <h3 className="font-heading font-black text-3xl mb-1">Wait for Yellow...</h3>
            <p className="text-xs opacity-80">Don't click yet!</p>
          </>
        )}

        {state === "ready" && (
          <>
            <h3 className="font-heading font-black text-4xl mb-1 uppercase tracking-wider">TAP NOW!</h3>
          </>
        )}

        {state === "result" && (
          <>
            <Sparkles className="w-12 h-12 mb-2" />
            <div className="text-5xl font-black font-heading mb-1">{reactionTime} ms</div>
            <p className="text-sm font-bold opacity-90 mb-4">
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
              className="px-6 py-2.5 rounded-full bg-black text-white font-bold text-xs hover:scale-105 transition-transform"
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
    <main className="min-h-screen w-full bg-[#F9C000] text-black relative flex flex-col pb-32 sm:pb-48">
      {/* Background Dotted Effect */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }} 
      />

      <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-24 relative z-10 max-w-5xl flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black text-white font-bold text-xs sm:text-sm hover:bg-white hover:text-black transition-all shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Back to Website
          </Link>

          <div className="flex items-center gap-2 font-heading font-black text-lg sm:text-xl text-black">
            <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-black" /> GMM Arcade
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-heading font-black text-3xl sm:text-6xl text-black mb-2">
            Mini Games <span className="text-white">Arena</span>
          </h1>
          <p className="text-black/70 text-xs sm:text-base max-w-xl mx-auto font-medium px-2">
            Take a quick mental break! Play any of our 4 interactive mini-games directly in your browser.
          </p>
        </div>

        {/* 4 Tabs Selector */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2 px-1 no-scrollbar">
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
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap shadow-sm ${
                  isActive
                    ? "bg-black text-primary shadow-xl scale-105"
                    : "bg-white/70 text-black hover:bg-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {tab.label}
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
    <Suspense fallback={<div className="min-h-screen bg-[#F9C000] flex items-center justify-center font-bold text-black">Loading Arcade...</div>}>
      <GamesPageContent />
    </Suspense>
  );
}
