import DecorativeBackground from "@/components/DecorativeBackground";
import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <DecorativeBackground />
      
      <img 
        src={logo} 
        alt="Eye Vision Logo" 
        className="w-28 h-28 mb-6 drop-shadow-lg rounded-2xl"
      />
      
      <h1 className="mb-3 text-4xl text-foreground tracking-wide uppercase" style={{ fontFamily: "'Great Vibes', cursive" }}>
        Зрение <span className="text-primary">В Фокусе</span>
      </h1>
      <p className="text-lg text-muted-foreground font-body max-w-sm text-center leading-relaxed">
        Комплекс упражнений для глаз
      </p>
      
      <div className="mt-8 w-full max-w-xs">
        <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 shadow-sm">
          <p className="text-sm text-muted-foreground text-center">
            ✨ Начните свой путь к ясному взгляду
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
