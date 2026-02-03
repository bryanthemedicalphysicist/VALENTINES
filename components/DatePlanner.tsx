
import React, { useState } from 'react';
import { generateDateIdeas } from '../services/geminiService';
import { DateIdea } from '../types';
import { MapPin, Loader2, Sparkles, Coffee, Utensils, Moon } from 'lucide-react';

const DatePlanner: React.FC = () => {
  const [interests, setInterests] = useState('');
  const [ideas, setIdeas] = useState<DateIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const getVibeIcon = (vibe: string) => {
    const v = vibe.toLowerCase();
    if (v.includes('cozy')) return <Coffee className="text-orange-400" size={20} />;
    if (v.includes('adventurous') || v.includes('fun')) return <Sparkles className="text-yellow-400" size={20} />;
    if (v.includes('dinner') || v.includes('food')) return <Utensils className="text-red-400" size={20} />;
    return <Moon className="text-indigo-400" size={20} />;
  };

  const handlePlan = async () => {
    if (!interests.trim()) return;
    setLoading(true);
    try {
      const result = await generateDateIdeas(interests);
      setIdeas(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-pink-100 max-w-4xl mx-auto my-8">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="text-pink-500" size={24} />
        <h2 className="text-2xl font-romantic font-bold text-pink-600">Perfect Date Planner</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <p className="text-gray-600 text-sm italic">What does she love to do? (Movies, hiking, fancy dinner, museum...)</p>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. Italian food, stargazing..."
            className="w-full p-3 rounded-xl border-2 border-pink-100 focus:border-pink-300 outline-none transition-all"
          />
          <button
            onClick={handlePlan}
            disabled={loading || !interests.trim()}
            className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
            Plan Magic
          </button>
        </div>

        <div className="md:col-span-2 grid gap-4">
          {ideas.length > 0 ? (
            ideas.map((idea, idx) => (
              <div key={idx} className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 flex gap-4 animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                  {getVibeIcon(idea.vibe)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{idea.title}</h4>
                  <p className="text-gray-600 text-sm my-1">{idea.description}</p>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-pink-400 bg-pink-100/50 px-2 py-0.5 rounded-full">
                    Vibe: {idea.vibe}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-pink-100 rounded-2xl p-8">
              <MapPin size={48} className="mb-2 opacity-20" />
              <p>Your dream dates will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePlanner;
