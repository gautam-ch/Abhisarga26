'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const faqData = [
  {
    question: "What should I do after completing registration?",
    answer: "After registering, you will receive a confirmation email. Follow our updates on social media and email to stay informed."
  },
  {
    question: "Who can participate in Abhisarga 2026?",
    answer: "Students from IIIT Sri City and other colleges can participate. Some events may have specific eligibility criteria mentioned on the event pages."
  },
  {
    question: "Can I register for multiple events?",
    answer: "Yes, you can register for multiple events as long as the schedules do not overlap."
  },
  {
    question: "How will I know if my registration is confirmed?",
    answer: "You will receive a confirmation email after successful registration."
  },
  {
    question: "Is there a registration fee?",
    answer: "Some events may have nominal registration fee. Details can be found on the event-specific pages."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative px-4 py-32">
      <div className="absolute inset-0 bg-linear-to-b from-black via-red-500/5 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.6em] text-red-200">Knowledge</p>
          <h2 className="mt-4 text-5xl">Frequently Asked Questions</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm uppercase tracking-[0.3em] text-white/60">
            Answers to common queries
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-white/10 bg-black/20 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, borderColor: "rgba(255, 37, 70, 0.3)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: index * 0.1,
                hover: { duration: 0.2, ease: "easeOut" }
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-300"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <motion.span
                  className="text-red-400 text-xl ml-4 flex-shrink-0"
                  animate={{
                    rotate: openIndex === index ? 45 : 0,
                    scale: openIndex === index ? 1.1 : 1
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      opacity: { duration: 0.2 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <motion.p
                        className="text-white/80 leading-relaxed"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}