
import React from 'react';
import { Memory } from '../types';

const MEMORIES: Memory[] = [
  { 
    id: '0', 
    imageUrl: 'https://res.cloudinary.com/dmf3swlql/image/upload/v1770190551/1001673531_cm8r5p.jpg', 
    caption: 'The most beautiful view in the world', 
    date: 'Always',
    rotation: -2
  },
  { 
    id: '1', 
    imageUrl: 'https://res.cloudinary.com/dmf3swlql/image/upload/v1770190857/Amantle_Bae_20160501_073349_bqewgc.jpg', 
    caption: 'First Love: When I first fell in love with you', 
    date: '2013',
    rotation: 3
  },
  { 
    id: '2', 
    imageUrl: 'https://res.cloudinary.com/dmf3swlql/image/upload/v1770190539/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L3YxMDI1LTE2LWt0Yjk0eHFmLmpwZw_cpuxzg.webp', 
    caption: 'Tragedy: The year we broke up', 
    date: '2016',
    rotation: -3
  },
  { 
    id: '3', 
    imageUrl: 'https://res.cloudinary.com/dmf3swlql/image/upload/v1770190552/1001718059_ccj6ry.jpg', 
    caption: 'Connection: The magic of us reconnecting', 
    date: '2025',
    rotation: 2
  },
  { 
    id: '4', 
    imageUrl: 'https://res.cloudinary.com/dmf3swlql/image/upload/v1770190552/1001718067_djmh9k.jpg', 
    caption: 'Forever: We got back together until forever', 
    date: '2026',
    rotation: -1
  }
];

const MemoryGallery: React.FC = () => {
  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-romantic font-bold text-gray-800 mb-4">Our Journey</h2>
        <div className="h-1 w-20 bg-pink-200 mx-auto rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {MEMORIES.map((memory) => (
          <div 
            key={memory.id}
            className="group relative bg-white p-4 pb-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            style={{ transform: `rotate(${memory.rotation}deg)` }}
          >
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden mb-5 relative">
              <img 
                src={memory.imageUrl} 
                alt={memory.caption}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${memory.date === '2016' ? 'grayscale-[0.4] contrast-125' : ''}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';
                }}
              />
              <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-center px-2">
              <p className="font-romantic text-lg md:text-xl text-gray-700 leading-tight mb-2 italic">
                {memory.caption}
              </p>
              <div className="inline-block px-3 py-1 bg-pink-50 rounded-full">
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-pink-400">
                  {memory.date}
                </p>
              </div>
            </div>
            
            {/* Polaroid Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-9 bg-white/40 backdrop-blur-sm -rotate-2 border border-white/30 shadow-[0_2px_10px_rgba(0,0,0,0.05)] z-20" />
            
            {/* Subtle Texture overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGallery;
