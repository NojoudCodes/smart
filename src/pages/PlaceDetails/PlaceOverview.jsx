import { useOutletContext } from "react-router";
import Gallery from "./components/Gallery";

export default function PlaceOverview() {
  const { place } = useOutletContext();

  return (
    <main className="mt-4 pb-10 lg:mt-8 lg:grid lg:grid-cols-[1fr_360px] lg:items-start lg:gap-10">
      <section>
        <p className="leading-7 md:text-lg lg:leading-8">{place.description}</p>
        <Gallery photos={place.photos} />
      </section>

      <aside className="mt-2 lg:sticky lg:top-6 lg:mt-0">
        <dl className="divide-y divide-line rounded-lg bg-card lg:rounded-2xl">
          <div className="p-4">
            <dt className="text-sm text-accent">العنوان</dt>
            <dd className="mt-3">{place.address}</dd>
          </div>
          <div className="p-4">
            <dt className="text-sm text-accent">ساعات العمل</dt>
            <dd className="mt-3">{place.hours}</dd>
          </div>
        </dl>

        <a
          href={place.mapUrl}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-brand text-base font-bold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          فتح على الخريطة
        </a>
      </aside>
    </main>
  );
}
