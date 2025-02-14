import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface FloatingFlowerProps {
  delay: number;
  duration: number;
  size: number;
}

function FloatingFlower({ delay, duration, size }: FloatingFlowerProps) {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });

  useEffect(() => {
    const moveFlower = () => {
      setPosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    };

    const interval = setInterval(moveFlower, duration * 1000);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div
      className="absolute text-pink-300/20 transition-all duration-[15000ms] ease-in-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${position.x}%`,
        top: `${position.y}%`,
        animation: `spin ${duration}s infinite linear`,
        animationDelay: `${delay}s`,
      }}
    >
      ✿
    </div>
  );
}

function App() {
  const [showSecondPage, setShowSecondPage] = useState(false);
  const [flowers, setFlowers] = useState<FloatingFlowerProps[]>([]);

  useEffect(() => {
    const count = 30;
    const newFlowers: FloatingFlowerProps[] = Array.from({ length: count }, (_, i) => ({
      delay: Math.random() * -20,
      duration: 15 + Math.random() * 10,
      size: 16 + Math.floor(Math.random() * 24),
    }));
    setFlowers(newFlowers);
  }, []);

  if (!showSecondPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          {flowers.map((flower, index) => (
            <FloatingFlower key={index} {...flower} />
          ))}
        </div>
        <div className="text-center space-y-8 p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl max-w-md mx-4 border border-pink-500/20 relative z-10">
          <div className="flex justify-center">
            <Heart className="w-16 h-16 text-pink-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-pink-100 font-serif">
            Hello Corycita,
            <br />
            hope you like it
          </h1>
          <button
            onClick={() => setShowSecondPage(true)}
            className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 transform hover:-translate-y-1"
          >
            Click for a surprise ❤️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 flex flex-col items-center justify-center overflow-hidden relative p-4">
      <div className="absolute inset-0 overflow-hidden">
        {flowers.map((flower, index) => (
          <FloatingFlower key={index} {...flower} />
        ))}
      </div>
      <div className="text-center space-y-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl max-w-md mx-4 border border-pink-500/20 relative z-10">
        <h1 className="text-3xl font-bold text-pink-300 font-serif">
          Happy Valentine's Day
        </h1>
        <div className="relative flex justify-center items-center">
          <img
            src="rosa.png"
            alt="Valentine's Rose"
            className="w-80 h-auto object-cover mix-blend-multiply drop-shadow-lg"
          />
        </div>
        <p className="text-xl text-pink-100 font-medium italic text-center">
          "Sorry for not being with you today, I promise to make it up to you, love u ♡"
        </p>
        <button
          onClick={() => setShowSecondPage(false)}
          className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 transform hover:-translate-y-1"
        >
          ← Go back
        </button>
      </div>
    </div>
  );
}

export default App;