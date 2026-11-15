import { FaStar } from 'react-icons/fa';

export default function PlaceCard({ name, category, location, rating, reviews, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between border border-gray-100">
      <div className="flex-1 ml-4 text-right">
        <h3 className="text-lg font-bold text-[#1F1B4E] mb-1">{name}</h3>
        <p className="text-xs text-gray-500">
          {category} • {location}
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-xs text-gray-400">{reviews}</span>
        <FaStar className="w-4 h-4 text-amber-400" />
        <span className="text-sm font-bold text-gray-800">{rating}</span>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-[#E6E6FA] flex items-center justify-center shrink-0 mr-3">
        <Icon className="w-6 h-6 text-[#6B5AED]" />
      </div>
    </div>
  );
}