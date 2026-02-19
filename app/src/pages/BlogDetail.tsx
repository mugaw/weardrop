import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { FiArrowLeft, FiClock, FiShare2, FiTwitter, FiFacebook, FiLinkedin } from 'react-icons/fi';
import { blogPosts } from '@/data/products';

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const post = blogPosts.find(p => p.id === id);

  // Get related posts
  const relatedPosts = blogPosts
    .filter(p => p.id !== id && p.category === post?.category)
    .slice(0, 2);

  useEffect(() => {
    if (contentRef.current && imageRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
        );

        tl.fromTo(
          contentRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.5'
        );
      });

      return () => ctx.revert();
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header Image */}
      <div 
        ref={imageRef}
        className="relative h-[50vh] min-h-[400px] overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Back Button */}
        <Link
          to="/blog"
          className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-white/80 transition-colors z-10"
        >
          <FiArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Journal</span>
        </Link>
      </div>

      {/* Article Content */}
      <article className="section-padding py-12">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto"
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--noir-gray)]">
              {post.category}
            </span>
            <span className="text-[var(--noir-border)]">|</span>
            <span className="flex items-center gap-1 text-sm text-[var(--noir-gray)]">
              <FiClock size={14} />
              {post.readTime}
            </span>
            <span className="text-[var(--noir-border)]">|</span>
            <span className="text-sm text-[var(--noir-gray)]">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[var(--noir-border)]">
            <div className="w-12 h-12 rounded-full bg-[var(--noir-light-gray)] flex items-center justify-center">
              <span className="font-medium text-lg">{post.author.charAt(0)}</span>
            </div>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-[var(--noir-gray)]">NOIR ATELIER Team</p>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-medium prose-p:text-[var(--noir-gray)] prose-p:leading-relaxed prose-a:text-[var(--noir-black)] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-[var(--noir-border)]">
            <p className="text-sm text-[var(--noir-gray)] mb-4">Share this article</p>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center border border-[var(--noir-border)] hover:border-[var(--noir-black)] transition-colors">
                <FiTwitter size={18} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-[var(--noir-border)] hover:border-[var(--noir-black)] transition-colors">
                <FiFacebook size={18} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-[var(--noir-border)] hover:border-[var(--noir-black)] transition-colors">
                <FiLinkedin size={18} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-[var(--noir-border)] hover:border-[var(--noir-black)] transition-colors">
                <FiShare2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding section-y border-t border-[var(--noir-border)]">
          <h2 className="font-display text-2xl mb-8">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                className="group flex gap-6"
              >
                <div className="w-32 h-24 flex-shrink-0 overflow-hidden bg-[var(--noir-light-gray)]">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div>
                  <span className="text-xs tracking-[0.15em] uppercase text-[var(--noir-gray)]">
                    {relatedPost.category}
                  </span>
                  <h3 className="font-display text-lg mt-1 group-hover:text-[var(--noir-gray)] transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <span className="text-xs text-[var(--noir-gray)] mt-2 block">
                    {new Date(relatedPost.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default BlogDetail;
