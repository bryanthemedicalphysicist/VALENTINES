
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    // Fewer hearts for mobile to keep performance smooth
    const count = window.innerWidth < 768 ? 15 : 25;
    const newHearts = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 20 + 10}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 5 + 5}s`
    }));
    setHearts(newHearts);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-float text-red-400 opacity-50 select-none"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDelay: heart.delay,
            animationDuration: heart.duration
          }}
        >
          ❤
        </div>
      ))}
    </>
  );
};

export default FloatingHearts;
