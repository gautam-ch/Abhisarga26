'use client'

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Copy, Check } from "lucide-react"

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Team data - MTG/D&D card style with color themes and character images
const contacts = [
  {
    name: "Aditya Palapati",
    role: "Chair",
    email: "secretary.sdc@iiits.in",
    color: "#0891b2", // Cyan/Teal
    character: "https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/units/human-magi/white-mage.png",
  },
  {
    name: "Co-Chair 1",
    role: "Co-Chair",
    email: "cochair1.p23@iiits.in",
    color: "#f59e0b", // Amber/Gold
    character: "https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/units/human-magi/arch-mage.png",
  },
  {
    name: "Co-Chair 2",
    role: "Co-Chair",
    email: "cochair2.p23@iiits.in",
    color: "#10b981", // Green
    character: "https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/units/human-loyalists/fencer.png",
  },
  {
    name: "SLC President",
    role: "SLC President",
    email: "president.slc@iiits.in",
    color: "#dc2626", // Red
    character: "https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/units/human-loyalists/royalguard.png",
  },
  {
    name: "John Michael",
    role: "SDC President",
    email: "president.sdc@iiits.in",
    color: "#7c3aed", // Purple
    character: "https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/units/human-loyalists/lieutenant.png",
  },
  {
    name: "Siddharth Singh",
    role: "Sponsorship Lead",
    email: "abhisarga.sponsorship@iiits.in",
    color: "#ea580c", // Orange
    character: "https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/units/human-loyalists/longbowman.png",
  }
]

// Card dimensions - Larger cards for better visibility
const CARD_W = 220
const CARD_H = 280
const CARD_GAP_X = 280 // Reduced horizontal gap for iPad Pro
const CARD_GAP_Y = 320 // Vertical gap

export default function ContactCardsSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const [copiedEmail, setCopiedEmail] = useState(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Dynamic card gap calculation for responsive layout
  const getResponsiveCardGap = () => {
    // iPad Pro 12.9" is 1024px width
    // iPad Pro 11" is 834px width
    if (windowWidth >= 1440) {
      return { x: 350, y: 320 } // Large desktop
    } else if (windowWidth >= 1200) {
      return { x: 300, y: 320 } // Desktop
    } else if (windowWidth >= 1024) {
      return { x: 250, y: 300 } // iPad Pro 12.9"
    } else if (windowWidth >= 834) {
      return { x: 220, y: 280 } // iPad Pro 11"
    } else {
      return { x: 280, y: 320 } // Default tablet
    }
  }

  const handleCopy = (email, e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  useEffect(() => {
    // Ensure GSAP is available
    if (typeof window === 'undefined') return

    const cards = cardsRef.current.filter(Boolean)
    if (cards.length === 0) return

    // Set initial state - extremely small and deep
    cards.forEach((card) => {
      gsap.set(card, {
        scale: 0.1, // Start extremely small (0.1x)
        z: -900,    // Much deeper in background
        y: 200,     // Start lower
        opacity: 0,
        filter: 'blur(30px)', // Heavier blur
        transformOrigin: 'center center',
        visibility: 'visible',
        rotationX: 45 // Steep tilt
      })
    })

    // Create timeline for dramatic emergence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',       // Start LATE
        end: 'bottom 90%',      // End much later (when bottom of section is near viewport bottom)
        scrub: 5,               // High scrub for heavy/slow feel
        pin: false
      }
    })

    // Animation: Cards rise up, scale up, and untilt
    cards.forEach((card) => {
      tl.to(card, {
        scale: 1,
        z: 0,
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        rotationX: 0,
        duration: 3,              
        ease: 'power2.out'        
      }, 0)
    })

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // 3x3 Grid Layout Calculation
  const getCardPosition = (index) => {
    const gaps = getResponsiveCardGap()
    const row = Math.floor(index / 3) // 0 or 1
    const col = index % 3            // 0, 1, 2
    
    // Center the grid
    // Rows: 2 rows total. Center is 0.5. Offsets: -0.5, 0.5
    // Cols: 3 cols total. Center is 1. Offsets: -1, 0, 1
    
    const x = (col - 1) * gaps.x
    const y = (row - 0.5) * gaps.y
    
    return { x, y }
  }

  // --- Mobile Card Render Helper ---
  const MobileCard = ({ contact }) => (
    <div className="w-full max-w-[280px] mx-auto bg-[#171314] rounded-[14px] p-2 shadow-2xl border border-[#2d2a2b] transition-transform hover:scale-105 duration-300">
      <div className="w-full h-full relative overflow-hidden flex flex-col bg-[#1a1517] rounded-[10px] border-2 border-[#2d2a2b]">
        {/* TOP BAR */}
        <div className="relative mx-1.5 mt-1.5 px-2 py-2 flex items-center justify-center shrink-0 bg-linear-to-b from-[#d4c8b8] via-[#c4b8a4] to-[#b8a890] border border-[#2d2a2b] border-b-0 rounded-t-[4px]">
          <span className="text-sm font-extrabold tracking-wide text-[#1a1517] font-serif uppercase text-center">{contact.name}</span>
        </div>
        
        {/* ART BOX */}
        <div className="relative mx-1.5 border-2 border-[#2d2a2b] bg-gray-900 overflow-hidden shrink-0 h-[140px]" style={{ background: contact.color }}>
          <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/40" />
          <img src={contact.character} alt={contact.name} className="absolute inset-0 w-full h-full object-contain p-2 image-pixelated drop-shadow-md" />
        </div>

        {/* TYPE LINE */}
        <div className="relative mx-1.5 px-2 py-1.5 shrink-0 z-10 flex justify-center items-center bg-linear-to-b from-[#d4c8b8] via-[#c4b8a4] to-[#b8a890] border border-[#2d2a2b] border-t-0 shadow-sm">
          <span className="text-[10px] font-bold text-[#1a1517] font-serif uppercase tracking-wider text-center">{contact.role}</span>
        </div>

        {/* TEXT BOX */}
        <div className="relative mx-1.5 mt-0.5 mb-1.5 p-2 flex flex-col justify-center items-center bg-linear-to-b from-[#e8dfd0] to-[#d8cfc0] border-2 border-[#2d2a2b] rounded-b-[4px] min-h-[50px]">
          <button onClick={(e) => handleCopy(contact.email, e)} className="group/btn flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1517]/5 hover:bg-[#1a1517]/10 border border-[#1a1517]/10 transition-all w-full justify-center">
            <span className="text-[10px] text-[#1a1517] font-serif font-bold tracking-wide truncate">{contact.email}</span>
            {copiedEmail === contact.email ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-[#1a1517]/60 group-hover/btn:text-[#1a1517]" />}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <section ref={sectionRef} className="relative py-20 min-h-screen w-full overflow-hidden flex flex-col justify-center">
      {/* Background removed to be transparent */}

      {/* Header - MTG Style */}
      <div className="text-center mb-12 md:mb-24 relative z-10">
        <h2 
          className="text-3xl md:text-5xl font-bold mb-3 tracking-wide"
          style={{
            color: "#d4c8b8",
            textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0 40px rgba(212,200,184,0.2)",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          THE GUILD
        </h2>
        <p 
          className="text-xs md:text-sm tracking-widest uppercase"
          style={{ 
            color: "#8a8580",
            fontFamily: "Georgia, serif",
            letterSpacing: "0.3em"
          }}
        >
          Legendary Creatures — Leadership
        </p>
      </div>

      {/* MOBILE GRID LAYOUT (Visible on small screens) */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 w-full max-w-2xl mx-auto z-10">
        {contacts.map((contact, index) => (
          <MobileCard key={contact.email} contact={contact} />
        ))}
      </div>

      {/* DESKTOP 3D LAYOUT (Hidden on small screens) */}
      <div 
        className="hidden md:flex relative w-full items-center justify-center overflow-x-hidden px-4"
        style={{ 
          perspective: "1200px", // Lower perspective for more dramatic 3D
          perspectiveOrigin: "center center",
          zIndex: 10,
          minHeight: "800px",
          maxWidth: "100vw",
        }}
      >
        {contacts.map((contact, index) => {
          const pos = getCardPosition(index)
          
          return (
            <div
              key={contact.email}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute cursor-pointer"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: '50%',
                top: '50%',
                marginLeft: pos.x - CARD_W / 2,
                marginTop: pos.y - CARD_H / 2,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity, filter",
                // Removed visibility: hidden to prevent cards disappearing if JS fails
              }}
            >
              {/* ================================================== */}
              {/* MTG / D&D CARD - Large Size                        */}
              {/* ================================================== */}
              <div 
                className="w-full h-full relative overflow-hidden select-none group"
                style={{
                  background: "#171314",
                  borderRadius: "14px",
                  padding: "8px",
                  boxShadow: `
                    0 25px 50px -12px rgba(0,0,0,0.9),
                    0 0 0 1px rgba(255,255,255,0.08)
                  `,
                  fontSize: '1em'
                }}
              >
                {/* Inner card frame */}
                <div 
                  className="w-full h-full relative overflow-hidden flex flex-col"
                  style={{
                    background: "#1a1517",
                    borderRadius: "10px",
                    border: "2px solid #2d2a2b",
                  }}
                >
                  {/* === TOP BAR === */}
                  <div 
                    className="relative mx-1.5 mt-1.5 px-2 py-2 flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(180deg, #d4c8b8 0%, #c4b8a4 50%, #b8a890 100%)",
                      borderRadius: "4px 4px 0 0",
                      border: "1px solid #2d2a2b",
                      borderBottom: "none",
                    }}
                  >
                    <span className="text-base font-extrabold tracking-wide text-[#1a1517] font-serif uppercase text-center">
                      {contact.name}
                    </span>
                  </div>

                  {/* === ART BOX === */}
                  <div 
                    className="relative mx-1.5 border-2 border-[#2d2a2b] bg-gray-900 overflow-hidden shrink-0"
                    style={{
                      background: contact.color,
                      height: "120px"
                    }}
                  >
                    <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/40" />
                    <img 
                      src={contact.character}
                      alt={contact.name}
                      className="absolute inset-0 w-full h-full object-contain p-2"
                      style={{
                        imageRendering: "pixelated", 
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
                      }}
                    />
                  </div>

                  {/* === TYPE LINE === */}
                  <div 
                    className="relative mx-1.5 px-2 py-1.5 shrink-0 z-10 flex justify-center items-center"
                    style={{
                      background: "linear-gradient(180deg, #d4c8b8 0%, #c4b8a4 50%, #b8a890 100%)",
                      border: "1px solid #2d2a2b",
                      borderTop: "none",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                    }}
                  >
                    <span className="text-xs font-bold text-[#1a1517] font-serif uppercase tracking-wider text-center">
                      {contact.role}
                    </span>
                  </div>

                  {/* === TEXT BOX === */}
                  <div 
                    className="relative mx-1.5 mt-0.5 p-2 grow flex flex-col justify-center items-center"
                    style={{
                      background: "linear-gradient(180deg, #e8dfd0 0%, #d8cfc0 100%)",
                      border: "2px solid #2d2a2b",
                      borderRadius: "0 0 4px 4px",
                      minHeight: "50px"
                    }}
                  >
                    <button 
                      onClick={(e) => handleCopy(contact.email, e)}
                      className="group/btn flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1517]/5 hover:bg-[#1a1517]/10 border border-[#1a1517]/10 hover:border-[#1a1517]/20 transition-all w-full justify-center"
                    >
                      <span className="text-xs text-[#1a1517] font-serif font-bold tracking-wide truncate">
                        {contact.email}
                      </span>
                      {copiedEmail === contact.email ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[#1a1517]/60 group-hover/btn:text-[#1a1517]" />
                      )}
                    </button>
                  </div>


                </div>
              </div>              {/* Card shadow for depth */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-12 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.8), transparent)",
                  filter: "blur(20px)",
                  zIndex: -1,
                  opacity: 0,
                  transform: 'translateY(40px) scale(0.8)'
                }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
