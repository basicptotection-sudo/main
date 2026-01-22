import Image from "next/image";

type Logo = {
    src: string;
    alt: string;
}

type TrustBarProps = {
    logos: Logo[];
}

export function TrustBar({ logos }: TrustBarProps) {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-6">
          Ils nous font confiance
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {logos.map((logo, index) => (
            <div key={index} className="relative h-10 w-28 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
