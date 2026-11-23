import { useCallback, useEffect, useState } from "react";

const USE_MOCK = true;
const API_BASE = "/api";

const MOCK = {
  summary:
    "رضا مرتفع عن جودة الطعام والأسعار، مع ملاحظات متكررة حول الانتظار والازدحام.",
  satisfaction: 92,
  reviewsCount: 1400,
  trend: "up", // up | down | flat
  praised: [
    { label: "جودة الطعام", count: 320 },
    { label: "الأسعار", count: 210 },
    { label: "نظافة المكان", count: 150 },
    { label: "تعامل الموظفين", count: 120 },
  ],
  complaints: [
    { label: "وقت الانتظار", count: 140 },
    { label: "الازدحام", count: 95 },
    { label: "قلة المواقف", count: 60 },
    { label: "تأخر الطلبات", count: 48 },
  ],
  series: [
    { date: "2026-10-23", value: 46 },
    { date: "2026-10-26", value: 60 },
    { date: "2026-10-29", value: 52 },
    { date: "2026-11-01", value: 72 },
    { date: "2026-11-05", value: 58 },
    { date: "2026-11-10", value: 86 },
    { date: "2026-11-15", value: 80 },
    { date: "2026-11-21", value: 100 },
  ],
};

function normalize(raw) {
  return {
    summary: raw.summary ?? "",
    satisfaction: raw.satisfaction ?? 0,
    reviewsCount: raw.reviewsCount ?? 0,
    trend: raw.trend ?? "flat",
    praised: raw.praised ?? [],
    complaints: raw.complaints ?? [],
    series: raw.series ?? [],
  };
}

export default function useInsights(placeId) {
  const [result, setResult] = useState({
    key: null,
    data: null,
    status: "loading",
  });
  const [tick, setTick] = useState(0);
  const refetch = useCallback(() => setTick((t) => t + 1), []);

  const key = `${placeId}:${tick}`;

  useEffect(() => {
    const ctrl = new AbortController();

    const load = USE_MOCK
      ? new Promise((res) => setTimeout(() => res(MOCK), 400))
      : fetch(`${API_BASE}/places/${placeId}/insights`, {
          signal: ctrl.signal,
        }).then((r) =>
          r.ok ? r.json() : Promise.reject(new Error(String(r.status))),
        );

    load
      .then((raw) => {
        if (!ctrl.signal.aborted)
          setResult({ key, data: normalize(raw), status: "ready" });
      })
      .catch((e) => {
        if (!ctrl.signal.aborted && e.name !== "AbortError")
          setResult({ key, data: null, status: "error" });
      });

    return () => ctrl.abort();
  }, [key, placeId]);

  const isCurrent = result.key === key;
  return {
    data: isCurrent ? result.data : null,
    status: isCurrent ? result.status : "loading",
    refetch,
  };
}
