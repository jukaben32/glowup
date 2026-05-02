'use client';

import React, { useRef, useEffect } from 'react';
import { useTransform, useScroll } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function CinematicHero() {
  const containerRef = useRef(null);
  const maskRevealRef = useRef(null);
  const maskSubtextRef = useRef(null);
  const maskVideoRef = useRef(null);
  const fadeUpRefs = useRef<Array<HTMLElement | null>>([null, null]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const maskReveal = maskRevealRef.current;
    const maskSubtext = maskSubtextRef.current;
    const maskVideo = maskVideoRef.current;

    if (!maskReveal || !maskSubtext || !maskVideo) return;

    // Create scroll-based animations
    const { scrollYProgress } = useScroll({
      target: container,
      start: () => ({ top: 0, left: 0 }),
      end: () => ({ top: container.scrollHeight, left: 0 })
    });

    // Animate clip-path on the reveal layer: inset(100% 0 0 0) → inset(0% 0 0 0)
    const clipPathValue = useTransform(scrollYProgress, [0, 0.6],
      ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']);

    // Fade in subtext after reveal completes
    const subtextOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
    const subtextY = useTransform(scrollYProgress, [0.55, 0.7], [20, 0]);

    // Background gradient animation
    const bgPosition = useTransform(scrollYProgress, [0, 1],
      ['0% 50%', '100% 50%']);

    // Apply styles using requestAnimationFrame for better performance
    const applyStyles = () => {
      if (maskReveal && maskReveal.style) {
        maskReveal.style.clipPath = clipPathValue.get() || '';
      }

      if (maskSubtext && maskSubtext.style) {
        maskSubtext.style.opacity = subtextOpacity.get()?.toString() || '0';
        maskSubtext.style.transform = `translateY(${subtextY.get()}px)`;
      }

      if (maskVideo && maskVideo.style) {
        maskVideo.style.backgroundPosition = bgPosition.get() || '';
      }

      // Handle fade-up elements
      fadeUpRefs.current.forEach((ref, index) => {
        if (ref && ref.style) {
          const elementProgress = useScroll({
            target: ref,
            start: () => ({ top: ref.offsetTop, left: 0 }),
            end: () => ({ top: ref.offsetTop + ref.offsetHeight, left: 0 })
          });

          const fadeUpOpacity = useTransform(elementProgress.scrollYProgress, [0, 0.15], [0, 1]);
          const fadeUpY = useTransform(elementProgress.scrollYProgress, [0, 0.15], [30, 0]);

          ref.style.opacity = fadeUpOpacity.get()?.toString() || '0';
          ref.style.transform = `translateY(${fadeUpY.get()}px)`;
        }
      });

      requestAnimationFrame(applyStyles);
    };

    applyStyles();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0b] text-[#f0ede8] overflow-x-hidden">
      {/* Background Mesh Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center text-center px-6 pt-20 pb-32">
        <div className="hero-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-teal-400 text-xs font-medium mb-6">
          <Sparkles className="h-3 w-3" />
          <span>Module 01 — Text Mask Reveal</span>
        </div>
        <h1 className="text-[clamp(32px,6vw,64px)] font-light text-white max-w-[700px] tracking-tighter mb-6">
          Scroll to <span className="font-semibold bg-gradient-to-r from-[#c8a97e] to-[#e8d5b5] bg-clip-text text-transparent">reveal</span> the headline through a cinematic text mask
        </h1>
        <div className="scroll-hint mt-8 text-sm text-muted-foreground">
          Scroll down
        </div>
      </section>

      {/* Text Mask Section */}
      <section className="mask-section relative min-h-[300vh]">
        <div className="mask-sticky sticky top-0 min-h-[100dvh] flex items-center justify-center overflow-hidden">

          {/* Animated gradient background */}
          <div
            ref={maskVideoRef}
            className="mask-video absolute inset-0 w-full h-full
              bg-gradient-to-tr from-[#1a1208] via-[#2a1f12] to-[#0d0b08]
              bg-[length:400%_400%]
              transition-background-position"
          />

          {/* Dark overlay with outlined text */}
          <div className="mask-overlay absolute inset-0 flex items-center justify-center bg-[#0a0a0b]">
            <div className="mask-text text-[clamp(60px,15vw,220px)] font-extrabold tracking-tighter text-center
              text-transparent -webkit-text-stroke-[2px_rgba(240,237,232,0.15)]
              relative z-[2]">
              BUILT<br/><span className="block">DIFFERENT</span>
            </div>
          </div>

          {/* Reveal layer — clips in on scroll */}
          <div
            ref={maskRevealRef}
            className="mask-reveal absolute inset-0 flex items-center justify-center z-[3]"
          >
            <div className="mask-text-filled text-[clamp(60px,15vw,220px)] font-extrabold tracking-tighter text-center
              bg-gradient-to-tr from-[#c8a97e] via-[#e8d5b5] to-[#a07850]
              bg-clip-text text-transparent">
              BUILT<br/><span className="block">DIFFERENT</span>
            </div>
          </div>

          {/* Subtext that fades in after reveal */}
          <div
            ref={maskSubtextRef}
            className="mask-subtext absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center z-[4]"
          >
            <p className="text-[clamp(14px,1.8vw,20px)] text-muted-foreground max-w-[45ch] leading-relaxed">
              The text fills with colour as you scroll — forcing visitors to engage with your headline before they see anything else.
            </p>
            <a href="#features" className="inline-block mt-4 text-accent hover:underline text-sm font-medium">
              See how it works
              <span className="ml-1">▸</span>
            </a>
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section
        ref={(ele) => { fadeUpRefs.current[0] = ele; }}
        key="explain1"
        className="explain relative z-10 py-20 px-6 max-w-2xl mx-auto fade-up"
      >
        <div className="tag inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-4">
          Why it works
        </div>
        <h2 className="text-[clamp(24px,4vw,40px)] font-semibold mb-6 tracking-tighter">
          Attention through anticipation
        </h2>
        <p className="text-[clamp(17px,1.6vw,18px)] text-muted-foreground leading-relaxed">
          The visitor has to scroll to complete the visual. By the time the text is fully revealed, they've already invested attention in your headline. Apple, Nike, and Stripe all use variants of this pattern.
        </p>
      </section>

      {/* Additional explanation */}
      <section
        ref={(ele) => { fadeUpRefs.current[1] = ele; }}
        key="explain2"
        className="explain relative z-10 py-20 px-6 max-w-2xl mx-auto fade-up"
      >
        <div className="tag inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-4">
          Implementation
        </div>
        <h2 className="text-[clamp(24px,4vw,40px)] font-semibold mb-6 tracking-tighter">
          CSS background-clip + Framer Motion
        </h2>
        <p className="text-[clamp(17px,1.6vw,18px)] text-muted-foreground leading-relaxed">
          The text uses background-clip: text to reveal the gradient underneath. Framer Motion animates the clip-path that reveals the filled version over the outlined version. Zero external dependencies beyond existing animation library.
        </p>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        /* Animate background position for gradient shift */
        [class*="mask-video"] {
          transition: background-position 0.1s ease-out;
        }
      `}</style>
    </div>
  );
}