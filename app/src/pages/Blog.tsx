import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import { blogPosts } from '@/data/products';
import { SectionTitle } from '@/components/common/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

export function Blog() {
  const postsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: postsRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Featured post (first one)
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="section-padding py-12 border-b border-[var(--noir-border)]">
        <SectionTitle 
          title="The Journal" 
          subtitle="Stories & Insights"
        />
        <p className="text-center text-[var(--noir-gray)] max-w-2xl mx-auto mt-4">
          Explore our world of fashion, craftsmanship, and style inspiration. 
          Discover the stories behind our collections and the art of refined dressing.
        </p>
      </div>

      {/* Featured Post */}
      <section className="section-padding section-y">
        <Link 
          to={`/blog/${featuredPost.id}`}
          className="group block"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/3] overflow-hidden bg-[var(--noir-light-gray)]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="lg:pl-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--noir-gray)]">
                  {featuredPost.category}
                </span>
                <span className="text-[var(--noir-border)]">|</span>
                <span className="flex items-center gap-1 text-sm text-[var(--noir-gray)]">
                  <FiClock size={14} />
                  {featuredPost.readTime}
                </span>
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-[var(--noir-gray)] transition-colors">
                {featuredPost.title}
              </h2>
              
              <p className="text-[var(--noir-gray)] leading-relaxed mb-6">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{featuredPost.author}</span>
                <span className="text-[var(--noir-border)]">|</span>
                <span className="text-sm text-[var(--noir-gray)]">
                  {new Date(featuredPost.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              <span className="inline-flex items-center gap-2 mt-6 text-sm font-medium tracking-wider uppercase group-hover:text-[var(--noir-gray)] transition-colors">
                Read Article <FiArrowRight size={16} />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* All Posts */}
      <section ref={postsRef} className="section-padding section-y border-t border-[var(--noir-border)]">
        <h2 className="font-display text-2xl md:text-3xl mb-8">More Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="blog-card group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[var(--noir-light-gray)] mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs tracking-[0.15em] uppercase text-[var(--noir-gray)]">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--noir-gray)]">
                  <FiClock size={12} />
                  {post.readTime}
                </span>
              </div>
              
              <h3 className="font-display text-xl mb-2 group-hover:text-[var(--noir-gray)] transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-sm text-[var(--noir-gray)] line-clamp-2 mb-3">
                {post.excerpt}
              </p>
              
              <span className="text-xs text-[var(--noir-gray)]">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding section-y bg-[var(--noir-cream)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl mb-4">
            Never Miss a Story
          </h2>
          <p className="text-[var(--noir-gray)] mb-6">
            Subscribe to our newsletter for the latest articles, style tips, 
            and exclusive updates delivered to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-[var(--noir-border)] bg-white focus:outline-none focus:border-[var(--noir-black)] transition-colors"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Blog;
