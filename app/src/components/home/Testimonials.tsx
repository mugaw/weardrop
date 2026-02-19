import React from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Verified Buyer',
    content: 'The quality of the materials is absolutely outstanding. I\'ve never felt such luxury in everyday wear. Truly a transformative brand.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
  },
  {
    id: 2,
    name: 'James Reynolds',
    role: 'Fashion Editor',
    content: 'NOIR ATELIER has redefined minimalism. The attention to detail in the stitching and fit is comparable to high-end luxury houses.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Designer',
    content: 'Finally, a brand that understands the balance between comfort and style. These pieces have become staples in my wardrobe.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
  }
];

export function Testimonials() {
  return (
    <section className="section-y section-padding bg-[var(--noir-cream)]">
      <SectionTitle 
        title="What Our Clients Say" 
        subtitle="Testimonials"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex gap-1 text-yellow-400 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FiStar key={i} fill="currentColor" size={18} />
              ))}
            </div>
            
            <p className="text-[var(--noir-gray)] italic mb-8 leading-relaxed">
              "{testimonial.content}"
            </p>
            
            <div className="flex items-center gap-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-sm">{testimonial.name}</h4>
                <p className="text-xs text-[var(--noir-gray)] tracking-wider uppercase">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
