import { Link } from "react-router";

export default function ListCard({ title, items, placeId }) {
  return (
    <section className="rounded-2xl bg-card p-4 md:rounded-3xl md:p-7">
      <h3 className="text-base font-bold text-ink md:text-lg">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-mute">لا توجد بيانات</p>
      ) : (
        <ul className="mt-3 md:mt-4">
          {items.map(({ label, count }) => (
            <li
              key={label}
              className="border-t border-line max-md:dark:border-brand-lavender"
            >
              <Link
                to={`/place/${placeId}/reviews?topic=${encodeURIComponent(label)}`}
                className="flex items-center gap-2 py-2.5 text-sm text-mute transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent md:py-3.5 md:text-base"
              >
                <span className="size-1.5 shrink-0 bg-accent" />
                {label}
                {count != null && (
                  <span className="ms-auto text-xs md:text-sm">{count}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
