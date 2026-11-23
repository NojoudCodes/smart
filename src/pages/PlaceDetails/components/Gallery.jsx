import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const MAX_MOBILE = 3;
const MAX_DESKTOP = 6;

export default function Gallery({ photos }) {
  const [current, setCurrent] = useState(null);

  const visible = photos.slice(0, MAX_DESKTOP);
  const extraMobile = photos.length - MAX_MOBILE;
  const extraDesktop = photos.length - MAX_DESKTOP;
  const isOpen = current !== null;

  const close = () => setCurrent(null);
  const next = () => setCurrent((i) => (i + 1) % photos.length);
  const prev = () => setCurrent((i) => (i - 1 + photos.length) % photos.length);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, photos.length]);

  return (
    <>
      <ul className="mt-4 grid grid-cols-3 gap-2 md:gap-4">
        {visible.map((src, i) => {
          const isLastMobile = i === MAX_MOBILE - 1 && extraMobile > 0;
          const isLastDesktop = i === MAX_DESKTOP - 1 && extraDesktop > 0;
          const hiddenOnMobile = i >= MAX_MOBILE;

          return (
            <li
              key={src ?? i}
              className={`relative aspect-3/2 overflow-hidden rounded-lg bg-brand-lavender dark:bg-card lg:rounded-2xl ${
                hiddenOnMobile ? "hidden md:block" : ""
              }`}
            >
              <button
                onClick={() => setCurrent(i)}
                className="block h-full w-full"
                aria-label={`فتح الصورة ${i + 1}`}
              >
                {src ? (
                  <img
                    src={src}
                    alt={`صورة المكان ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-sm">
                    صورة المكان
                  </span>
                )}
              </button>

              {isLastMobile && (
                <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/50 text-xl font-bold text-white md:hidden">
                  +{extraMobile}
                </span>
              )}
              {isLastDesktop && (
                <span className="pointer-events-none absolute inset-0 hidden place-items-center bg-black/50 text-xl font-bold text-white md:grid">
                  +{extraDesktop}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="معرض الصور"
          dir="rtl"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="إغلاق"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <FaTimes />
          </button>

          <p className="absolute top-6 left-1/2 -translate-x-1/2 text-sm text-white">
            {current + 1} / {photos.length}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="السابقة"
            className="absolute right-3 grid size-10 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30 md:right-6"
          >
            <FaChevronRight />
          </button>

          {photos[current] ? (
            <img
              src={photos[current]}
              alt={`صورة المكان ${current + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="grid aspect-3/2 w-full max-w-xl place-items-center rounded-lg bg-card text-ink"
            >
              صورة المكان
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="التالية"
            className="absolute left-3 grid size-10 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30 md:left-6"
          >
            <FaChevronLeft />
          </button>
        </div>
      )}
    </>
  );
}
