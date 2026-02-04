
import React, { useState, useRef } from 'react';
import { Play, Pause, Heart, RotateCcw, Sparkles, Loader2 } from 'lucide-react';

const MusicHaven: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // This URL can be updated manually to point to your hosted audio file
  const [audioUrl] = useState<string | null>("https://res.cloudinary.com/dmf3swlql/video/upload/v1770185335/lloyiso-let-me-love-you-now_j4nvma.mp3"); 
  const [fileName] = useState<string>("Our Love Theme");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = () => {
    if (!audioUrl || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(e => {
            console.error("Playback failed", e);
            setHasError(true);
          });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      if (dur) {
        setProgress((current / dur) * 100);
        setCurrentTime(formatTime(current));
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
      setIsLoaded(true);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-gradient-to-br from-[#0f172a] via-[#450a0a] to-[#0f172a] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-white shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)] relative overflow-hidden group border border-white/5">
      <audio 
        ref={audioRef} 
        src={audioUrl || undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleMetadata}
        onEnded={() => setIsPlaying(false)}
        onCanPlay={() => { setIsLoaded(true); setHasError(false); }}
        onError={() => setHasError(true)}
        preload="auto"
      />
      
      <div className={`absolute -inset-20 bg-rose-500/20 blur-[100px] transition-opacity duration-[2000ms] ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="relative group/vinyl cursor-pointer" onClick={togglePlay}>
            <div className={`w-36 h-36 md:w-44 md:h-44 rounded-full border-[8px] bg-[#050505] shadow-2xl flex items-center justify-center relative overflow-hidden transition-all duration-1000 ${isPlaying ? 'animate-[spin_6s_linear_infinite] scale-105' : 'scale-100'}`}>
               <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tr from-rose-200 to-white rounded-full flex items-center justify-center border-[3px] md:border-4 border-[#1e1b4b]/20 relative z-20">
                 <Heart className={`text-rose-600 fill-rose-600 transition-all duration-700 w-5 h-5 md:w-7 md:h-7 ${isPlaying ? 'scale-125 animate-pulse' : 'scale-100 opacity-40'}`} />
               </div>
            </div>
            <div className={`absolute -top-4 -right-6 md:-top-6 md:-right-8 w-3 md:w-4 h-20 md:h-28 origin-top transition-all duration-1000 ease-in-out pointer-events-none z-30 ${isPlaying ? 'rotate-[25deg]' : 'rotate-0'}`}>
               <div className="h-full w-full bg-gradient-to-b from-slate-300 to-slate-600 rounded-full shadow-xl" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-rose-300/60">Our Sanctuary</span>
              <Sparkles className="w-3 h-3 text-rose-300 animate-pulse" />
            </div>
            <h3 className="text-2xl md:text-3xl font-romantic font-bold mb-1 text-white truncate max-w-[250px] mx-auto md:mx-0">
              {fileName}
            </h3>
            <p className="text-lg md:text-xl text-rose-100/60 font-romantic italic mb-6">"Lloyiso - Let Me Love You Now"</p>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlay} 
                className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-[#450a0a] hover:scale-110 active:scale-95 transition-all shadow-lg"
              >
                {!isLoaded && audioUrl ? <Loader2 className="animate-spin w-7 h-7" /> : isPlaying ? <Pause className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" /> : <Play className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" />}
              </button>
              
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[9px] font-mono font-bold text-rose-100/40">{currentTime}</span>
                  <span className="text-[9px] font-mono font-bold text-rose-100/40">{duration}</span>
                </div>
                <input type="range" min="0" max="100" value={progress} onChange={handleSeek} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${hasError ? 'bg-red-500' : isLoaded ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">
              {hasError ? 'Error Loading' : isLoaded ? 'System Ready' : 'Connecting...'}
            </span>
          </div>
          <button 
            onClick={() => { if(audioRef.current) audioRef.current.currentTime = 0; }} 
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/40 active:scale-90"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicHaven;
