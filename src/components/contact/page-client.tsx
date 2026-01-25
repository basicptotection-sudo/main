"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection } from "firebase/firestore";
import { Mail, Phone, Building, Clock, MapPin, ShieldCheck, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { useToast } from "@/hooks/use-toast";
import { addDocumentNonBlocking } from "@/firebase";
import { useFirestore } from "@/firebase";

import { Breadcrumbs, CoverageSection, AnimateOnScroll } from "@/components/shared";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { locationsData } from "@/lib/locations-data";
import { siteConfig } from "@/lib/config";

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  phone: z.string().optional(),
  company: z.string().optional(),
  requestType: z.enum(["devis", "renseignement", "rdv", "urgence", "autre"], {
    required_error: "Veuillez sélectionner un type de demande.",
  }),
  urgency: z.enum(["standard", "prioritaire", "immediate"], {
    required_error: "Veuillez sélectionner un niveau d’urgence.",
  }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères." }),
  message: z
    .string()
    .min(30, { message: "Ajoutez un peu de contexte (au moins 30 caractères)." })
    .max(1200, { message: "Votre message ne peut pas dépasser 1200 caractères." }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité." }),
  }),
  honeypot: z.string().optional(),
  // “time trap” : si le bot soumet trop vite, on ignore
  startedAt: z.number().optional(),
});

type ContactForm = z.infer<typeof contactFormSchema>;

function phoneToTel(phone: string) {
  return `tel:${String(phone).replace(/\s/g, "").trim()}`;
}

export default function ContactPageClient() {
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();

  const mapImage = PlaceHolderImages.find((p) => p.id === "contact-map");
  const heroImage = PlaceHolderImages.find((p) => p.id === "contact-hero") ?? mapImage;

  const [startTs, setStartTs] = useState<number>(() => Date.now());

  useEffect(() => {
    setStartTs(Date.now());
  }, []);

  const coverageZones = useMemo(() => {
    const fromData = locationsData.map((loc) => ({
      name: loc.name,
      href: `/zones/${loc.slug}`,
    }));

    const otherZones = [
      { name: "Paris (75)", href: "/devis" },
      { name: "Hauts-de-Seine (92)", href: "/devis" },
      { name: "Seine-Saint-Denis (93)", href: "/devis" },
      { name: "Val-de-Marne (94)", href: "/devis" },
      { name: "Val-d'Oise (95)", href: "/devis" },
      { name: "Yvelines (78)", href: "/devis" },
      { name: "Essonne (91)", href: "/devis" },
      { name: "Seine-et-Marne (77)", href: "/devis" },
    ].filter(
      (z) => !fromData.some((cz) => cz.name.toLowerCase().includes(z.name.split(" ")[0].toLowerCase()))
    );

    return [...fromData, ...otherZones];
  }, []);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      requestType: "devis",
      urgency: "standard",
      subject: "",
      message: "",
      consent: true,
      honeypot: "",
      startedAt: startTs,
    },
    mode: "onTouched",
  });

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Contact", href: "/contact" },
  ];

  async function onSubmit(values: ContactForm) {
    // Honeypot
    if (values.honeypot) return;

    // Time trap: si envoi en < 2.2s, probablement un bot
    const elapsed = Date.now() - (values.startedAt ?? startTs);
    if (elapsed < 2200) return;

    try {
      const contactCollection = collection(firestore, "contact_requests");

      const payload = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone?.trim() || null,
        company: values.company?.trim() || null,
        requestType: values.requestType,
        urgency: values.urgency,
        subject: values.subject,
        message: values.message,
        submissionDate: new Date().toISOString(),
        source: "contact_page",
        pageUrl: "/contact",
      };

      addDocumentNonBlocking(contactCollection, payload);

      router.push("/merci");
    } catch (error) {
      console.error("Error submitting contact form: ", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'envoi",
        description:
          "Un problème est survenu. Veuillez réessayer ou nous contacter directement.",
      });
    }
  }

  const tel = phoneToTel(siteConfig.contact.phone);
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="bg-background text-foreground">
      {/* HERO — premium */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          {heroImage?.imageUrl ? (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description ?? "Contact — Basic Protection"}
              fill
              priority
              className="object-cover opacity-25"
              data-ai-hint={heroImage.imageHint}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>

        <div className="relative container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Breadcrumbs items={breadcrumbItems} centered className="mb-6" />
            </div>

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Réponse rapide • Dispositifs sur-mesure • Île-de-France
              </span>
            </div>

            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Contactez <span className="text-primary">Basic Protection</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Une question, un devis, une mission urgente ? Décrivez votre contexte :
              nous revenons vers vous avec une réponse claire et structurée.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-xl font-semibold">
                <Link href="/devis">
                  Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <a href={tel}>
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["Devis 24/48h", "Encadrement", "Reporting", "Conformité"].map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* ASIDE INFOS */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-primary" />
                  Nos coordonnées
                </CardTitle>
                <CardDescription>
                  Contact direct ou message via le formulaire.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-border bg-muted/10 p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                    <div className="text-sm">
                      <div className="font-semibold">{siteConfig.business.name}</div>
                      <div className="text-muted-foreground">
                        {siteConfig.business.address.street}
                        <br />
                        {siteConfig.business.address.postalCode} {siteConfig.business.address.city}
                      </div>
                    </div>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full rounded-xl">
                  <a href={mailto}>
                    <Mail className="mr-2 h-4 w-4" />
                    {siteConfig.contact.email}
                  </a>
                </Button>

                <Button asChild variant="outline" className="w-full rounded-xl">
                  <a href={tel}>
                    <Phone className="mr-2 h-4 w-4" />
                    {siteConfig.contact.phone}
                  </a>
                </Button>

                <Separator />

                <div className="rounded-xl border border-border bg-muted/10 p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div className="text-sm">
                      <div className="font-semibold">Horaires</div>
                      <div className="text-muted-foreground">{siteConfig.business.openingHours}</div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Ligne d’urgence opérationnelle 24/7 pour les clients sous contrat.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="text-sm font-semibold">Pour accélérer le devis</div>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>• Type de site / événement</li>
                    <li>• Adresse + horaires + durée</li>
                    <li>• Accès / flux / zones sensibles</li>
                    <li>• Niveau de filtrage / VIP / ERP</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* MINI FAQ (conversion) */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Questions rapides</CardTitle>
                <CardDescription>Les réponses les plus demandées.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="rounded-xl border border-border bg-muted/10 p-4">
                  <div className="font-semibold text-foreground">Quel délai de réponse ?</div>
                  <div className="mt-1">
                    Généralement sous 24/48h (plus rapide pour les urgences).
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-muted/10 p-4">
                  <div className="font-semibold text-foreground">Intervenez-vous en IDF ?</div>
                  <div className="mt-1">
                    Oui : 75, 92, 93, 94, 95, 78, 77, 91.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FORM */}
          <div className="lg:col-span-3">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
                <CardDescription>
                  Décrivez votre besoin : nous vous répondons avec une proposition structurée.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* honeypot */}
                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input {...field} tabIndex={-1} autoComplete="off" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* startedAt */}
                    <FormField
                      control={form.control}
                      name="startedAt"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input
                              {...field}
                              value={String(field.value ?? startTs)}
                              onChange={() => {}}
                              tabIndex={-1}
                              readOnly
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean Dupont" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="votre@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone (optionnel)</FormLabel>
                            <FormControl>
                              <Input placeholder="06 00 00 00 00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Société (optionnel)</FormLabel>
                            <FormControl>
                              <Input placeholder="Nom de votre société" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="requestType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type de demande</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="devis">Demande de devis</SelectItem>
                                <SelectItem value="renseignement">Renseignement</SelectItem>
                                <SelectItem value="rdv">Demande de rendez-vous</SelectItem>
                                <SelectItem value="urgence">Mission urgente</SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="urgency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Niveau d’urgence</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-3 gap-2"
                              >
                                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-muted/10 px-3 py-2 text-sm">
                                  <RadioGroupItem value="standard" />
                                  Standard
                                </label>
                                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-muted/10 px-3 py-2 text-sm">
                                  <RadioGroupItem value="prioritaire" />
                                  Prioritaire
                                </label>
                                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-muted/10 px-3 py-2 text-sm">
                                  <RadioGroupItem value="immediate" />
                                  Immédiat
                                </label>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex : Sécurisation d’un événement corporate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Votre message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex : lieu, date, horaires, effectif attendu, zones sensibles, contraintes, niveau de filtrage…"
                              className="min-h-[140px] resize-y"
                              {...field}
                            />
                          </FormControl>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Astuce : plus il y a de contexte, plus la réponse sera précise.
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-start gap-3">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="text-sm">
                              <FormLabel className="leading-snug">
                                J’accepte que mes informations soient utilisées pour être recontacté.
                              </FormLabel>
                              <div className="text-xs text-muted-foreground">
                                Voir notre{" "}
                                <Link href="/politique-de-confidentialite" className="underline">
                                  politique de confidentialité
                                </Link>
                                .
                              </div>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-xl font-semibold"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Envoi..." : "Envoyer le message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* COVERAGE */}
      <CoverageSection
        title="Zones d’intervention"
        description="Notre présence en Île-de-France nous permet d’assurer réactivité et continuité opérationnelle."
        zones={coverageZones}
      />

      {/* MAP */}
      <section className="border-t border-border bg-background py-14 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Où nous trouver
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Notre siège est basé à Paris, au cœur de nos zones d’intervention.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-sm">
            <div className="relative h-[420px] w-full">
              {mapImage?.imageUrl ? (
                <Image
                  src={mapImage.imageUrl}
                  alt={mapImage.description ?? "Carte — Basic Protection"}
                  fill
                  className="object-cover"
                  data-ai-hint={mapImage.imageHint}
                />
              ) : null}
              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute inset-0 flex items-center justify-center p-4">
                <Card className="w-full max-w-md rounded-2xl bg-background/90 backdrop-blur">
                  <CardHeader>
                    <CardTitle>{siteConfig.business.name}</CardTitle>
                    <CardDescription>
                      {siteConfig.business.address.street}
                      <br />
                      {siteConfig.business.address.postalCode} {siteConfig.business.address.city}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <Button asChild className="rounded-xl">
                      <Link
                        href={siteConfig.business.mapsUrl ?? "https://www.google.com/maps"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ouvrir dans Google Maps
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-xl">
                      <a href={tel}>
                        <Phone className="mr-2 h-4 w-4" />
                        Appeler
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Besoin d’une intervention rapide ? Passez par{" "}
            <Link href="/devis" className="underline">
              la demande de devis
            </Link>{" "}
            pour une qualification plus précise.
          </p>
        </div>
      </section>
    </div>
  );
}