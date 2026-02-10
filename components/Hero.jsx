'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'
import Navbar from './Navbar'

const Hero = () => {
  const heroRef = useRef(null)
  const revealRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const reveal = revealRef.current

    let mouseX = 0
    let mouseY = 0
    let x = 0
    let y = 0
    let visible = false

    const animate = () => {
      x += (mouseX - x) * 0.05
      y += (mouseY - y) * 0.05

      reveal.style.setProperty('--x', `${x}px`)
      reveal.style.setProperty('--y', `${y}px`)

      requestAnimationFrame(animate)
    }

    animate()

    const move = (e) => {
      const rect = hero.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top

      if (!visible) {
        visible = true
        reveal.classList.add('active')
      }
    }

    const leave = () => {
      visible = false
      reveal.classList.remove('active')
    }

    hero.addEventListener('mousemove', move)
    hero.addEventListener('mouseleave', leave)

    return () => {
      hero.removeEventListener('mousemove', move)
      hero.removeEventListener('mouseleave', leave)
    }
  }, [])

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 12 } },
  }

  const navbarVariant = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } },
  }

  return (
    <div className="hero" ref={heroRef}>
      {/* <motion.div variants={navbarVariant} initial="hidden" animate="visible">
        <Navbar />
      </motion.div> */}

      <motion.div className="hero-content" variants={container} initial="hidden" animate="visible">
        <motion.div className="left" variants={item}>
          <h1 className="st-title red-title">Abhisarga</h1>
          <motion.p className="st-text" variants={item}>
            Abhisarga is IIIT Sri City's annual techno-cultural fest.
            It combines technology, culture, and entertainment, creating a vibrant platform for talent and innovation.
          </motion.p>
          <motion.div className="st-text experience-section" variants={item}>
            <strong>Experience:</strong>
            <p>Dazzling dance competitions</p>
            <p>Proshows and DJ nights</p>
            <p>Technical challenges</p>
            <p>Cultural performances</p>
            <p>And much more</p>
          </motion.div>
          <motion.p className="st-text" variants={item}>
            Celebrate creativity and innovation at Abhisarga this March.
          </motion.p>
        </motion.div>

        <motion.div className="right" variants={item}>
          <h1 className="st-title red-title">IIIT Sri City</h1>
          <motion.p className="st-desc" variants={item}>
            IIIT Sri City, established in 2013, is one of India's premier institutions for Information Technology education, research, and innovation.
            With state-of-the-art infrastructure and a vibrant campus culture, it nurtures future leaders in technology.
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="fire-reveal" ref={revealRef}></div>
    </div>
  )
}

export default Hero
