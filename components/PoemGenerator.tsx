
import React, { useState } from 'react';
import { generatePoem } from '../services/geminiService';
import { PoemResult } from '../types';
import { Heart, Loader2, Sparkles } from 'lucide-react';

const PoemGenerator: React.FC = () => {
  const [traits, setTraits] = useState('');
  const [poem, setPoem] = useState<PoemResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!traits.trim()) return;
    setLoading(true);
    try {
      const result = await generatePoem(traits);
      setPoem(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-pink-100 max-w-2xl mx-auto my-8">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="text-red-500 fill-red-500" size={24} />
        <h2 className="text-2xl font-romantic font-bold text-red-600">AI Love Letter</h2>
      </div>
      
      {!poem ? (
        <div className="space-y-4">
          <p className="text-gray-600 italic">Tell me what you love about her, and I'll craft a masterpiece...</p>
          <textarea
            value={traits}
            onChange={(e) => setTraits(e.target.value)}
            placeholder="e.g. her smile, her kindness, how she loves rainy days..."
            className="w-full p-4 rounded-2xl border-2 border-pink-200 focus:border-red-400 focus:ring-0 outline-none transition-all h-32 text-gray-700"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !traits.trim()}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            {loading ? 'Crafting Love...' : 'Generate Romantic Poem'}
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-2xl font-romantic font-bold text-center mb-4 text-gray-800 underline decoration-pink-300 decoration-wavy underline-offset-8">
            {poem.title}
          </h3>
          <div className="whitespace-pre-line text-lg font-romantic text-gray-700 leading-relaxed text-center px-4">
            {poem.content}
          </div>
          <button
            onClick={() => {setPoem(null); setTraits('');}}
            className="mt-8 text-pink-500 text-sm hover:underline w-full text-center"
          >
            Create another one?
          </button>
        </div>
      )}
    </div>
  );
};

export default PoemGenerator;
