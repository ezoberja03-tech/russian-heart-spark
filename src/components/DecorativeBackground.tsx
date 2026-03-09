import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// SVG Elements
const EyeIcon = ({ className, isBlinking = false, id = "eye" }: { className?: string; isBlinking?: boolean; id?: string }) => (
  <svg viewBox="0 0 200 130" fill="none" className={className}>
    <defs>
      {/* Watercolor texture filter */}
      <filter id={`${id}-watercolor`} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id={`${id}-softEdge`} x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="0.8" />
      </filter>
      <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id={`${id}-paintEdge`} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" seed="5" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
      </filter>

      {/* Iris complex gradient - warm brown/amber tones */}
      <radialGradient id={`${id}-irisOuter`} cx="0.45" cy="0.42">
        <stop offset="0%" stopColor="#8B6914" stopOpacity="0.7" />
        <stop offset="35%" stopColor="#6B4E12" stopOpacity="0.6" />
        <stop offset="65%" stopColor="#4A3510" stopOpacity="0.55" />
        <stop offset="85%" stopColor="#3A2A0E" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#2A1F0A" stopOpacity="0.75" />
      </radialGradient>
      <radialGradient id={`${id}-irisInner`} cx="0.5" cy="0.45">
        <stop offset="0%" stopColor="#C4944A" stopOpacity="0.5" />
        <stop offset="40%" stopColor="#A07830" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#705520" stopOpacity="0.3" />
      </radialGradient>
      <radialGradient id={`${id}-irisHighlight`} cx="0.35" cy="0.35">
        <stop offset="0%" stopColor="#D4A855" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#8B6914" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-pupilGrad`} cx="0.42" cy="0.38">
        <stop offset="0%" stopColor="#1a1008" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#0f0a04" stopOpacity="0.92" />
        <stop offset="100%" stopColor="#050302" stopOpacity="0.95" />
      </radialGradient>

      {/* Sclera (white of eye) gradient */}
      <radialGradient id={`${id}-scleraGrad`} cx="0.5" cy="0.5">
        <stop offset="0%" stopColor="#FDFAF5" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#F5EDE0" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#E8D8C4" stopOpacity="0.85" />
      </radialGradient>

      {/* Blood vessel tint in corners */}
      <radialGradient id={`${id}-pinkCornerL`} cx="0.2" cy="0.5">
        <stop offset="0%" stopColor="#D4918A" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#D4918A" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-pinkCornerR`} cx="0.85" cy="0.5">
        <stop offset="0%" stopColor="#C88A82" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#C88A82" stopOpacity="0" />
      </radialGradient>

      {/* Skin tone for eyelid */}
      <linearGradient id={`${id}-skinGrad`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8CCAB" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#D4B896" stopOpacity="0.75" />
      </linearGradient>
      <linearGradient id={`${id}-lidShadow`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B89878" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#B89878" stopOpacity="0" />
      </linearGradient>

      <clipPath id={`${id}-eyeClip`}>
        <path d="M100 28C60 28 18 65 18 65s42 37 82 37 82-37 82-37S140 28 100 28z" />
      </clipPath>
    </defs>

    {/* Subtle soft shadow beneath the eye */}
    <ellipse cx="100" cy="108" rx="65" ry="8" fill="#8B7355" opacity="0.06" filter={`url(#${id}-softEdge)`} />

    {/* Upper eyelid skin area */}
    <path
      d="M100 20C55 20 12 60 12 60 C12 60 35 30 100 25 C165 30 188 60 188 60 C188 60 145 20 100 20z"
      fill={`url(#${id}-skinGrad)`} filter={`url(#${id}-paintEdge)`}
    />
    {/* Eyelid crease */}
    <path
      d="M32 40 Q65 22 100 20 Q135 22 168 40"
      stroke="#A08060" strokeWidth="0.7" fill="none" opacity="0.25" strokeLinecap="round"
      filter={`url(#${id}-paintEdge)`}
    />
    {/* Lid shadow on eye */}
    <path
      d="M100 28C60 28 18 65 18 65 C40 50 70 38 100 36 C130 38 160 50 182 65 C182 65 140 28 100 28z"
      fill={`url(#${id}-lidShadow)`}
    />

    {/* ===== EYE CONTENTS (clipped) ===== */}
    <g clipPath={`url(#${id}-eyeClip)`} opacity={isBlinking ? 0 : 1}>
      {/* Sclera base */}
      <ellipse cx="100" cy="65" rx="82" ry="37" fill={`url(#${id}-scleraGrad)`} />
      
      {/* Subtle blood vessels */}
      <path d="M25 60 Q40 58 55 62" stroke="#C8908A" strokeWidth="0.3" opacity="0.2" fill="none" />
      <path d="M28 67 Q42 63 52 66" stroke="#C8908A" strokeWidth="0.25" opacity="0.15" fill="none" />
      <path d="M145 60 Q160 57 172 62" stroke="#C8908A" strokeWidth="0.3" opacity="0.18" fill="none" />
      <path d="M150 68 Q162 65 170 67" stroke="#C8908A" strokeWidth="0.25" opacity="0.12" fill="none" />

      {/* Pinkish inner corner (caruncle) */}
      <ellipse cx="24" cy="65" rx="10" ry="8" fill={`url(#${id}-pinkCornerL)`} />
      <path d="M18 65 Q22 60 28 63 Q24 68 18 65z" fill="#D4918A" opacity="0.18" />

      {/* Pink outer corner tint */}
      <ellipse cx="178" cy="65" rx="8" ry="6" fill={`url(#${id}-pinkCornerR)`} />

      {/* ===== IRIS ===== */}
      <g filter={`url(#${id}-watercolor)`}>
        {/* Iris outer ring */}
        <circle cx="100" cy="65" r="22" fill={`url(#${id}-irisOuter)`} />
        
        {/* Iris inner texture layer */}
        <circle cx="100" cy="65" r="20" fill={`url(#${id}-irisInner)`} />
        
        {/* Iris highlight zone */}
        <circle cx="100" cy="65" r="18" fill={`url(#${id}-irisHighlight)`} />

        {/* Iris radial fibers - collarette pattern */}
        {Array.from({ length: 36 }, (_, i) => {
          const angle = (i * 10) * Math.PI / 180;
          const innerR = 8;
          const outerR = 20 + (i % 3) * 1.5;
          const x1 = 100 + Math.cos(angle) * innerR;
          const y1 = 65 + Math.sin(angle) * innerR;
          const x2 = 100 + Math.cos(angle) * outerR;
          const y2 = 65 + Math.sin(angle) * outerR;
          const wobble = Math.sin(i * 1.7) * 2;
          const mx = 100 + Math.cos(angle) * (innerR + outerR) / 2 + wobble;
          const my = 65 + Math.sin(angle) * (innerR + outerR) / 2 + wobble;
          return (
            <path
              key={i}
              d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`}
              stroke={i % 4 === 0 ? "#C4944A" : i % 3 === 0 ? "#8B6914" : "#6B4E12"}
              strokeWidth={0.3 + (i % 3) * 0.15}
              opacity={0.2 + (i % 5) * 0.06}
              fill="none"
              strokeLinecap="round"
            />
          );
        })}

        {/* Iris ring / collarette border */}
        <circle cx="100" cy="65" r="14" stroke="#705520" strokeWidth="0.5" fill="none" opacity="0.3" />
        
        {/* Iris outer dark limbal ring */}
        <circle cx="100" cy="65" r="22" stroke="#2A1F0A" strokeWidth="1.2" fill="none" opacity="0.45" />
        <circle cx="100" cy="65" r="21.5" stroke="#3A2A0E" strokeWidth="0.6" fill="none" opacity="0.25" />
      </g>

      {/* ===== PUPIL ===== */}
      <circle cx="100" cy="65" r="8" fill={`url(#${id}-pupilGrad)`} />
      {/* Pupil edge softness */}
      <circle cx="100" cy="65" r="8.5" stroke="#1a1008" strokeWidth="0.8" fill="none" opacity="0.3" filter={`url(#${id}-softEdge)`} />

      {/* ===== CATCHLIGHTS / REFLECTIONS ===== */}
      {/* Main large catchlight */}
      <ellipse cx="93" cy="56" rx="5" ry="4.5" fill="white" opacity="0.92" filter={`url(#${id}-glow)`} />
      {/* Secondary smaller catchlight */}
      <ellipse cx="108" cy="72" rx="2.5" ry="2" fill="white" opacity="0.55" />
      {/* Tiny sparkle highlights */}
      <circle cx="90" cy="58" r="1" fill="white" opacity="0.8" />
      <circle cx="110" cy="60" r="0.7" fill="white" opacity="0.4" />
      
      {/* Reflection arc on iris (window reflection) */}
      <path
        d="M88 52 Q95 48 102 52"
        stroke="white" strokeWidth="1" fill="none" opacity="0.2" strokeLinecap="round"
      />

      {/* Subtle iris color reflection in catchlight */}
      <ellipse cx="94" cy="57" rx="3" ry="2.5" fill="#D4A855" opacity="0.08" />
    </g>

    {/* Eye outline - almond shape with watercolor edge */}
    <path
      d="M100 28C60 28 18 65 18 65s42 37 82 37 82-37 82-37S140 28 100 28z"
      stroke="#6B5840" strokeWidth="1.2" fill="none" opacity="0.5"
      filter={`url(#${id}-paintEdge)`}
    />
    {/* Inner eye line (waterline) */}
    <path
      d="M100 32C65 32 25 65 25 65s38 32 75 32 75-32 75-32S135 32 100 32z"
      stroke="#A08870" strokeWidth="0.4" fill="none" opacity="0.2"
    />

    {/* ===== UPPER EYELASHES ===== */}
    <g opacity="0.7" filter={`url(#${id}-paintEdge)`}>
      {/* Long center lashes */}
      <path d="M80 34 Q78 18 74 12" stroke="#3A2A15" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M88 30 Q85 14 82 8" stroke="#3A2A15" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M96 28 Q94 10 92 4" stroke="#3A2A15" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M104 28 Q105 10 107 4" stroke="#3A2A15" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M112 30 Q114 14 117 8" stroke="#3A2A15" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M120 34 Q123 18 127 12" stroke="#3A2A15" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      
      {/* Medium lashes */}
      <path d="M72 38 Q68 24 64 18" stroke="#4A3820" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M84 32 Q81 20 78 15" stroke="#4A3820" strokeWidth="1.0" fill="none" strokeLinecap="round" />
      <path d="M92 29 Q90 16 88 10" stroke="#4A3820" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M100 28 Q100 14 101 6" stroke="#4A3820" strokeWidth="1.0" fill="none" strokeLinecap="round" />
      <path d="M108 29 Q110 16 112 10" stroke="#4A3820" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M116 32 Q119 20 122 15" stroke="#4A3820" strokeWidth="1.0" fill="none" strokeLinecap="round" />
      <path d="M128 38 Q132 24 136 18" stroke="#4A3820" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      
      {/* Short wispy lashes */}
      <path d="M65 42 Q62 34 58 28" stroke="#5A4830" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M76 36 Q74 28 71 22" stroke="#5A4830" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M124 36 Q126 28 129 22" stroke="#5A4830" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M135 42 Q138 34 142 28" stroke="#5A4830" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      
      {/* Corner lashes - inner */}
      <path d="M55 50 Q48 42 42 38" stroke="#5A4830" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M48 55 Q42 48 36 44" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      
      {/* Corner lashes - outer (longer, more dramatic) */}
      <path d="M142 42 Q148 32 155 26" stroke="#3A2A15" strokeWidth="1.0" fill="none" strokeLinecap="round" />
      <path d="M150 48 Q156 38 164 32" stroke="#3A2A15" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M156 54 Q162 46 170 40" stroke="#4A3820" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M160 58 Q166 52 174 48" stroke="#5A4830" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    </g>

    {/* ===== LOWER EYELASHES ===== */}
    <g opacity="0.4" filter={`url(#${id}-paintEdge)`}>
      <path d="M60 82 Q56 90 52 94" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M72 90 Q70 98 68 102" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M84 95 Q83 103 82 108" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M96 98 Q96 106 95 112" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M108 98 Q109 106 110 112" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M120 95 Q122 103 124 108" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M132 90 Q134 98 136 102" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M144 82 Q148 90 152 94" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
    </g>

    {/* Lower eyelid subtle line */}
    <path
      d="M30 72 Q65 100 100 102 Q135 100 170 72"
      stroke="#8B7355" strokeWidth="0.5" fill="none" opacity="0.2"
    />

    {/* Under-eye skin tone */}
    <path
      d="M35 75 Q65 105 100 107 Q135 105 165 75 Q140 95 100 98 Q60 95 35 75z"
      fill="#D4B896" opacity="0.08"
    />

    {/* ===== BLINK OVERLAY ===== */}
    {isBlinking && (
      <g>
        <path
          d="M100 28C60 28 18 65 18 65s42 37 82 37 82-37 82-37S140 28 100 28z"
          fill={`url(#${id}-skinGrad)`} stroke="#8B7355" strokeWidth="1"
        />
        {/* Closed eyelid crease line */}
        <path
          d="M25 65 Q62 58 100 56 Q138 58 175 65"
          stroke="#A08060" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round"
        />
        {/* Lashes along closed lid */}
        <path d="M80 60 Q78 52 74 46" stroke="#3A2A15" strokeWidth="1.0" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M96 57 Q94 48 92 42" stroke="#3A2A15" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M104 57 Q106 48 108 42" stroke="#3A2A15" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M120 60 Q122 52 126 46" stroke="#3A2A15" strokeWidth="1.0" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M150 66 Q156 58 164 52" stroke="#3A2A15" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.5" />
      </g>
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

// Blinking Eye wrapper component
const BlinkingEye = ({ element, index }: { element: FloatingElement; index: number }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startBlinking = () => {
      const randomDelay = 3000 + Math.random() * 4000; // Random delay between 3-7 seconds
      blinkIntervalRef.current = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150); // Blink duration 150ms
        startBlinking(); // Schedule next blink
      }, randomDelay);
    };
    
    startBlinking();
    return () => {
      if (blinkIntervalRef.current) clearTimeout(blinkIntervalRef.current);
    };
  }, []);

  const parallaxX = useTransform(springX, [-1, 1], [-20 * element.depth, 20 * element.depth]);
  const parallaxY = useTransform(springY, [-1, 1], [-15 * element.depth, 15 * element.depth]);

  return (
    <motion.div
      className={`absolute ${element.size} ${element.color}`}
      style={{ left: `${element.baseX}%`, top: `${element.baseY}%`, x: parallaxX, y: parallaxY }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{
        opacity: [0, 0.85, 0.7, 0.9, 0.75],
        scale: [0.3, 1, 0.95, 1.05, 1],
        rotate: [-element.rotateRange / 2, element.rotateRange / 2, -element.rotateRange / 3, element.rotateRange / 4, 0],
        y: [0, -12, 0, -8, 0],
      }}
      transition={{
        opacity: { duration: 1.5, delay: element.delay },
        scale:   { duration: 1.5, delay: element.delay },
        rotate:  { duration: element.durationFloat, delay: element.delay, repeat: Infinity, ease: "easeInOut" },
        y:       { duration: element.durationFloat, delay: element.delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <EyeIcon className="w-full h-full" isBlinking={isBlinking} id={`eye-${index}`} />
    </motion.div>
  );
};

const floatingElements: FloatingElement[] = [
  { Component: EyeIcon,     baseX: 5,  baseY: 8,  size: "w-32 h-20", color: "text-mint",       delay: 0,   depth: 0.8, rotateRange: 8,  durationFloat: 7 },
  { Component: EyeIcon,     baseX: 78, baseY: 12, size: "w-28 h-18", color: "text-olive",      delay: 1.2, depth: 0.5, rotateRange: 6,  durationFloat: 9 },
  { Component: EyeIcon,     baseX: 62, baseY: 68, size: "w-36 h-22", color: "text-blush",      delay: 2,   depth: 0.7, rotateRange: 10, durationFloat: 6 },
  { Component: EyeIcon,     baseX: 12, baseY: 55, size: "w-24 h-14", color: "text-mint",       delay: 0.5, depth: 0.4, rotateRange: 5,  durationFloat: 11 },
  { Component: EyeIcon,     baseX: 88, baseY: 45, size: "w-32 h-20", color: "text-olive",      delay: 3,   depth: 0.6, rotateRange: 7,  durationFloat: 8 },
  { Component: EyeIcon,     baseX: 42, baseY: 85, size: "w-28 h-18", color: "text-blush",      delay: 1.8, depth: 0.3, rotateRange: 4,  durationFloat: 10 },
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

// Define springs at module level for use in BlinkingEye
let springX: any;
let springY: any;

const DecorativeBackground = () => {
  const [particles] = useState(() => generateParticles(35));
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

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
            radial-gradient(ellipse at 15% 20%, hsl(var(--mint-light) / 0.75) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 15%, hsl(var(--blush-light) / 0.65) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 80%, hsl(var(--olive-light) / 0.55) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, hsl(var(--beige-warm) / 0.6) 0%, transparent 45%),
            radial-gradient(ellipse at 20% 60%, hsl(var(--gold-light) / 0.35) 0%, transparent 40%),
            hsl(var(--background))
          `,
        }}
      />

      {/* Soft watercolor blobs */}
      <div className="absolute top-[8%]  left-[4%]  w-80 h-80 rounded-full bg-mint-light/40  blur-[80px]" />
      <div className="absolute top-[55%] right-[8%] w-64 h-64 rounded-full bg-blush-light/45  blur-[70px]" />
      <div className="absolute bottom-[10%] left-[28%] w-72 h-72 rounded-full bg-olive-light/35 blur-[75px]" />
      <div className="absolute top-[25%] right-[22%] w-56 h-56 rounded-full bg-beige-warm/40  blur-[65px]" />
      <div className="absolute top-[42%] left-[48%] w-44 h-44 rounded-full bg-gold-light/25   blur-[60px]" />

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
        // Always call hooks unconditionally (React Rules of Hooks)
        const parallaxX = useTransform(springX, [-1, 1], [-20 * el.depth, 20 * el.depth]);
        const parallaxY = useTransform(springY, [-1, 1], [-15 * el.depth, 15 * el.depth]);

        // Eyes get special blinking treatment
        if (el.Component === EyeIcon) {
          return <BlinkingEye key={i} element={el} index={i} />;
        }

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
