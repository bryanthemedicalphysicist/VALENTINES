
import React from 'react';
import { Heart } from 'lucide-react';

const LoveLetter: React.FC = () => {
  return (
    <div className="relative max-w-2xl mx-auto my-12 md:my-16 p-6 md:p-12 bg-[#fffdfa] shadow-[15px_15px_40px_rgba(0,0,0,0.05)] border-l-[8px] md:border-l-[12px] border-red-400/20 rounded-sm transform -rotate-1 hover:rotate-0 transition-transform duration-500">
      {/* Decorative Heart Background */}
      <div className="absolute top-2 right-10 md:top-4 md:right-12 text-red-100/50 pointer-events-none">
        <Heart className="w-20 h-20 md:w-32 md:h-32" fill="currentColor" />
      </div>
      
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-romantic font-bold text-red-600 mb-6 md:mb-8 border-b border-red-100 pb-3 md:pb-4">
          To My Amantle...
        </h2>
        
        <div className="space-y-4 md:space-y-6 font-romantic text-xl md:text-2xl text-gray-700 leading-relaxed italic">
          <p>
            From the moment we first started talking all those years ago, my world shifted into a brighter, more beautiful color. I never knew that one person could become my entire home until I found myself in your laughter.
          </p>
          <p>
            Amantle, thank you motho wame for being my peace in the chaos, my light in the dark, and my favorite reason to wake up every single morning.
          </p>
          <p>
            You are my best friend, my greatest adventure, and my true love. My heart beats only for you.
          </p>
        </div>
        
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-red-50 text-right">
          <p className="font-romantic text-2xl md:text-3xl text-red-500">Forever Yours, Bryan ❤️</p>
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;
