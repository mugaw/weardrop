import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle } from '@/components/common/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Story section animation
      gsap.fromTo(
        '.story-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );

      // Values animation
      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );

      // Team animation
      gsap.fromTo(
        '.team-member',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const values = [
    {
      title: 'Craftsmanship',
      description: 'Every garment is meticulously crafted by skilled artisans who take pride in their work, ensuring exceptional quality in every stitch.',
      icon: '✦'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to ethical practices, using responsibly sourced materials and minimizing our environmental footprint.',
      icon: '◈'
    },
    {
      title: 'Timelessness',
      description: 'Our designs transcend trends, creating pieces that remain relevant and beautiful for years to come.',
      icon: '◉'
    },
    {
      title: 'Innovation',
      description: 'While honoring tradition, we embrace innovation to enhance comfort, fit, and functionality.',
      icon: '◆'
    }
  ];

  const team = [
    {
      name: 'Isabella Laurent',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
    },
    {
      name: 'Marcus Chen',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
    },
    {
      name: 'Sophie Anderson',
      role: 'Production Manager',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80'
    },
    {
      name: 'James Morrison',
      role: 'Brand Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
            alt="NOIR ATELIER Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white section-padding">
          <span className="text-xs tracking-[0.3em] uppercase mb-4">About Us</span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            Our Story
          </h1>
          <p className="text-lg max-w-2xl text-white/80">
            A journey of passion, craftsmanship, and the pursuit of timeless elegance
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section ref={storyRef} className="section-y section-padding">
        <div className="max-w-4xl mx-auto">
          <SectionTitle 
            title="The Art of Refinement" 
            subtitle="Our Philosophy"
            className="mb-12"
          />
          
          <div className="story-content space-y-6 text-lg leading-relaxed text-[var(--noir-gray)]">
            <p>
              Founded in 2018, NOIR ATELIER emerged from a simple yet profound belief: 
              that true luxury lies in the details. In an era of fast fashion and disposable 
              trends, we set out to create something different—garments that tell a story, 
              pieces that become cherished companions in life's journey.
            </p>
            
            <p>
              Our name, NOIR ATELIER, pays homage to the ateliers of old—workshops where 
              master craftspeople dedicated their lives to perfecting their art. The word 
              "noir" represents our appreciation for the elegant simplicity of black, the 
              color that has defined sophistication for centuries.
            </p>
            
            <p>
              Every piece in our collection is designed in our New York studio and crafted 
              in partnership with family-owned ateliers across Italy, Portugal, and Japan. 
              We work exclusively with mills that share our commitment to quality and 
              sustainability, sourcing the finest natural fibers and materials.
            </p>
            
            <p>
              Our design philosophy is rooted in minimalism and functionality. We believe 
              that the best designs are those that don't demand attention but command it 
              through their quiet confidence. Each garment is thoughtfully designed to be 
              versatile, comfortable, and enduring.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="section-y section-padding bg-[var(--noir-cream)]">
        <SectionTitle 
          title="What We Stand For" 
          subtitle="Our Values"
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div 
              key={value.title}
              className="value-card bg-white p-8 text-center"
            >
              <span className="text-4xl mb-4 block">{value.icon}</span>
              <h3 className="font-display text-xl mb-3">{value.title}</h3>
              <p className="text-sm text-[var(--noir-gray)] leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="section-y section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--noir-gray)] mb-4 block">
              Our Process
            </span>
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              The Craft of Excellence
            </h2>
            <div className="space-y-4 text-[var(--noir-gray)] leading-relaxed">
              <p>
                Our journey begins with the selection of materials. We travel the world 
                to source the finest fabrics—from Mongolian cashmere to Egyptian cotton, 
                from Italian wool to Japanese silk.
              </p>
              <p>
                Each pattern is meticulously drafted and refined through multiple fittings 
                to ensure the perfect balance of comfort and silhouette. Our master 
                pattern makers bring decades of experience to every design.
              </p>
              <p>
                The construction of each garment follows time-honored techniques. From 
                hand-finished seams to carefully placed darts, every detail is considered 
                and executed with precision.
              </p>
              <p>
                Before any piece bears our label, it undergoes rigorous quality control. 
                We inspect every seam, every button, every stitch to ensure it meets our 
                exacting standards.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Craftsmanship"
                className="w-full aspect-[3/4] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"
                alt="Materials"
                className="w-full aspect-[3/4] object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="section-y section-padding bg-[var(--noir-black)] text-white">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.2em] uppercase text-white/60 mb-4 block">
            The People
          </span>
          <h2 className="font-display text-3xl md:text-4xl">Meet Our Team</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="team-member text-center">
              <div className="aspect-square mb-4 overflow-hidden bg-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-white/60">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="section-y section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '6+', label: 'Years of Excellence' },
            { number: '50K+', label: 'Happy Customers' },
            { number: '12', label: 'Countries Shipped' },
            { number: '100%', label: 'Satisfaction Guaranteed' }
          ].map((stat) => (
            <div key={stat.label}>
              <span className="font-display text-4xl md:text-5xl block mb-2">
                {stat.number}
              </span>
              <span className="text-sm text-[var(--noir-gray)]">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
