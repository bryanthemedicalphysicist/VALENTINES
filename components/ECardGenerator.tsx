
import React, { useState } from 'react';
import { generateECardDetails, generateLoveCardImage } from '../services/geminiService';
import { ECardResult } from '../types';
import { Image as ImageIcon, Music, Send, Loader2, Sparkles, Heart } from 'lucide-react';

const ECardGenerator: React.FC = () => {
  const [message, setMessage] = useState('');
  const [photoPrompt, setPhotoPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState<ECardResult | null>(null);
  const [cardImage, setCardImage] = useState<string>('');

  const handleCreateCard = async () => {
    if (!message.trim() || !photoPrompt.trim()) return;
    setLoading(true);
    try {
      const [details, image] = await Promise.all([
        generateECardDetails(message),
        generateLoveCardImage(photoPrompt)
      ]);
      setCardData(details);
      setCardImage(image);
    } catch (error) {
      console.error("Error creating e-card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-pink-100 max-w-5xl mx-auto my-6 md:my-12">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="bg-pink-100 p-2 md:p-3 rounded-xl md:rounded-2xl">
          <Heart className="text-pink-500 fill-pink-500 w-5 h-5 md:w-7 md:h-7" />
        </div>
        <h2 className="text-xl md:text-3xl font-romantic font-bold text-gray-800 tracking-tight">E-Card Creator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Pour your heart out here..."
              className="w-full p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 border-pink-50 focus:border-pink-300 focus:ring-0 outline-none transition-all h-24 md:h-32 text-sm md:text-base text-gray-700 bg-pink-50/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 text-wrap">Cherished Photo (Describe the scene)</label>
            <div className="relative">
              <input
                type="text"
                value={photoPrompt}
                onChange={(e) => setPhotoPrompt(e.target.value)}
                placeholder="Couple in a cherry blossom garden..."
                className="w-full p-4 pl-12 md:p-5 md:pl-14 rounded-2xl md:rounded-3xl border-2 border-pink-50 focus:border-pink-300 outline-none transition-all text-sm md:text-base bg-pink-50/30"
              />
              <ImageIcon className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>

          <button
            onClick={handleCreateCard}
            disabled={loading || !message.trim() || !photoPrompt.trim()}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 md:py-5 rounded-2xl md:rounded-3xl hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            <span className="text-sm md:text-base">{loading ? 'Generating Magic...' : 'Generate My E-Card'}</span>
          </button>
        </div>

        <div className="relative group min-h-[350px] md:min-h-[500px] flex items-center justify-center">
          {!cardData ? (
            <div className="w-full h-full border-2 md:border-4 border-dashed border-pink-100 rounded-[1.5rem] md:rounded-[3rem] flex flex-col items-center justify-center p-6 md:p-12 text-center text-pink-200">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 md:w-10 md:h-10 opacity-50" />
              </div>
              <p className="text-lg md:text-xl font-romantic font-semibold">Preview your masterpiece here</p>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in duration-700 w-full px-2">
              <div className="bg-white p-3 md:p-6 pb-8 md:pb-12 shadow-2xl rounded-sm border-[8px] md:border-[12px] border-white rotate-1 hover:rotate-0 transition-all duration-500 overflow-hidden">
                <div className="relative aspect-square mb-4 md:mb-6 overflow-hidden rounded-sm bg-gray-50">
                  {cardImage && <img src={cardImage} alt="Valentine card" className="w-full h-full object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                
                <div className="space-y-3 px-2">
                  <h3 className="text-xl md:text-2xl font-romantic font-bold text-gray-800 text-center leading-tight">
                    {cardData.cardThemeTitle}
                  </h3>
                  <div className="h-0.5 w-10 md:w-12 bg-pink-200 mx-auto" />
                  <p className="font-romantic text-base md:text-lg text-gray-600 text-center italic leading-relaxed whitespace-pre-line">
                    "{message}"
                  </p>
                </div>

                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-pink-50 flex items-center justify-center gap-3 md:gap-4 text-pink-500">
                   <div className="bg-pink-50 p-2 rounded-full animate-pulse">
                     <Music className="w-4 h-4 md:w-5 md:h-5" />
                   </div>
                   <div className="text-center">
                     <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-pink-300">Suggested Soundtrack</p>
                     <p className="text-xs md:text-sm font-semibold text-gray-700">{cardData.songTitle} - {cardData.songArtist}</p>
                   </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={() => { setCardData(null); setCardImage(''); }}
                  className="text-pink-400 text-xs md:text-sm font-bold hover:text-pink-600 flex items-center gap-2 transition-colors"
                >
                  <Send className="w-3 h-3" /> Start Fresh
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ECardGenerator;
