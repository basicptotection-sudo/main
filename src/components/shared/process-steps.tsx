import { FileText, MessageCircle, ShieldCheck, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: <MessageCircle className="w-10 h-10 text-primary" />,
    title: "1. Prise de Contact",
    description: "Échangez avec nos experts pour définir précisément vos besoins en sécurité.",
  },
  {
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "2. Audit & Devis",
    description: "Nous analysons vos risques et vous proposons une solution sur-mesure et chiffrée.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "3. Mise en Place",
    description: "Nos agents qualifiés sont déployés sur votre site selon le plan convenu.",
  },
  {
    icon: <ThumbsUp className="w-10 h-10 text-primary" />,
    title: "4. Suivi & Qualité",
    description: "Nous assurons un suivi régulier pour garantir votre entière satisfaction.",
  },
];

export function ProcessSteps() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Notre Démarche en 4 Étapes Clés
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un processus simple et transparent pour une mise en service rapide et efficace de votre protection.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Card key={step.title} className="text-center border-none bg-transparent shadow-none">
              <CardHeader className="items-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                    {step.icon}
                </div>
                <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
