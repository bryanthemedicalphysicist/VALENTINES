
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Gift, Heart } from 'lucide-react';

const AIGift: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateGift = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: "A high-end, dreamy, aesthetic digital painting of a golden sunrise over a field of pink lilies and white roses. Soft lighting, watercolor textures, extremely romantic and peaceful, 4k resolution, artistic masterpiece." },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    } catch (error) {
      console.error("Error generating gift:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-center">
      <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-12 border border-pink-100 shadow-2xl overflow-hidden relative group">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-red-200/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex p-4 bg-pink-50 rounded-2xl mb-6">
            <Gift className="text-pink-500 animate-bounce" size={32} />
          </div>
          <h2 className="text-4xl font-romantic font-bold text-gray-800 mb-4">A Gift for Your Eyes</h2>
          <p className="text-gray-500 font-romantic text-xl mb-10 italic">"I asked the stars to paint a picture that felt like your soul..."</p>

          {!imageUrl ? (
            <button
              onClick={generateGift}
              disabled={loading}
              className="px-12 py-5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {loading ? "Creating your masterpiece..." : "Open your Gift, Amantle"}
            </button>
          ) : (
            <div className="animate-in fade-in zoom-in duration-1000">
              <div className="relative inline-block p-4 bg-white shadow-2xl rounded-sm border-[12px] border-white -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img src={imageUrl} alt="AI Gift" className="w-full max-w-md rounded-sm" />
                <div className="absolute -bottom-4 -right-4">
                  <Heart className="text-red-500 fill-red-500 w-12 h-12 drop-shadow-lg" />
                </div>
              </div>
              <p className="mt-12 text-sm font-bold text-pink-300 uppercase tracking-widest italic">Generated uniquely for you this moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGift;
