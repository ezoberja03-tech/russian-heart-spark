import { motion } from "framer-motion";

const EyeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 50" fill="none" className={className}>
    <path
      d="M40 5C20 5 5 25 5 25s15 20 35 20 35-20 35-20S60 5 40 5z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.3"
    />
    <circle cx="40" cy="25" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
    <circle cx="40" cy="25" r="4" fill="currentColor" opacity="0.15" />
  </svg>
);

const LeafIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 60" fill="none" className={className}>
    <path
      d="M20 55C20 55 5 35 5 20C5 8 12 2 20 2C28 2 35 8 35 20C35 35 20 55 20 55Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path d="M20 50V10" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <path d="M20 20C15 17 10 18 10 18" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
    <path d="M20 28C25 25 30 26 30 26" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
  </svg>
);

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14 8L22 6L16 12L22 18L14 16L12 24L10 16L2 18L8 12L2 6L10 8L12 0Z" opacity="0.3" />
  </svg>
);

const FlowerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 50 50" fill="none" className={className}>
    <circle cx="25" cy="25" r="5" fill="currentColor" fillOpacity="0.15" />
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <ellipse
        key={angle}
        cx="25"
        cy="12"
        rx="6"
        ry="10"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
        transform={`rotate(${angle} 25 25)`}
      />
    ))}
  </svg>
);

const decorativeElements = [
  // Eyes
  { Component: EyeIcon, x: "5%", y: "8%", size: "w-20 h-12", color: "text-mint", delay: 0, animation: "animate-float" },
  { Component: EyeIcon, x: "78%", y: "15%", size: "w-16 h-10", color: "text-olive", delay: 1, animation: "animate-float-slow" },
  { Component: EyeIcon, x: "60%", y: "70%", size: "w-24 h-14", color: "text-blush", delay: 2, animation: "animate-float" },
  { Component: EyeIcon, x: "15%", y: "55%", size: "w-14 h-8", color: "text-mint", delay: 3, animation: "animate-float-slow" },
  { Component: EyeIcon, x: "88%", y: "45%", size: "w-18 h-10", color: "text-olive", delay: 0.5, animation: "animate-float" },
  { Component: EyeIcon, x: "40%", y: "85%", size: "w-16 h-10", color: "text-blush", delay: 1.5, animation: "animate-float-slow" },

  // Leaves
  { Component: LeafIcon, x: "92%", y: "5%", size: "w-10 h-14", color: "text-olive", delay: 0.8, animation: "animate-float-slow" },
  { Component: LeafIcon, x: "3%", y: "75%", size: "w-8 h-12", color: "text-mint", delay: 2.5, animation: "animate-float" },
  { Component: LeafIcon, x: "70%", y: "90%", size: "w-10 h-14", color: "text-olive", delay: 1.2, animation: "animate-float-slow" },

  // Sparkles (gold)
  { Component: SparkleIcon, x: "25%", y: "12%", size: "w-6 h-6", color: "text-gold", delay: 0.3, animation: "animate-shimmer" },
  { Component: SparkleIcon, x: "82%", y: "30%", size: "w-5 h-5", color: "text-gold-light", delay: 1.8, animation: "animate-shimmer" },
  { Component: SparkleIcon, x: "50%", y: "5%", size: "w-4 h-4", color: "text-gold-shimmer", delay: 0.7, animation: "animate-shimmer" },
  { Component: SparkleIcon, x: "10%", y: "40%", size: "w-5 h-5", color: "text-gold", delay: 2.2, animation: "animate-shimmer" },
  { Component: SparkleIcon, x: "65%", y: "50%", size: "w-4 h-4", color: "text-gold-light", delay: 1.1, animation: "animate-shimmer" },
  { Component: SparkleIcon, x: "35%", y: "65%", size: "w-6 h-6", color: "text-gold", delay: 0.4, animation: "animate-shimmer" },
  { Component: SparkleIcon, x: "90%", y: "75%", size: "w-3 h-3", color: "text-gold-shimmer", delay: 2.8, animation: "animate-shimmer" },

  // Flowers
  { Component: FlowerIcon, x: "30%", y: "25%", size: "w-12 h-12", color: "text-blush", delay: 1.5, animation: "animate-float" },
  { Component: FlowerIcon, x: "75%", y: "60%", size: "w-10 h-10", color: "text-blush", delay: 0.6, animation: "animate-float-slow" },
  { Component: FlowerIcon, x: "48%", y: "42%", size: "w-8 h-8", color: "text-mint", delay: 2, animation: "animate-float" },
];

const DecorativeBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 20%, hsl(var(--mint-light) / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 15%, hsl(var(--blush-light) / 0.4) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 80%, hsl(var(--olive-light) / 0.35) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, hsl(var(--beige-warm) / 0.4) 0%, transparent 45%),
            radial-gradient(ellipse at 20% 60%, hsl(var(--gold-light) / 0.15) 0%, transparent 40%),
            hsl(var(--background))
          `,
        }}
      />

      {/* Watercolor-style soft blobs */}
      <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-mint-light/20 blur-3xl" />
      <div className="absolute top-[60%] right-[10%] w-48 h-48 rounded-full bg-blush-light/25 blur-3xl" />
      <div className="absolute bottom-[15%] left-[30%] w-56 h-56 rounded-full bg-olive-light/20 blur-3xl" />
      <div className="absolute top-[30%] right-[25%] w-40 h-40 rounded-full bg-beige-warm/25 blur-3xl" />
      <div className="absolute top-[45%] left-[50%] w-32 h-32 rounded-full bg-gold-light/10 blur-2xl" />

      {/* Gold accents - thin lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none">
        <circle cx="15%" cy="25%" r="80" stroke="hsl(43, 72%, 55%)" strokeWidth="0.5" fill="none" />
        <circle cx="80%" cy="65%" r="60" stroke="hsl(43, 72%, 55%)" strokeWidth="0.5" fill="none" />
        <path d="M0,300 Q200,250 400,300 T800,280" stroke="hsl(43, 72%, 55%)" strokeWidth="0.4" fill="none" />
      </svg>

      {/* Floating decorative elements */}
      {decorativeElements.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} ${item.color} ${item.animation}`}
          style={{ left: item.x, top: item.y, animationDelay: `${item.delay}s` }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: item.delay * 0.3 }}
        >
          <item.Component className="w-full h-full" />
        </motion.div>
      ))}

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default DecorativeBackground;
