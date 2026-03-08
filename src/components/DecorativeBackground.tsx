import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// SVG Elements
const EyeIcon = ({ className, isBlinking = false }: { className?: string; isBlinking?: boolean }) => (
  <svg viewBox="0 0 80 50" fill="none" className={className}>
    {/* Eye shape with watercolor effect */}
    <defs>
      <radialGradient id="irisGradient" cx="0.3" cy="0.3">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
      </radialGradient>
      <radialGradient id="pupilGradient" cx="0.4" cy="0.4">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
      </radialGradient>
    </defs>
    
    {/* Soft shadow beneath eye */}
    <ellipse cx="40" cy="27" rx="32" ry="3" fill="currentColor" opacity="0.08" />
    
    {/* Eye white with subtle watercolor edge */}
    <path
      d="M40 5C20 5 5 25 5 25s15 20 35 20 35-20 35-20S60 5 40 5z"
      stroke="currentColor" strokeWidth="1.8" fill="white" fillOpacity="0.85" opacity="0.75"
    />
    
    {/* Iris with gradient */}
    <circle cx="40" cy="25" r="11" fill="url(#irisGradient)" opacity={isBlinking ? 0 : 1} />
    <circle cx="40" cy="25" r="11" stroke="currentColor" strokeWidth="1.2" fill="none" opacity={isBlinking ? 0 : 0.5} />
    
    {/* Pupil */}
    <circle cx="40" cy="25" r="5" fill="url(#pupilGradient)" opacity={isBlinking ? 0 : 1} />
    
    {/* Light reflection highlights */}
    <circle cx="36" cy="21" r="2.5" fill="white" opacity={isBlinking ? 0 : 0.9} />
    <circle cx="43" cy="23" r="1.2" fill="white" opacity={isBlinking ? 0 : 0.6} />
    
    {/* Upper eyelashes */}
    <path d="M15 15 Q 18 8, 21 15" stroke="currentColor" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" fill="none" />
    <path d="M25 8 Q 27 2, 29 8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" fill="none" />
    <path d="M35 5 Q 38 -1, 41 5" stroke="currentColor" strokeWidth="1.3" opacity="0.65" strokeLinecap="round" fill="none" />
    <path d="M45 5 Q 48 -1, 51 5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" fill="none" />
    <path d="M55 8 Q 57 2, 59 8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" fill="none" />
    <path d="M63 15 Q 66 8, 69 15" stroke="currentColor" strokeWidth="1.1" opacity="0.55" strokeLinecap="round" fill="none" />
    
    {/* Lower eyelashes */}
    <path d="M18 35 Q 20 40, 22 35" stroke="currentColor" strokeWidth="0.9" opacity="0.4" strokeLinecap="round" fill="none" />
    <path d="M30 42 Q 32 47, 34 42" stroke="currentColor" strokeWidth="0.9" opacity="0.4" strokeLinecap="round" fill="none" />
    <path d="M46 42 Q 48 47, 50 42" stroke="currentColor" strokeWidth="0.9" opacity="0.4" strokeLinecap="round" fill="none" />
    <path d="M58 35 Q 60 40, 62 35" stroke="currentColor" strokeWidth="0.9" opacity="0.4" strokeLinecap="round" fill="none" />
    
    {/* Blinking eyelid - closes when isBlinking is true */}
    {isBlinking && (
      <path
        d="M40 5C20 5 5 25 5 25s15 20 35 20 35-20 35-20S60 5 40 5z"
        fill="currentColor" fillOpacity="0.7" stroke="currentColor" strokeWidth="1.5"
      />
    )}
  </svg>
);

const LeafIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 60" fill="none" className={className}>
    <path
      d="M20 55C20 55 5 35 5 20C5 8 12 2 20 2C28 2 35 8 35 20C35 35 20 55 20 55Z"
      stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1"
    />
    <path d="M20 50V10" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <path d="M20 20C15 17 10 18 10 18" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    <path d="M20 30C25 27 30 28 30 28" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
  </svg>
);

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L13.5 8.5L22 6L15.5 12L22 18L13.5 15.5L12 24L10.5 15.5L2 18L8.5 12L2 6L10.5 8.5L12 0Z" opacity="0.5" />
  </svg>
);

const FlowerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 50 50" fill="none" className={className}>
    <circle cx="25" cy="25" r="5" fill="currentColor" fillOpacity="0.2" />
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <ellipse
        key={angle} cx="25" cy="12" rx="6" ry="10"
        fill="currentColor" fillOpacity="0.1"
        stroke="currentColor" strokeWidth="0.5" opacity="0.4"
        transform={`rotate(${angle} 25 25)`}
      />
    ))}
  </svg>
);

const CrescentIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 50 50" fill="none" className={className}>
    <path
      d="M30 8C22 8 16 14 16 25C16 36 22 42 30 42C20 42 10 34 10 25C10 16 20 8 30 8Z"
      fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.8" opacity="0.35"
    />
  </svg>
);

// Particle system
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  drift: number;
}

const PARTICLE_COLORS = [
  "hsl(160, 35%, 65%)",
  "hsl(43, 72%, 65%)",
  "hsl(340, 35%, 78%)",
  "hsl(80, 20%, 65%)",
  "hsl(35, 40%, 80%)",
  "hsl(43, 80%, 70%)",
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 6,
    drift: (Math.random() - 0.5) * 30,
  }));
}

interface FloatingElement {
  Component: React.FC<{ className?: string }>;
  baseX: number;
  baseY: number;
  size: string;
  color: string;
  delay: number;
  depth: number; // 0.2 - 1.0, parallax multiplier
  rotateRange: number;
  durationFloat: number;
}

const floatingElements: FloatingElement[] = [
  { Component: EyeIcon,     baseX: 5,  baseY: 8,  size: "w-20 h-12", color: "text-mint",       delay: 0,   depth: 0.8, rotateRange: 8,  durationFloat: 7 },
  { Component: EyeIcon,     baseX: 78, baseY: 12, size: "w-16 h-10", color: "text-olive",      delay: 1.2, depth: 0.5, rotateRange: 6,  durationFloat: 9 },
  { Component: EyeIcon,     baseX: 62, baseY: 68, size: "w-24 h-14", color: "text-blush",      delay: 2,   depth: 0.7, rotateRange: 10, durationFloat: 6 },
  { Component: EyeIcon,     baseX: 12, baseY: 55, size: "w-14 h-8",  color: "text-mint",       delay: 0.5, depth: 0.4, rotateRange: 5,  durationFloat: 11 },
  { Component: EyeIcon,     baseX: 88, baseY: 45, size: "w-20 h-12", color: "text-olive",      delay: 3,   depth: 0.6, rotateRange: 7,  durationFloat: 8 },
  { Component: EyeIcon,     baseX: 42, baseY: 85, size: "w-16 h-10", color: "text-blush",      delay: 1.8, depth: 0.3, rotateRange: 4,  durationFloat: 10 },
  { Component: LeafIcon,    baseX: 91, baseY: 5,  size: "w-10 h-14", color: "text-olive",      delay: 0.8, depth: 0.9, rotateRange: 15, durationFloat: 9 },
  { Component: LeafIcon,    baseX: 3,  baseY: 72, size: "w-8 h-12",  color: "text-mint",       delay: 2.5, depth: 0.5, rotateRange: 20, durationFloat: 7 },
  { Component: LeafIcon,    baseX: 70, baseY: 88, size: "w-10 h-14", color: "text-olive",      delay: 1.2, depth: 0.4, rotateRange: 12, durationFloat: 12 },
  { Component: SparkleIcon, baseX: 25, baseY: 10, size: "w-7 h-7",   color: "text-gold",       delay: 0.3, depth: 1.0, rotateRange: 30, durationFloat: 5 },
  { Component: SparkleIcon, baseX: 82, baseY: 28, size: "w-5 h-5",   color: "text-gold-light", delay: 1.8, depth: 0.7, rotateRange: 25, durationFloat: 6 },
  { Component: SparkleIcon, baseX: 50, baseY: 4,  size: "w-4 h-4",   color: "text-gold-shimmer", delay: 0.7, depth: 0.8, rotateRange: 40, durationFloat: 4 },
  { Component: SparkleIcon, baseX: 10, baseY: 38, size: "w-6 h-6",   color: "text-gold",       delay: 2.2, depth: 0.6, rotateRange: 20, durationFloat: 7 },
  { Component: SparkleIcon, baseX: 65, baseY: 50, size: "w-5 h-5",   color: "text-gold-light", delay: 1.1, depth: 0.9, rotateRange: 35, durationFloat: 5 },
  { Component: SparkleIcon, baseX: 35, baseY: 65, size: "w-7 h-7",   color: "text-gold",       delay: 0.4, depth: 0.5, rotateRange: 30, durationFloat: 8 },
  { Component: FlowerIcon,  baseX: 30, baseY: 22, size: "w-14 h-14", color: "text-blush",      delay: 1.5, depth: 0.4, rotateRange: 10, durationFloat: 10 },
  { Component: FlowerIcon,  baseX: 75, baseY: 58, size: "w-12 h-12", color: "text-blush",      delay: 0.6, depth: 0.7, rotateRange: 8,  durationFloat: 8 },
  { Component: FlowerIcon,  baseX: 48, baseY: 40, size: "w-9 h-9",   color: "text-mint",       delay: 2,   depth: 0.3, rotateRange: 12, durationFloat: 11 },
  { Component: CrescentIcon,baseX: 55, baseY: 18, size: "w-14 h-14", color: "text-gold",       delay: 0.9, depth: 0.6, rotateRange: 6,  durationFloat: 9 },
  { Component: CrescentIcon,baseX: 18, baseY: 82, size: "w-12 h-12", color: "text-gold-light", delay: 2.3, depth: 0.8, rotateRange: 8,  durationFloat: 7 },
];

const DecorativeBackground = () => {
  const [particles] = useState(() => generateParticles(35));
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) / centerX);
      mouseY.set((e.clientY - centerY) / centerY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 20%, hsl(var(--mint-light) / 0.55) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 15%, hsl(var(--blush-light) / 0.45) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 80%, hsl(var(--olive-light) / 0.38) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, hsl(var(--beige-warm) / 0.4) 0%, transparent 45%),
            radial-gradient(ellipse at 20% 60%, hsl(var(--gold-light) / 0.18) 0%, transparent 40%),
            hsl(var(--background))
          `,
        }}
      />

      {/* Soft watercolor blobs */}
      <div className="absolute top-[8%]  left-[4%]  w-80 h-80 rounded-full bg-mint-light/25  blur-[80px]" />
      <div className="absolute top-[55%] right-[8%] w-64 h-64 rounded-full bg-blush-light/30  blur-[70px]" />
      <div className="absolute bottom-[10%] left-[28%] w-72 h-72 rounded-full bg-olive-light/22 blur-[75px]" />
      <div className="absolute top-[25%] right-[22%] w-56 h-56 rounded-full bg-beige-warm/28  blur-[65px]" />
      <div className="absolute top-[42%] left-[48%] w-44 h-44 rounded-full bg-gold-light/12   blur-[60px]" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.35,
          }}
          animate={{
            y: [0, -40, 0, 20, 0],
            x: [0, p.drift, 0, -p.drift * 0.5, 0],
            opacity: [0.1, 0.45, 0.2, 0.5, 0.1],
            scale: [1, 1.3, 0.8, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating decorative elements with parallax */}
      {floatingElements.map((el, i) => {
        const parallaxX = useTransform(springX, [-1, 1], [-20 * el.depth, 20 * el.depth]);
        const parallaxY = useTransform(springY, [-1, 1], [-15 * el.depth, 15 * el.depth]);

        return (
          <motion.div
            key={i}
            className={`absolute ${el.size} ${el.color}`}
            style={{ left: `${el.baseX}%`, top: `${el.baseY}%`, x: parallaxX, y: parallaxY }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: [0, 0.7, 0.5, 0.8, 0.6],
              scale: [0.3, 1, 0.95, 1.05, 1],
              rotate: [-el.rotateRange / 2, el.rotateRange / 2, -el.rotateRange / 3, el.rotateRange / 4, 0],
              y: [0, -12, 0, -8, 0],
            }}
            transition={{
              opacity: { duration: 1.5, delay: el.delay },
              scale:   { duration: 1.5, delay: el.delay },
              rotate:  { duration: el.durationFloat, delay: el.delay, repeat: Infinity, ease: "easeInOut" },
              y:       { duration: el.durationFloat, delay: el.delay, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <el.Component className="w-full h-full" />
          </motion.div>
        );
      })}

      {/* Gold thin decorative rings */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="15%" cy="25%" r="80" stroke="hsl(43, 72%, 55%)" strokeWidth="0.6" fill="none" />
        <circle cx="80%" cy="65%" r="60" stroke="hsl(43, 72%, 55%)" strokeWidth="0.5" fill="none" />
        <circle cx="50%" cy="50%" r="40" stroke="hsl(43, 60%, 70%)" strokeWidth="0.4" fill="none" />
      </motion.svg>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default DecorativeBackground;
