// Lite version: same aesthetics, no framer-motion, no parallax, fewer animations
// Used on weak devices (low score) or when user chooses 'lite' mode

const EyeIcon = ({ className, id = "eye" }: { className?: string; id?: string }) => (
  <svg viewBox="0 0 200 130" fill="none" className={className}>
    <defs>
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
      <radialGradient id={`${id}-scleraGrad`} cx="0.5" cy="0.5">
        <stop offset="0%" stopColor="#FDFAF5" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#F5EDE0" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#E8D8C4" stopOpacity="0.85" />
      </radialGradient>
      <radialGradient id={`${id}-pinkCornerL`} cx="0.2" cy="0.5">
        <stop offset="0%" stopColor="#D4918A" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#D4918A" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-pinkCornerR`} cx="0.85" cy="0.5">
        <stop offset="0%" stopColor="#C88A82" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#C88A82" stopOpacity="0" />
      </radialGradient>
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
    <ellipse cx="100" cy="108" rx="65" ry="8" fill="#8B7355" opacity="0.06" filter={`url(#${id}-softEdge)`} />
    <path d="M100 20C55 20 12 60 12 60 C12 60 35 30 100 25 C165 30 188 60 188 60 C188 60 145 20 100 20z" fill={`url(#${id}-skinGrad)`} filter={`url(#${id}-paintEdge)`} />
    <path d="M32 40 Q65 22 100 20 Q135 22 168 40" stroke="#A08060" strokeWidth="0.7" fill="none" opacity="0.25" strokeLinecap="round" filter={`url(#${id}-paintEdge)`} />
    <path d="M100 28C60 28 18 65 18 65 C40 50 70 38 100 36 C130 38 160 50 182 65 C182 65 140 28 100 28z" fill={`url(#${id}-lidShadow)`} />
    <g clipPath={`url(#${id}-eyeClip)`}>
      <ellipse cx="100" cy="65" rx="82" ry="37" fill={`url(#${id}-scleraGrad)`} />
      <path d="M25 60 Q40 58 55 62" stroke="#C8908A" strokeWidth="0.3" opacity="0.2" fill="none" />
      <path d="M145 60 Q160 57 172 62" stroke="#C8908A" strokeWidth="0.3" opacity="0.18" fill="none" />
      <ellipse cx="24" cy="65" rx="10" ry="8" fill={`url(#${id}-pinkCornerL)`} />
      <path d="M18 65 Q22 60 28 63 Q24 68 18 65z" fill="#D4918A" opacity="0.18" />
      <ellipse cx="178" cy="65" rx="8" ry="6" fill={`url(#${id}-pinkCornerR)`} />
      <g filter={`url(#${id}-watercolor)`}>
        <circle cx="100" cy="65" r="22" fill={`url(#${id}-irisOuter)`} />
        <circle cx="100" cy="65" r="20" fill={`url(#${id}-irisInner)`} />
        <circle cx="100" cy="65" r="18" fill={`url(#${id}-irisHighlight)`} />
        {Array.from({ length: 36 }, (_, i) => {
          const angle = (i * 10) * Math.PI / 180;
          const innerR = 8, outerR = 20 + (i % 3) * 1.5;
          const x1 = 100 + Math.cos(angle) * innerR, y1 = 65 + Math.sin(angle) * innerR;
          const x2 = 100 + Math.cos(angle) * outerR, y2 = 65 + Math.sin(angle) * outerR;
          const wobble = Math.sin(i * 1.7) * 2;
          const mx = 100 + Math.cos(angle) * (innerR + outerR) / 2 + wobble;
          const my = 65 + Math.sin(angle) * (innerR + outerR) / 2 + wobble;
          return <path key={i} d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} stroke={i % 4 === 0 ? "#C4944A" : i % 3 === 0 ? "#8B6914" : "#6B4E12"} strokeWidth={0.3 + (i % 3) * 0.15} opacity={0.2 + (i % 5) * 0.06} fill="none" strokeLinecap="round" />;
        })}
        <circle cx="100" cy="65" r="14" stroke="#705520" strokeWidth="0.5" fill="none" opacity="0.3" />
        <circle cx="100" cy="65" r="22" stroke="#2A1F0A" strokeWidth="1.2" fill="none" opacity="0.45" />
        <circle cx="100" cy="65" r="21.5" stroke="#3A2A0E" strokeWidth="0.6" fill="none" opacity="0.25" />
      </g>
      <circle cx="100" cy="65" r="8" fill={`url(#${id}-pupilGrad)`} />
      <circle cx="100" cy="65" r="8.5" stroke="#1a1008" strokeWidth="0.8" fill="none" opacity="0.3" filter={`url(#${id}-softEdge)`} />
      <ellipse cx="93" cy="56" rx="5" ry="4.5" fill="white" opacity="0.92" filter={`url(#${id}-glow)`} />
      <ellipse cx="108" cy="72" rx="2.5" ry="2" fill="white" opacity="0.55" />
      <circle cx="90" cy="58" r="1" fill="white" opacity="0.8" />
      <path d="M88 52 Q95 48 102 52" stroke="white" strokeWidth="1" fill="none" opacity="0.2" strokeLinecap="round" />
    </g>
    <path d="M100 28C60 28 18 65 18 65s42 37 82 37 82-37 82-37S140 28 100 28z" stroke="#6B5840" strokeWidth="1.2" fill="none" opacity="0.5" filter={`url(#${id}-paintEdge)`} />
    <g opacity="0.7" filter={`url(#${id}-paintEdge)`}>
      <path d="M80 34 Q78 18 74 12" stroke="#3A2A15" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M96 28 Q94 10 92 4" stroke="#3A2A15" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M104 28 Q105 10 107 4" stroke="#3A2A15" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M120 34 Q123 18 127 12" stroke="#3A2A15" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M150 48 Q156 38 164 32" stroke="#3A2A15" strokeWidth="0.9" fill="none" strokeLinecap="round" />
    </g>
    <g opacity="0.4" filter={`url(#${id}-paintEdge)`}>
      <path d="M72 90 Q70 98 68 102" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M108 98 Q109 106 110 112" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      <path d="M132 90 Q134 98 136 102" stroke="#5A4830" strokeWidth="0.5" fill="none" strokeLinecap="round" />
    </g>
    <path d="M30 72 Q65 100 100 102 Q135 100 170 72" stroke="#8B7355" strokeWidth="0.5" fill="none" opacity="0.2" />
  </svg>
);

const LeafIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 60" fill="none" className={className}>
    <path d="M20 55C20 55 5 35 5 20C5 8 12 2 20 2C28 2 35 8 35 20C35 35 20 55 20 55Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
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

const CrescentIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 50 50" fill="none" className={className}>
    <path d="M30 8C22 8 16 14 16 25C16 36 22 42 30 42C20 42 10 34 10 25C10 16 20 8 30 8Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
  </svg>
);

// Static particles — no animation, just colored dots
const STATIC_DOTS = [
  { x: 12, y: 18, size: 4, color: "hsl(160, 35%, 65%)" },
  { x: 78, y: 8,  size: 3, color: "hsl(43, 72%, 65%)" },
  { x: 45, y: 72, size: 5, color: "hsl(340, 35%, 78%)" },
  { x: 88, y: 55, size: 3, color: "hsl(80, 20%, 65%)" },
  { x: 22, y: 90, size: 4, color: "hsl(43, 80%, 70%)" },
  { x: 62, y: 35, size: 3, color: "hsl(35, 40%, 80%)" },
  { x: 5,  y: 48, size: 3, color: "hsl(160, 35%, 65%)" },
  { x: 95, y: 30, size: 4, color: "hsl(43, 72%, 65%)" },
];

const DecorativeBackgroundLite = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    {/* Base gradient — same as Full */}
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 15% 20%, hsl(var(--mint-light) / 1) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 15%, hsl(var(--blush-light) / 0.95) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 80%, hsl(var(--olive-light) / 0.85) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, hsl(var(--beige-warm) / 0.9) 0%, transparent 45%),
          radial-gradient(ellipse at 20% 60%, hsl(var(--gold-light) / 0.65) 0%, transparent 40%),
          hsl(var(--background))
        `,
      }}
    />

    {/* Reduced blobs: 3 instead of 5, blur-[15px] instead of 60-80px */}
    <div className="absolute top-[8%]  left-[4%]  w-72 h-72 rounded-full bg-mint-light/60  blur-[15px]" />
    <div className="absolute top-[55%] right-[8%] w-56 h-56 rounded-full bg-blush-light/65 blur-[15px]" />
    <div className="absolute bottom-[10%] left-[28%] w-64 h-64 rounded-full bg-olive-light/55 blur-[15px]" />

    {/* Static dots — no animation */}
    {STATIC_DOTS.map((dot, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${dot.x}%`,
          top: `${dot.y}%`,
          width: dot.size,
          height: dot.size,
          backgroundColor: dot.color,
          opacity: 0.3,
        }}
      />
    ))}

    {/* 3 eyes with CSS float animation — no parallax, no blinking */}
    <div className="absolute w-32 h-20 text-mint animate-[float_7s_ease-in-out_infinite]" style={{ left: '5%', top: '8%', opacity: 0.72 }}>
      <EyeIcon className="w-full h-full" id="lite-eye-0" />
    </div>
    <div className="absolute w-28 h-18 text-olive animate-[float_9s_ease-in-out_infinite_1.2s]" style={{ left: '78%', top: '12%', opacity: 0.68 }}>
      <EyeIcon className="w-full h-full" id="lite-eye-1" />
    </div>
    <div className="absolute w-24 h-14 text-mint animate-[float_11s_ease-in-out_infinite_0.5s]" style={{ left: '12%', top: '55%', opacity: 0.62 }}>
      <EyeIcon className="w-full h-full" id="lite-eye-2" />
    </div>

    {/* Leaves */}
    <div className="absolute w-10 h-14 text-olive animate-[float_9s_ease-in-out_infinite_0.8s]" style={{ left: '91%', top: '5%', opacity: 0.55 }}>
      <LeafIcon className="w-full h-full" />
    </div>
    <div className="absolute w-8 h-12 text-mint animate-[float_7s_ease-in-out_infinite_2.5s]" style={{ left: '3%', top: '72%', opacity: 0.5 }}>
      <LeafIcon className="w-full h-full" />
    </div>

    {/* Sparkles */}
    <div className="absolute w-7 h-7 text-gold animate-[float_5s_ease-in-out_infinite_0.3s]" style={{ left: '25%', top: '10%', opacity: 0.6 }}>
      <SparkleIcon className="w-full h-full" />
    </div>
    <div className="absolute w-5 h-5 text-gold animate-[float_6s_ease-in-out_infinite_1.8s]" style={{ left: '82%', top: '28%', opacity: 0.5 }}>
      <SparkleIcon className="w-full h-full" />
    </div>
    <div className="absolute w-6 h-6 text-gold animate-[float_7s_ease-in-out_infinite_2.2s]" style={{ left: '10%', top: '38%', opacity: 0.55 }}>
      <SparkleIcon className="w-full h-full" />
    </div>

    {/* Crescent */}
    <div className="absolute w-14 h-14 text-gold animate-[float_9s_ease-in-out_infinite_0.9s]" style={{ left: '55%', top: '18%', opacity: 0.45 }}>
      <CrescentIcon className="w-full h-full" />
    </div>

    {/* Decorative rings — static, low opacity */}
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ opacity: 0.07 }}>
      <circle cx="15%" cy="25%" r="80" stroke="hsl(43, 72%, 55%)" strokeWidth="0.6" fill="none" />
      <circle cx="80%" cy="65%" r="60" stroke="hsl(43, 72%, 55%)" strokeWidth="0.5" fill="none" />
    </svg>

    {/* Noise texture */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
);

export default DecorativeBackgroundLite;
