import { FaStar, FaPlus, FaMinus } from "react-icons/fa6";

function Stars({ value }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${value} من 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <FaStar key={n} className={n <= value ? "text-star" : "text-line"} />
      ))}
    </div>
  );
}

export default function ReviewCard({ r }) {
  return (
    <article className="rounded-2xl bg-card p-4 md:rounded-3xl md:p-6">
      <header className="flex items-center gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-base font-bold text-ink dark:text-white">
          {r.name[0]}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-bold text-ink">{r.name}</h3>
          <p className="text-xs text-mute md:text-sm">{r.when}</p>
        </div>
        <div className="ms-auto">
          <Stars value={r.rating} />
        </div>
      </header>

      <p className="mt-3 text-sm leading-7 text-mute md:text-base">{r.text}</p>

      <ul className="mt-3 flex flex-wrap gap-2">
        {r.tags.map((t) => (
          <li
            key={t.label}
            className="flex items-center gap-1.5 rounded-full bg-bg px-3 py-1 text-xs text-ink md:text-sm"
          >
            {t.type === "pos" ? (
              <FaPlus className="text-good" aria-label="إيجابي" />
            ) : (
              <FaMinus className="text-accent" aria-label="سلبي" />
            )}
            {t.label}
          </li>
        ))}
      </ul>
    </article>
  );
}
