'use client'

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { useState } from "react"
import ContactCardsSection from "./ContactCardsSection"
import { Send } from "lucide-react"

const CinematicGlobe = dynamic(() => import("./CinematicGlobe"), { ssr: false })

export default function Contact() {
  return (
    <>
      {/* First Section - Hero and Contact Cards */}
      <div className="relative min-h-screen text-white overflow-x-hidden">
        {/* Dramatic Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/cnt2.jpeg)' }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Additional red/orange gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-red-950/40 via-transparent to-black/80" />
        </div>

        {/* Atmospheric effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,#dc2626_0%,transparent_40%)] opacity-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,#ea580c_0%,transparent_40%)] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 px-4 py-20 md:py-32">
          {/* Guild Hall Hero */}
          <motion.div
            className="text-center mb-10 md:mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="mt-10 md:mt-20 text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-red-200 via-orange-300 to-red-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              The Adventurer's Guild
            </motion.h1>
            
            <motion.p
              className="mb-10 md:mb-20 text-base md:text-2xl text-red-100/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Seek guidance from our experienced guild members and plan your journey to Abhisarga'26
            </motion.p>
          </motion.div>

          {/* Contact Our Wizards Section */}
          <motion.div
            className="mb-10 md:mb-20 mt-20 md:mt-40 lg:mt-60 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ContactCardsSection />
          </motion.div>
        </div>
      </div>

      {/* Cinematic 3D Globe Section - Full width for scroll-triggered animation - Only on large screens */}
      <div className="hidden lg:block">
        <CinematicGlobe />
      </div>

      {/* Raven Messenger Section */}
      <div className="relative text-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 px-4 py-32">
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-red-200 mb-4 drop-shadow-lg">Send a Raven</h2>
              <p className="text-red-100/70 text-lg">Dispatch a message to the guild</p>
            </div>

            <div className="max-w-2xl mx-auto bg-stone-950/70 backdrop-blur-sm border border-red-900/30 rounded-2xl p-8 shadow-2xl">
              <RavenMessenger />
            </div>
          </motion.section>
        </div>
      </div>
    </>
  )
}

// Raven Messenger Component
function RavenMessenger() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    urgency: "normal"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", message: "", urgency: "normal" })
    }, 3000)
  }

  if (submitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ x: [0, 100, 200, 300], y: [0, -20, -40, -60] }}
          transition={{ duration: 2 }}
        >
          🐦‍⬛
        </motion.div>
        <h3 className="text-2xl font-bold text-amber-200 mb-2">Raven Dispatched!</h3>
        <p className="text-amber-100/80">Your message is on its way to the guild</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-red-200 font-semibold mb-2">Your name, traveler:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 bg-stone-900/50 border border-red-900/40 rounded-lg text-white placeholder-red-300/40 focus:border-red-600 focus:outline-none backdrop-blur-sm"
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label className="block text-red-200 font-semibold mb-2">Message contents:</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows={4}
          className="w-full px-4 py-3 bg-stone-900/50 border border-red-900/40 rounded-lg text-white placeholder-red-300/40 focus:border-red-600 focus:outline-none resize-none backdrop-blur-sm"
          placeholder="Write your message to the guild..."
          required
        />
      </div>

      <div>
        <label className="block text-red-200 font-semibold mb-2">Urgency level:</label>
        <select
          value={formData.urgency}
          onChange={(e) => setFormData({...formData, urgency: e.target.value})}
          className="w-full px-4 py-3 bg-stone-900/50 border border-red-900/40 rounded-lg text-white focus:border-red-600 focus:outline-none backdrop-blur-sm"
        >
          <option value="low">Low - Standard raven</option>
          <option value="normal">Normal - Swift raven</option>
          <option value="high">High - Express raven</option>
          <option value="urgent">Urgent - Dragon courier</option>
        </select>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-red-700 hover:bg-red-600 disabled:bg-red-900 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-3 shadow-lg shadow-red-900/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Preparing Raven...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Dispatch Raven
          </>
        )}
      </motion.button>
    </form>
  )
}