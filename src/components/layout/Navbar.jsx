import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router"
import { GoNorthStar } from "react-icons/go"
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5"
import { HiMenuAlt3, HiX } from "react-icons/hi"
import useTheme from "../../hooks/useTheme"

const NAVBAR = [
  { navTitle: 'الرئيسية', navUrl: '/' },
  { navTitle: 'البحث', navUrl: '/search' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <nav className="relative bg-bg text-ink border-b border-line">
      <div className="flex justify-between items-center px-5 md:px-15 py-5">
        <div className="flex items-center gap-10">
          <button
            className="md:hidden cursor-pointer text-ink"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isOpen}
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>

          <div className="flex items-center gap-1">
            <GoNorthStar size={20} className="text-accent" />
            <Link to="/" className="font-bold text-xl">ملخص ذكي</Link>
          </div>

          <div className="hidden md:flex gap-4">
            {NAVBAR.map(navbar => (
              <Link
                key={navbar.navTitle}
                to={navbar.navUrl}
                className={`text-mute hover:text-accent hover:border-b hover:border-b-accent ${
                  pathname === navbar.navUrl ? "!text-accent border-b border-b-accent" : ""
                }`}
              >
                {navbar.navTitle}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}
            className="flex justify-center items-center rounded-full bg-line text-ink h-8 w-8 cursor-pointer"
          >
            {theme === "dark" ? <IoSunnyOutline size={15} /> : <IoMoonOutline size={15} />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`md:hidden absolute top-full inset-x-0 z-50 bg-card border-b border-line
          transition-all duration-200 origin-top ${
            isOpen
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
          }`}
      >
        <div className="flex flex-col px-5 py-3">
          {NAVBAR.map(navbar => (
            <Link
              key={navbar.navTitle}
              to={navbar.navUrl}
              className={`py-3 border-b border-line last:border-b-0 hover:text-accent ${
                pathname === navbar.navUrl ? "text-accent font-bold" : "text-ink"
              }`}
            >
              {navbar.navTitle}
            </Link>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 top-18.25 bg-black/30 dark:bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  )
}