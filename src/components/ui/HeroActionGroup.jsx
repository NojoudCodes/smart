export default function HeroActionGroup({ icon, text }) {
  return (
    <div className="flex items-baseline gap-2 bg-card rounded-xl p-5">
      <div className="flex justify-center items-center rounded-lg bg-accent text-accent-foreground w-9 h-9">
        {icon}
      </div>
      <p className="text-lg font-semibold">
        {text}
      </p>
    </div>
  )
}