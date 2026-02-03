
import React from 'react';
import { Heart, Star, Sun, Cloud, Moon, Sparkles } from 'lucide-react';

const REASONS = [
  { icon: <Star className="text-yellow-400" />, text: "The way your eyes light up when you see me." },
  { icon: <Heart className="text-red-400" />, text: "How you make me feel like the luckiest person in the room, every single time." },
  { icon: <Sun className="text-orange-400" />, text: "Your kindness is a warmth that everyone around you can feel." },
  { icon: <Cloud className="text-blue-300" />, text: "The peace I find just sitting in silence with you." },
  { icon: <Moon className="text-indigo-400" />, text: "Our late-night conversations that feel like they could last forever." },
  { icon: <Sparkles className="text-pink-400" />, text: "Simply because you are you, and there's nobody else like you." }
];

const ReasonsWhy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-4xl font-romantic font-bold text-center text-gray-800 mb-12">Why I Adore You</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {REASONS.map((reason, idx) => (
          <div 
            key={idx} 
            className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 flex items-start gap-4 hover:shadow-md transition-all duration-300"
          >
            <div className="mt-1">{reason.icon}</div>
            <p className="font-romantic text-xl text-gray-700 italic leading-snug">{reason.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsWhy;
