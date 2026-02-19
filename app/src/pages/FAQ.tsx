import React, { useState } from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: 'Ordering & Shipping',
    question: 'How long will it take to receive my order?',
    answer: 'Orders are processed within 1-2 business days. Standard shipping typically takes 3-5 business days within the US, while international shipping can take 7-14 business days depending on the destination.'
  },
  {
    category: 'Ordering & Shipping',
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location and are calculated at checkout.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all unworn items in their original condition with tags attached. Returns are free for US customers. International customers are responsible for return shipping costs.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'How do I initiate a return?',
    answer: 'To initiate a return, please visit our Returns Center and enter your order number and email address. You will receive a prepaid shipping label via email.'
  },
  {
    category: 'Product & Sizing',
    question: 'How do I find my size?',
    answer: 'We provide detailed size guides on each product page. If you create an account, you can also use our specialized "Find My Fit" tool to get personalized size recommendations based on your measurements.'
  },
  {
    category: 'Product & Sizing',
    question: 'Where are your clothes made?',
    answer: 'Our garments are ethically manufactured in Portugal and Italy, working with factories that prioritize fair labor practices and sustainable production methods.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="section-padding py-12 border-b border-[var(--noir-border)]">
        <SectionTitle 
          title="Frequently Asked Questions" 
          subtitle="Help Center"
        />
        <p className="text-center text-[var(--noir-gray)] max-w-2xl mx-auto mt-4">
          Find answers to common questions about our products, shipping, and policies.
        </p>
      </div>

      <div className="section-padding py-16 max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="border border-[var(--noir-border)] overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-[var(--noir-cream)] transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-[var(--noir-gray)] uppercase tracking-wider mb-1">
                    {faq.category}
                  </span>
                  <span className="font-medium text-lg">
                    {faq.question}
                  </span>
                </div>
                <div className="text-[var(--noir-gray)]">
                  {openIndex === index ? <FiMinus size={20} /> : <FiPlus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-6 pt-0 text-[var(--noir-gray)] leading-relaxed border-t border-transparent">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-[var(--noir-cream)] p-8 md:p-12">
          <h3 className="font-display text-2xl mb-4">Still have questions?</h3>
          <p className="text-[var(--noir-gray)] mb-8">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
