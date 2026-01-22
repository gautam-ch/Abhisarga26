'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const links = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/events", label: "Events", isRoute: true },
  { href: "/#schedule", label: "Schedule" },
  { href: "/sponsors", label: "Allies", isRoute: true },
  { href: "/crew", label: "Crew", isRoute: true },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact", isRoute: true },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", listener)
    return () => window.removeEventListener("scroll", listener)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-black/80 border-b border-white/10" : "bg-transparent"
      }`}
    >
      
      <div className="w-full flex items-center justify-between px-6 md:px-12 py-3">
        
       
        <Link href="/" className="flex items-center relative z-50">
          <img 
            src="/nav/birdlogo.png" 
            alt="Bird Logo" 
            className="h-10 md:h-22 w-auto object-contain -mr-3 md:-mr-13" 
          />
          <img 
            src="/nav/logo.png" 
            alt="Abhisarga Logo" 
            className="h-10 md:h-18 w-auto object-contain" 
          />
        </Link>

       
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-[10px] lg:text-[15px] uppercase tracking-[0.3em] font-medium">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-white/80 hover:text-white transition-all hover:scale-105"
            >
              {link.label}
            </Link>
          ))}
        </nav>

       
        <button
          className="md:hidden text-white relative z-50 p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      
      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden fixed inset-0 z-40 bg-black/98 flex flex-col items-center justify-center"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col gap-8 text-center">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-2xl text-white/90 uppercase tracking-[0.4em] font-light" 
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