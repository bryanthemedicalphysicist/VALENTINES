
import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import FloatingHearts from './components/FloatingHearts';
import LoveLetter from './components/LoveLetter';
import MemoryGallery from './components/MemoryGallery';
import ValentineChallenge from './components/ValentineChallenge';
import ReasonsWhy from './components/ReasonsWhy';
import MusicHaven from './components/MusicHaven';
import LoveVouchers from './components/LoveVouchers';
import { Heart, Stars, Ticket } from 'lucide-react';

const CameraIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed footer padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-red-500 z-[100] flex flex-col items-center justify-center text-white p-6">
        <Heart className="w-16 h-16 md:w-24 md:h-24 mb-6 animate-bounce fill-white" />
        <h1 className="text-4xl md:text-6xl font-romantic font-bold text-center leading-tight">For My Amantle...</h1>
        <p className="mt-4 text-lg opacity-80 animate-pulse text-center">Bryan's heart is loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pb-32 overflow-x-hidden bg-gradient-to-b from-pink-50 via-white to-pink-50 text-gray-800">
      <FloatingHearts />
      
      {/* Header */}
      <header className="relative z-10 pt-12 md:pt-20 px-4 text-center">
        <div className="inline-block bg-white/40 backdrop-blur-lg px-4 py-1.5 rounded-full border border-pink-200 shadow-sm mb-4">
          <p className="text-pink-600 text-sm font-semibold flex items-center justify-center gap-2">
            <Stars size={14} /> Bryan & Amantle <Stars size={14} />
          </p>
        </div>
        <h1 className="text-5xl md:text-9xl font-playful text-red-500 drop-shadow-md animate-in fade-in slide-in-from-top-4 duration-1000 leading-tight">
          Our Love
        </h1>
        <p className="text-gray-500 font-romantic text-xl md:text-3xl mt-4 italic">A digital sanctuary for Amantle</p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 mt-12 space-y-20 md:space-y-32">
        
        {/* Love Letter Section */}
        <section id="letter" className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <LoveLetter />
        </section>

        {/* Reasons Why Section */}
        <section>
          <ReasonsWhy />
        </section>

        {/* Memory Gallery Section */}
        <section id="gallery">
          <MemoryGallery />
        </section>

        {/* Love Vouchers Section */}
        <section id="vouchers">
          <LoveVouchers />
        </section>

        {/* Music Haven Section */}
        <section className="flex justify-center px-2" id="music">
          <MusicHaven />
        </section>

        {/* Valentine Ask Challenge */}
        <section id="valentine-ask" className="pt-4 md:pt-12">
          <div className="text-center mb-2">
            <p className="text-pink-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm font-playful">One Final Question</p>
          </div>
          <ValentineChallenge />
        </section>

        {/* Closing Sentiment */}
        <section className="text-center py-12 md:py-20 pb-16">
          <Heart className="mx-auto text-red-500 fill-red-500 w-12 h-12 md:w-16 md:h-16 animate-pulse mb-6 md:mb-8" />
          <h2 className="text-3xl md:text-5xl font-romantic font-bold text-gray-800 mb-4 md:mb-6">Forever & Always</h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl font-romantic leading-relaxed italic px-6">
            "Amantle, in all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
          </p>
          <p className="mt-8 text-pink-300 font-bold tracking-widest uppercase text-[10px] font-playful">— Love, Bryan</p>
        </section>
      </main>

      {/* Persistent Navigation Bar */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-pink-100 py-4 px-4 md:px-8 z-50 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto flex items-center justify-around md:justify-between gap-2">
          <p className="hidden md:block text-[10px] font-bold text-pink-400 uppercase tracking-widest font-playful">A Digital Love Letter for Amantle</p>
          
          <div className="flex flex-1 md:flex-initial justify-around md:justify-end gap-1 md:gap-6">
             <button 
               onClick={() => scrollToSection('letter')} 
               className="text-pink-400 hover:text-red-500 transition-all flex flex-col items-center gap-1 active:scale-90 p-2"
             >
               <Heart size={22} />
               <span className="text-[9px] font-bold uppercase tracking-tighter font-playful">Letter</span>
             </button>

             <button 
               onClick={() => scrollToSection('vouchers')} 
               className="text-pink-400 hover:text-red-500 transition-all flex flex-col items-center gap-1 active:scale-90 p-2"
             >
               <Ticket size={22} />
               <span className="text-[9px] font-bold uppercase tracking-tighter font-playful">Vouchers</span>
             </button>

             <button 
               onClick={() => scrollToSection('music')} 
               className="text-pink-400 hover:text-red-500 transition-all flex flex-col items-center gap-1 active:scale-90 p-2"
             >
               <Heart size={22} />
               <span className="text-[9px] font-bold uppercase tracking-tighter font-playful">Music</span>
             </button>

             <button 
               onClick={() => scrollToSection('gallery')} 
               className="text-pink-400 hover:text-red-500 transition-all flex flex-col items-center gap-1 active:scale-90 p-2"
             >
               <CameraIcon size={22} />
               <span className="text-[9px] font-bold uppercase tracking-tighter font-playful">Gallery</span>
             </button>

             <button 
               onClick={() => scrollToSection('valentine-ask')} 
               className="text-red-500 hover:text-red-600 transition-all flex flex-col items-center gap-1 active:scale-90 p-2 bg-red-50 rounded-2xl px-3"
             >
               <Heart size={22} className="fill-current" />
               <span className="text-[9px] font-bold uppercase tracking-tighter font-playful">The Ask</span>
             </button>
          </div>
        </div>
      </footer>
      <SpeedInsights />
    </div>
  );
};

export default App;
