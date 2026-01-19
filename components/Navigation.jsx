'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const links = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/events", label: "Events",isRoute:true },
  { href: "/#schedule", label: "Schedule" },
  { href: "/sponsors", label: "Allies", isRoute: true },
  { href: "/crew", label: "Crew", isRoute: true },
  { href: "/merch", label: "Merch", isRoute: true },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact", isRoute: true },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const listener = () => {
      setScrolled(window.scrollY > 40)
    }
    listener()
    window.addEventListener("scroll", listener)
    return () => window.removeEventListener("scroll", listener)
  }, [])

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener("hashchange", close)
    return () => window.removeEventListener("hashchange", close)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-black/70 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-sm uppercase tracking-[0.6em] text-red-200 hover:text-white relative z-50">
          ABHISARGA'26
        </Link>

        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.4em] md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/70 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-white relative z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center overscroll-contain touch-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-8 text-center">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-2xl text-white/80 hover:text-white uppercase tracking-[0.3em] font-light" 
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
