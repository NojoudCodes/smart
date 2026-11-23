import { useState } from "react";
import { Outlet } from "react-router";
import { FaChevronLeft, FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import Tabs from "./components/Tabs";
import { useNavigate } from "react-router";
import cover from "../../assets/images/albaik-cover.jpg";
import logo from "../../assets/images/albaik-logo.png";
import mall from "../../assets/images/alnakheel-mall.jpg";

const place = {
  id: 1,
  name: "البيك",
  rating: "4.9",
  type: "مطعم",
  area: "النخيل، الرياض",
  address: "حي النخيل، شارع الأمير",
  hours: "9 ص - 12 م يوميًا",
  description:
    "مطعم للوجبات السريعة يقدم الدجاج المقرمش والمأكولات البحرية، مع خيارات مناسبة للأفراد والعائلات.",
  cover: cover,
  logo: logo,
  photos: [mall, null, null],
  mapUrl: "#",
};

const tabs = [
  { to: ".", label: "نظرة عامة", end: true },
  { to: "insights", label: "التحليل الذكي" },
  { to: "reviews", label: "التقييمات" },
];

export default function PlaceLayout() {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);
  return (
    <div dir="rtl" className="min-h-screen bg-bg font-sans text-mute">
      {/* الغلاف */}
      <div className="relative h-40 w-full bg-linear-to-r from-[#810F0F] to-[#C51F1C] sm:h-52 md:h-64 lg:h-80">
        {place.cover && (
          <img
            src={place.cover}
            alt=""
            className="h-full w-full object-cover"
          />
        )}

        <button
          onClick={() => navigate(-1)}
          aria-label="رجوع"
          className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-white/30 text-white backdrop-blur"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={() => setFav((f) => !f)}
          aria-label={fav ? "إزالة من المفضلة" : "إضافة للمفضلة"}
          aria-pressed={fav}
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/30 text-white backdrop-blur"
        >
          {fav ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* الشعار + الاسم */}
        <header className="flex flex-col items-center lg:flex-row lg:items-end lg:gap-6">
          <div className="relative -mt-11 size-22 shrink-0 overflow-hidden rounded-full border-[7px] border-bg bg-card lg:-mt-17 lg:size-34">
            {place.logo && (
              <img
                src={place.logo}
                alt={place.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="mt-3 w-full lg:mb-2 lg:mt-0">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              {place.name}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-mute">
              <FaStar className="text-star" aria-hidden />
              <span>{place.rating}</span>
              <span>{place.type}</span>
              <span aria-hidden>•</span>
              <span>{place.area}</span>
            </p>
          </div>
        </header>

        {/* التبويبات */}
        <Tabs
          tabs={tabs}
          label="أقسام المكان"
          className="mt-6 w-full lg:w-fit"
        />

        {/* محتوى التبويب الحالي */}
        <Outlet context={{ place }} />
      </div>
    </div>
  );
}
