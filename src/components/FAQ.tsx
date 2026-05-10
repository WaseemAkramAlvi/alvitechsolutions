import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How does the order process work?',
    answer: 'Click Order Now, fill out the popup form, and share your project goals. We review the details and contact you with the next steps.',
  },
  {
    question: 'Can I request a custom website and branding package?',
    answer: 'Yes. You can combine website design, branding, UI/UX, and other services in one request so we can scope the work properly.',
  },
  {
    question: 'Do you work with mobile-first and responsive designs?',
    answer: 'Every project is built to be responsive and touch-friendly, with layouts optimized for desktop, tablet, and mobile users.',
  },
  {
    question: 'What if I do not know my budget yet?',
    answer: 'Pick the closest budget range in the form and add your notes. We can refine the scope with you after the initial consultation.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600">
            Quick answers to the most common project and order questions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-bold text-slate-900">{faq.question}</span>
                  <ChevronDown className={`shrink-0 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} size={22} aria-hidden="true" />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-sm md:text-base leading-relaxed text-slate-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;