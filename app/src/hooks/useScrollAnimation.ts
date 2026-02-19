import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  animationCallback: (element: T, gsapInstance: typeof gsap) => gsap.core.Timeline | gsap.core.Tween | void,
  options: ScrollAnimationOptions = {}
) {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      start = 'top 85%',
      end = 'bottom 20%',
      scrub = false,
      markers = false,
      toggleActions = 'play none none none',
      once = true
    } = options;

    const ctx = gsap.context(() => {
      const animation = animationCallback(element, gsap);
      if (animation) {
        animationRef.current = animation;
        
        ScrollTrigger.create({
          trigger: element,
          start,
          end,
          scrub,
          markers,
          toggleActions,
          animation,
          once
        });
      }
    }, element);

    return () => {
      ctx.revert();
    };
  }, [animationCallback, options]);

  return elementRef;
}

export function useFadeInUp<T extends HTMLElement>(delay: number = 0) {
  return useScrollAnimation<T>(
    (element, gsap) => {
      return gsap.fromTo(
        element,
        { 
          opacity: 0, 
          y: 40 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay,
          ease: 'power2.out'
        }
      );
    },
    { once: true }
  );
}

export function useStaggerChildren<T extends HTMLElement>(
  childSelector: string,
  staggerDelay: number = 0.1
) {
  return useScrollAnimation<T>(
    (element, gsap) => {
      const children = element.querySelectorAll(childSelector);
      return gsap.fromTo(
        children,
        { 
          opacity: 0, 
          y: 30 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: staggerDelay,
          ease: 'power2.out'
        }
      );
    },
    { once: true }
  );
}

export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
}

export function useRevealImage<T extends HTMLElement>() {
  return useScrollAnimation<T>(
    (element, gsap) => {
      const overlay = element.querySelector('.image-overlay');
      const image = element.querySelector('img');
      
      const tl = gsap.timeline();
      
      if (overlay) {
        tl.fromTo(
          overlay,
          { scaleX: 1 },
          { scaleX: 0, duration: 0.8, ease: 'power3.inOut', transformOrigin: 'right' }
        );
      }
      
      if (image) {
        tl.fromTo(
          image,
          { scale: 1.3 },
          { scale: 1, duration: 1.2, ease: 'power2.out' },
          0
        );
      }
      
      return tl;
    },
    { once: true }
  );
}

export default useScrollAnimation;
