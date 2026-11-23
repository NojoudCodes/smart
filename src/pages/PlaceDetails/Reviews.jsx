import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import ReviewCard from "./components/ReviewCard";

const reviews = [
  {
    id: 1,
    name: "سارة",
    when: "قبل يومين",
    daysAgo: 2,
    rating: 5,
    text: "الدجاج مقرمش والطعم ممتاز، والأسعار مناسبة جدًا للعائلة.",
    tags: [
      { label: "جودة الطعام", type: "pos" },
      { label: "الأسعار", type: "pos" },
    ],
  },
  {
    id: 2,
    name: "محمد",
    when: "قبل ٣ أيام",
    daysAgo: 3,
    rating: 3,
    text: "الأكل لذيذ لكن انتظرت أكثر من ٢٠ دقيقة، والمكان كان مزدحم وقت العشاء.",
    tags: [
      { label: "وقت الانتظار", type: "neg" },
      { label: "الازدحام", type: "neg" },
    ],
  },
  {
    id: 3,
    name: "نورة",
    when: "قبل أسبوع",
    daysAgo: 7,
    rating: 5,
    text: "المكان نظيف والموظفين متعاونين، أنصح فيه.",
    tags: [
      { label: "نظافة المكان", type: "pos" },
      { label: "تعامل الموظفين", type: "pos" },
    ],
  },
  {
    id: 4,
    name: "عبدالله",
    when: "قبل أسبوعين",
    daysAgo: 14,
    rating: 2,
    text: "ما لقيت موقف قريب، وتأخر طلبي كثير.",
    tags: [
      { label: "قلة المواقف", type: "neg" },
      { label: "تأخر الطلبات", type: "neg" },
    ],
  },
  {
    id: 5,
    name: "ريم",
    when: "قبل ٣ أسابيع",
    daysAgo: 21,
    rating: 4,
    text: "تجربة حلوة بشكل عام، بس الزحمة تتعب.",
    tags: [
      { label: "الازدحام", type: "neg" },
      { label: "جودة الطعام", type: "pos" },
    ],
  },
  {
    id: 6,
    name: "فهد",
    when: "قبل شهر",
    daysAgo: 30,
    rating: 5,
    text: "من أفضل المطاعم السريعة، الأسعار معقولة والجودة ثابتة.",
    tags: [{ label: "الأسعار", type: "pos" }],
  },
];

const topics = [
  "جودة الطعام",
  "الأسعار",
  "نظافة المكان",
  "تعامل الموظفين",
  "وقت الانتظار",
  "الازدحام",
  "قلة المواقف",
  "تأخر الطلبات",
];

const sorts = [
  { key: "new", label: "الأحدث أولًا" },
  { key: "top", label: "الأعلى تقييمًا" },
];

const PAGE = 4;

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? "bg-brand text-white" : "bg-card text-mute hover:bg-surface"
      }`}
    >
      {children}
    </button>
  );
}

export default function Reviews() {
  const [params, setParams] = useSearchParams();
  const topic = params.get("topic");
  const [sort, setSort] = useState("new");
  const [visible, setVisible] = useState(PAGE);

  const list = useMemo(() => {
    const filtered = topic
      ? reviews.filter((r) => r.tags.some((t) => t.label === topic))
      : reviews;
    return [...filtered].sort((a, b) =>
      sort === "top" ? b.rating - a.rating : a.daysAgo - b.daysAgo,
    );
  }, [topic, sort]);

  const setTopic = (t) => {
    setVisible(PAGE);
    t ? setParams({ topic: t }) : setParams({});
  };

  return (
    <div className="mt-5 pb-10 text-ink md:mt-7 md:pb-12">
      {/* الترتيب + العدد */}
      <div className="flex flex-wrap items-center gap-2">
        {sorts.map((s) => (
          <Chip
            key={s.key}
            active={sort === s.key}
            onClick={() => setSort(s.key)}
          >
            {s.label}
          </Chip>
        ))}
        <p className="ms-auto text-sm text-mute">{list.length} مراجعة</p>
      </div>

      {/* فلتر الموضوع */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        <Chip active={!topic} onClick={() => setTopic(null)}>
          الكل
        </Chip>
        {topics.map((t) => (
          <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>
            {t}
          </Chip>
        ))}
      </div>

      {/* القائمة */}
      {list.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-card p-8 text-center md:rounded-3xl">
          <p className="font-bold">لا توجد تقييمات لهذا الموضوع</p>
          <button
            onClick={() => setTopic(null)}
            className="mt-3 text-sm font-medium text-accent underline underline-offset-4"
          >
            عرض كل التقييمات
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-5">
            {list.slice(0, visible).map((r) => (
              <ReviewCard key={r.id} r={r} />
            ))}
          </div>

          {visible < list.length && (
            <button
              onClick={() => setVisible((v) => v + PAGE)}
              className="mx-auto mt-6 block rounded-xl bg-brand px-8 py-3 font-bold text-white transition-colors hover:bg-brand-dark"
            >
              عرض المزيد
            </button>
          )}
        </>
      )}
    </div>
  );
}
