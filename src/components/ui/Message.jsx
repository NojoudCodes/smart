export default function Message({ title, action }) {
  return (
    <div className="mt-5 rounded-2xl bg-card p-8 text-center text-ink md:mt-7 md:rounded-3xl">
      <p className="font-bold">{title}</p>
      {action}
    </div>
  );
}
