'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const links = [
  // { href: "/#hero", label: "Home" },
  // { href: "/#about", label: "About" },
  { href: "/events", label: "Events", isRoute: true },
  // { href: "/#schedule", label: "Schedule" },
  { href: "/sponsors", label: "Sponsors", isRoute: true },
  { href: "/crew", label: "Crew", isRoute: true },
  { href: "/merch", label: "Merch", isRoute: true },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact", isRoute: true },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", listener, { passive: true })
    return () => window.removeEventListener("scroll", listener)
  }, [])

  useEffect(() => {
    if (!open) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "backdrop-blur-md bg-black/70 border-b border-white/10 shadow-lg" 
          : "backdrop-blur-sm bg-black/20"
      }`}
    >
      
      <div className="w-full flex items-center justify-between px-6 md:px-12 py-2">
        
       
        <Link href="/" className="flex items-center relative z-50">
          <img 
            src="/nav/birdlogo.png" 
            alt="Bird Logo" 
            className="h-8 md:h-12 w-auto object-contain -mr-2 md:-mr-4 transition-transform duration-300 hover:scale-105" 
          />
          <img 
            src="/nav/logo.png" 
            alt="Abhisarga Logo" 
            className="h-8 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" 
          />
        </Link>

       
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[10px] lg:text-sm uppercase tracking-[0.2em] font-medium">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group pb-2"
            >
              {link.label}
              {/* Tentacle underline effect */}
              <span className="tentacle-underline" />
            </Link>
          ))}
        </nav>

       
        <button
          className="md:hidden text-white relative z-50 p-1.5 hover:bg-white/10 rounded-md transition-all duration-300"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute right-0 top-0 h-dvh w-1/2 max-w-60 bg-black/95 border-l border-white/10 px-6 pt-24 pb-10 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
            >
              <div className="flex flex-col gap-3 text-left">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base sm:text-lg text-white/90 hover:text-white uppercase tracking-[0.12em] font-light transition-all duration-300 hover:translate-x-1"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}