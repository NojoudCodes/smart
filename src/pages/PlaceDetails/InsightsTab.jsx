import { useParams } from "react-router";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa6";
import useInsights from "../../hooks/useInsights";
import LoadingState from "./components/LoadingState";
import Message from "../../components/ui/Message";
import ListCard from "./components/ListCard";

const TREND = {
  up: { icon: FaArrowUp, title: "ترند إيجابي", note: "الرضا في تحسّن" },
  down: { icon: FaArrowDown, title: "ترند سلبي", note: "الرضا في تراجع" },
  flat: { icon: FaMinus, title: "مستقر", note: "لا تغيّر ملحوظ" },
};

const formatCount = (n) =>
  n >= 1000
    ? new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
      })
        .format(n)
        .toLowerCase()
    : String(n);

export default function InsightsTab() {
  const { id } = useParams();
  const { data, status, refetch } = useInsights(id);

  if (status === "loading") return <LoadingState />;

  if (status === "error")
    return (
      <Message
        title="تعذّر تحميل التحليل"
        action={
          <button
            onClick={refetch}
            className="mt-4 rounded-xl bg-brand px-6 py-2.5 font-bold text-white transition-colors hover:bg-brand-dark"
          >
            إعادة المحاولة
          </button>
        }
      />
    );

  if (data.reviewsCount === 0)
    return <Message title="لا توجد تقييمات كافية لعرض التحليل بعد" />;

  const trend = TREND[data.trend] ?? TREND.flat;
  const TrendIcon = trend.icon;

  const max = Math.max(...data.series.map((s) => s.value), 1);
  const bars = data.series.map((s) => ({
    ...s,
    height: Math.max(6, (s.value / max) * 100),
  }));

  return (
    <div className="mt-5 pb-10 text-ink md:mt-7 md:pb-12">
      {/* ملخص الذكاء الاصطناعي */}
      <section className="rounded-2xl bg-brand-lavender p-5 text-brand-night dark:bg-brand dark:text-white md:rounded-[28px] md:bg-brand md:px-8 md:py-7 md:text-white">
        <h2 className="text-base font-bold md:text-xl">
          ملخص الذكاء الاصطناعي
        </h2>
        <p className="mt-2 text-sm leading-7 md:mt-3 md:text-base">
          {data.summary}
        </p>
      </section>

      {/* الإحصائيات */}
      <div className="mt-4 grid grid-cols-3 gap-3 md:mt-6 md:gap-5">
        <div className="rounded-2xl bg-card p-4 dark:bg-surface md:rounded-3xl md:bg-surface md:p-7">
          <TrendIcon className="text-xl dark:text-good md:hidden" />
          <p className="hidden items-center gap-3 text-3xl font-extrabold md:flex lg:text-4xl">
            <TrendIcon className="text-2xl" />
            {trend.title}
          </p>
          <p className="mt-3 text-sm font-medium md:hidden">{trend.title}</p>
          <p className="text-xs text-mute md:mt-4 md:text-base">{trend.note}</p>
        </div>

        <div className="rounded-2xl bg-card p-4 dark:bg-surface md:rounded-3xl md:bg-surface md:p-7">
          <p
            dir="ltr"
            className="text-right text-2xl font-extrabold md:text-4xl"
          >
            {formatCount(data.reviewsCount)}
          </p>
          <p className="mt-3 text-sm text-mute md:mt-4 md:text-base">مراجعة</p>
        </div>

        <div className="rounded-2xl bg-card p-4 dark:bg-surface md:rounded-3xl md:bg-surface md:p-7">
          <p className="text-2xl font-extrabold dark:text-good md:text-4xl md:text-good">
            {data.satisfaction}%
          </p>
          <p className="mt-3 text-sm text-mute md:mt-4 md:text-base">رضا عام</p>
        </div>
      </div>

      {/* الأكثر مدحًا / شكوى */}
      <div className="mt-4 grid grid-cols-2 gap-3 md:mt-6 md:gap-5">
        <ListCard title="الأكثر مدحًا" items={data.praised} placeId={id} />
        <ListCard title="الأكثر شكوى" items={data.complaints} placeId={id} />
      </div>

      {/* اتجاه الرضا */}
      {bars.length > 0 && (
        <section className="mt-4 rounded-2xl bg-card p-4 md:mt-6 md:rounded-3xl md:p-7">
          <h3 className="text-base font-bold md:text-lg">
            اتجاه الرضا آخر ٣٠ يومًا
          </h3>
          <div
            role="img"
            aria-label="رسم بياني لاتجاه الرضا"
            className="mt-5 flex h-40 items-end gap-2 md:h-56 md:gap-4"
          >
            {bars.map((b, i) => (
              <div
                key={b.date ?? i}
                title={`${b.date ?? ""} : ${b.value}`}
                style={{ height: `${b.height}%` }}
                className={`flex-1 rounded-t-lg ${
                  i === bars.length - 1 ? "bg-brand" : "bg-brand-lavender"
                }`}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-between text-xs text-mute md:text-sm">
            <span>اليوم ١</span>
            <span>اليوم ٣٠</span>
          </div>
        </section>
      )}
    </div>
  );
}
