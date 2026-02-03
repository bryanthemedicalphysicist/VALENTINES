
import React, { useState } from 'react';
import { Ticket, Utensils, Coffee, Sparkles, Heart, CheckCircle2, Tv, Footprints } from 'lucide-react';

interface Voucher {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const INITIAL_VOUCHERS: Voucher[] = [
  {
    id: 1,
    title: "A Master Chef Dinner",
    description: "I'll cook your absolute favorite meal from scratch, candlelight included.",
    icon: <Utensils size={24} />,
    color: "bg-rose-100 text-rose-600"
  },
  {
    id: 2,
    title: "Lazy Movie Marathon",
    description: "Your choice of movies all day. I'll provide the snacks and the cuddles.",
    icon: <Tv size={24} />,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 3,
    title: "The 'Yes' Day",
    description: "For 24 hours, I can't say no to any of your reasonable requests.",
    icon: <CheckCircle2 size={24} />,
    color: "bg-pink-100 text-pink-600"
  },
  {
    id: 4,
    title: "Professional Massage",
    description: "A 30-minute full-body or foot massage by yours truly.",
    icon: <Footprints size={24} />,
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: 6,
    title: "Breakfast in Bed",
    description: "Wake up to the smell of fresh coffee and your favorite breakfast.",
    icon: <Coffee size={24} />,
    color: "bg-amber-100 text-amber-600"
  }
];

const LoveVouchers: React.FC = () => {
  const [redeemed, setRedeemed] = useState<number[]>([]);

  const handleRedeem = (id: number) => {
    if (!redeemed.includes(id)) {
      setRedeemed([...redeemed, id]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-red-50 rounded-2xl mb-4">
          <Ticket className="text-red-500" size={28} />
        </div>
        <h2 className="text-4xl font-romantic font-bold text-gray-800">Your Love Vouchers</h2>
        <p className="text-gray-500 font-romantic text-xl mt-2 italic">Redeem these whenever you need a little extra magic, Amantle.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_VOUCHERS.map((voucher) => (
          <div 
            key={voucher.id}
            className={`relative group overflow-hidden bg-white rounded-[2rem] p-8 shadow-lg border border-pink-50 transition-all duration-500 ${redeemed.includes(voucher.id) ? 'opacity-90 grayscale-[0.3]' : 'hover:scale-[1.02] hover:shadow-2xl'}`}
          >
            {/* Perforation Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 bg-pink-50 rounded-b-full z-10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-6 bg-pink-50 rounded-t-full z-10" />

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${voucher.color}`}>
              {voucher.icon}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-3">{voucher.title}</h3>
            <p className="text-gray-600 text-sm italic leading-relaxed mb-8">
              "{voucher.description}"
            </p>

            {redeemed.includes(voucher.id) ? (
              <div className="flex items-center justify-center py-3 bg-green-50 text-green-600 rounded-full font-bold text-xs uppercase tracking-widest animate-in fade-in zoom-in">
                <Heart size={14} className="mr-2 fill-current" /> Redeemed & Promised
              </div>
            ) : (
              <button
                onClick={() => handleRedeem(voucher.id)}
                className="w-full py-3 bg-pink-500 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-pink-600 transition-colors shadow-md shadow-pink-200"
              >
                Redeem Now
              </button>
            )}

            {/* Background Sparkle Decoration */}
            <div className="absolute -bottom-4 -right-4 text-pink-50 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={80} />
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-center mt-12 text-pink-300 text-[10px] font-bold uppercase tracking-[0.3em]">
        Each voucher is valid for a lifetime of happiness
      </p>
    </div>
  );
};

export default LoveVouchers;
