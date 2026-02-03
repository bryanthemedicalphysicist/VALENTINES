
import React, { useState } from 'react';
import { Heart, PartyPopper } from 'lucide-react';

const ValentineChallenge: React.FC = () => {
  const [noButtonPos, setNoButtonPos] = useState({ top: 0, left: 0 });
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isMoved, setIsMoved] = useState(false);

  const moveButton = () => {
    // Determine movement range based on container
    const range = window.innerWidth < 768 ? 100 : 180;
    
    // Generate a random position that keeps the button visible
    const randomTop = Math.floor(Math.random() * (range / 2)) - (range / 4);
    const randomLeft = Math.floor(Math.random() * range) - (range / 2);
    
    setNoButtonPos({ top: randomTop, left: randomLeft });
    setIsMoved(true);
  };

  if (hasAccepted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pink-50/98 backdrop-blur-xl animate-in fade-in zoom-in duration-700">
        <div className="text-center p-8 md:p-12 bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-pink-100 relative overflow-hidden max-w-[90%] md:max-w-lg mx-auto">
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Heart className="text-red-500 fill-red-500 w-16 h-16 md:w-24 md:h-24 animate-pulse" />
                <PartyPopper className="absolute -top-2 -right-2 text-yellow-400 w-8 h-8 animate-bounce" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-playful text-red-600 mb-6">YAY! ❤️</h1>
            <p className="text-lg md:text-2xl text-gray-700 font-romantic leading-relaxed mb-8 italic">
              "Amantle said YES! I'm the luckiest guy in the world. I will love you forever Babe!"
            </p>
            <button 
              onClick={() => { setHasAccepted(false); setIsMoved(false); setNoButtonPos({ top: 0, left: 0 }); }}
              className="px-8 py-3 bg-pink-50 text-pink-500 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-pink-100 active:scale-95 transition-all"
            >
              Back to our story
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-6 md:my-12 text-center py-10 md:py-16 px-6 md:px-8 bg-white/60 rounded-[2rem] md:rounded-[3rem] shadow-xl backdrop-blur-md border border-pink-100 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-romantic font-bold text-gray-800 mb-2">Amantle...</h2>
      <p className="text-xl md:text-2xl font-romantic text-gray-500 mb-12 italic">Will you be my Valentine?</p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 min-h-[220px] relative">
        <button
          onClick={() => setHasAccepted(true)}
          className="group relative z-20 bg-red-500 hover:bg-red-600 text-white px-10 py-4 md:px-12 md:py-5 rounded-full text-xl md:text-2xl font-bold shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 w-full md:w-auto"
        >
          <span className="flex items-center justify-center gap-2">YES! <Heart className="fill-white w-5 h-5 md:w-6 md:h-6" /></span>
        </button>
        
        <div 
          className="transition-all duration-300 ease-out z-10 w-full md:w-auto"
          style={isMoved ? { transform: `translate(${noButtonPos.left}px, ${noButtonPos.top}px)` } : {}}
        >
          <button
            onMouseEnter={moveButton}
            onClick={moveButton}
            className="bg-gray-100 text-gray-400 px-8 py-3.5 md:py-4 rounded-full text-base md:text-lg font-medium transition-all duration-200 hover:bg-gray-200 w-full md:w-auto active:scale-90"
          >
            No
          </button>
        </div>
      </div>
      <p className="mt-8 text-pink-300 text-[10px] uppercase tracking-[0.2em] font-bold font-playful">I won't let you say no!</p>
    </div>
  );
};

export default ValentineChallenge;
