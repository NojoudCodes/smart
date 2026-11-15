import { useState, useMemo } from 'react';
import PlaceCard from '../components/ui/PlaceCard';
import FilterButton from '../components/ui/FilterButton';
import { FiSearch } from 'react-icons/fi';
import { FaUtensils, FaCoffee, FaShoppingBag } from 'react-icons/fa';
import placesData from '../data/places.json';

const CATEGORY_MAP = {
  مطاعم: { label: 'مطعم', icon: FaUtensils },
  كافيهات: { label: 'مقهى', icon: FaCoffee },
  مولات: { label: 'مول', icon: FaShoppingBag },
};

const toArabic = (n) => n.toLocaleString('ar-SA');

export default function Search() {
  const [activeFilter, setActiveFilter] = useState('type');
  const [query, setQuery] = useState('');

  const places = useMemo(() => {
    const q = query.trim();
    let list = placesData.filter(
      (p) =>
        !q ||
        p.name.includes(q) ||
        p.city.includes(q) ||
        CATEGORY_MAP[p.category]?.label.includes(q)
    );

    if (activeFilter === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    }
    return list.slice(0, 20); // لا تعرض الكل دفعة واحدة
  }, [query, activeFilter]);

  return (
    <div dir="rtl" className="min-h-screen px-4 py-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث باسم المكان أو المدينة أو النوع"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white text-gray-800 placeholder-gray-400 text-base rounded-full py-4 pr-6 pl-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B5AED]/50 transition-all text-right"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <FiSearch className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FilterButton label="نوع النشاط" active={activeFilter === 'type'} onClick={() => setActiveFilter('type')} />
          <FilterButton label="المنطقة" active={activeFilter === 'region'} onClick={() => setActiveFilter('region')} />
          <FilterButton label="الأعلى تقييماً" active={activeFilter === 'rating'} onClick={() => setActiveFilter('rating')} />
        </div>

        <div className="pt-2">
          <h2 className="text-xl font-bold text-[#1F1B4E]">أماكن مقترحة</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {places.map((p) => (
            <PlaceCard
              key={p.id}
              name={p.name}
              category={CATEGORY_MAP[p.category]?.label ?? p.category}
              location={p.city}
              rating={toArabic(p.rating)}
              reviews={`${toArabic(p.reviews)} مراجعة`}
              icon={CATEGORY_MAP[p.category]?.icon ?? FaUtensils}
            />
          ))}
        </div>
      </div>
    </div>
  );
}