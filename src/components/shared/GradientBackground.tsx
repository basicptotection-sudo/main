interface GradientBackgroundProps {
    angle?: string;
    from?: string;
    to?: string;
    children: React.ReactNode;
  }
  
  export function GradientBackground({ 
    angle = "90deg", 
    from = "from-primary/10", 
    to = "to-background",
    children 
  }: GradientBackgroundProps) {
    return (
      <div 
        className="relative"
        style={{
          background: `linear-gradient(${angle}, var(${from}), var(${to}))`,
        }}
      >
        {children}
      </div>
    );
  }