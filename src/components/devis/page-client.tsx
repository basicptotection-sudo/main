"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { collection } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { ShieldCheck, Mail, Phone, ArrowRight, Sparkles } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase";

import { servicesData } from "@/lib/services-data";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/shared";

const serviceTitles = servicesData.map((s) => s.title) as [string, ...string[]];

const quoteRequestSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  phone: z.string().min(10, { message: "Le numéro de téléphone doit contenir au moins 10 chiffres." }),
  company: z.string().optional(),

  serviceOfInterest: z.enum(serviceTitles, {
    errorMap: () => ({ message: "Veuillez sélectionner un service." }),
  }),

  requestType: z.enum(["site", "evenement", "vip", "cynophile", "incendie", "autre"], {
    required_error: "Veuillez sélectionner le type de besoin.",
  }),

  urgency: z.enum(["standard", "prioritaire", "immediate"], {
    required_error: "Veuillez sélectionner un niveau d’urgence.",
  }),

  // Infos “qualif” (optionnelles mais très utiles)
  locationCity: z.string().optional(),
  preferredDate: z.string().optional(), // date input (YYYY-MM-DD)
  durationHours: z.string().optional(), // ex: "8"
  expectedPeople: z.string().optional(), // ex: "350"

  message: z
    .string()
    .min(30, { message: "Ajoutez un peu de contexte (au moins 30 caractères)." })
    .max(1200, { message: "Votre message ne peut pas dépasser 1200 caractères." }),

  consent: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité." }),
  }),

  honeypot: z.string().optional(),
  startedAt: z.number().optional(),
});

type QuoteRequestForm = z.infer<typeof quoteRequestSchema>;

function phoneToTel(phone: string) {
  return `tel:${String(phone).replace(/\s/g, "").trim()}`;
}

export default function DevisPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { toast } = useToast();
  const firestore = useFirestore();

  const [startTs, setStartTs] = useState<number>(() => Date.now());
  useEffect(() => setStartTs(Date.now()), []);

  const tel = phoneToTel(siteConfig.contact.phone);
  const mailto = `mailto:${siteConfig.contact.email}`;

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Devis", href: "/devis" },
  ];

  const form = useForm<QuoteRequestForm>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      serviceOfInterest: serviceTitles[0],
      requestType: "site",
      urgency: "standard",
      locationCity: "",
      preferredDate: "",
      durationHours: "",
      expectedPeople: "",
      message: "",
      consent: true,
      honeypot: "",
      startedAt: startTs,
    },
    mode: "onTouched",
  });

  // Pré-sélection service via ?service=...
  useEffect(() => {
    const svc = searchParams?.get("service");
    if (!svc) return;

    const matched = serviceTitles.find((t) => t.toLowerCase() === svc.toLowerCase());
    if (matched) form.setValue("serviceOfInterest", matched);
  }, [searchParams, form]);

  async function onSubmit(values: QuoteRequestForm) {
    // Honeypot
    if (values.honeypot) return;

    // Time trap (anti-bot) : < 2.2s = suspect
    const elapsed = Date.now() - (values.startedAt ?? startTs);
    if (elapsed < 2200) return;

    try {
      const leadsCollection = collection(firestore, "lead_requests");

      const leadData = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        company: values.company?.trim() || null,

        serviceOfInterest: values.serviceOfInterest,
        requestType: values.requestType,
        urgency: values.urgency,

        locationCity: values.locationCity?.trim() || null,
        preferredDate: values.preferredDate || null,
        durationHours: values.durationHours || null,
        expectedPeople: values.expectedPeople || null,

        message: values.message,

        submissionDate: new Date().toISOString(),
        source: "devis_page",
        pageUrl: "/devis",
        ipAddress: "not-collected",
      };

      addDocumentNonBlocking(leadsCollection, leadData);

      // analytics placeholder
      console.log("Analytics Event: submit_devis", { service: values.serviceOfInterest });

      router.push("/merci");
    } catch (error) {
      console.error("Error submitting quote: ", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la soumission",
        description:
          "Un problème est survenu. Veuillez réessayer ou nous contacter directement.",
      });
    }
  }

  const serviceHint = useMemo(() => {
    const s = servicesData.find((x) => x.title === form.watch("serviceOfInterest"));
    return s?.description ?? "";
  }, [form]);

  return (
    <div className="bg-background text-foreground">
      {/* HERO premium */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>

        <div className="relative container mx-auto max-w-6xl px-4 py-14 md:py-18">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Breadcrumbs items={breadcrumbItems} centered className="mb-6" />
            </div>

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Devis 24/48h • Confidentialité • Dispositif sur-mesure
              </span>
            </div>

            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Demandez votre <span className="text-primary">devis confidentiel</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Décrivez votre besoin : nous analysons le contexte (site, flux, risques, contraintes)
              et nous vous proposons une solution claire, chiffrée et encadrée.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["Sans engagement", "Réponse rapide", "Encadrement", "Conformité"].map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* FORM */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Informations sur votre projet</CardTitle>
                <CardDescription>
                  Plus les informations sont précises, plus la proposition sera pertinente.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                    {/* Honeypot */}
                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormLabel>Ne pas remplir</FormLabel>
                          <FormControl>
                            <Input {...field} autoComplete="off" tabIndex={-1} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* startedAt (anti-bot) */}
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
                              readOnly
                              tabIndex={-1}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet *</FormLabel>
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
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input placeholder="jean.dupont@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone *</FormLabel>
                            <FormControl>
                              <Input placeholder="06 12 34 56 78" {...field} />
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
                              <Input placeholder="Nom de votre entreprise" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="serviceOfInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service souhaité *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceTitles.map((title) => (
                                  <SelectItem key={title} value={title}>
                                    {title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {serviceHint ? (
                              <FormDescription className="mt-2">
                                {serviceHint}
                              </FormDescription>
                            ) : null}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="requestType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contexte *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choisir" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="site">Sécurisation de site</SelectItem>
                                <SelectItem value="evenement">Sécurité événementielle</SelectItem>
                                <SelectItem value="vip">VIP / protection renforcée</SelectItem>
                                <SelectItem value="cynophile">Cynophile</SelectItem>
                                <SelectItem value="incendie">Sécurité incendie (SSIAP)</SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Niveau d’urgence *</FormLabel>
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

                    {/* Qualif (optionnel) */}
                    <div className="grid gap-5 md:grid-cols-4">
                      <FormField
                        control={form.control}
                        name="locationCity"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Ville / secteur (optionnel)</FormLabel>
                            <FormControl>
                              <Input placeholder="Paris, 92, 93, 94..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date (optionnel)</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="durationHours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Durée (h) (optionnel)</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex : 8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="expectedPeople"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Effectif / public attendu (optionnel)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex : 150 participants" {...field} />
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
                          <FormLabel>Votre message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez : site/événement, horaires, accès, zones sensibles, niveau de filtrage, contraintes, objectifs…"
                              className="min-h-[150px] resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Jusqu’à 1200 caractères. (Astuce : plus de contexte = devis plus précis.)
                          </FormDescription>
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
                      {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* ASIDE */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-primary/25 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary">Nos garanties</CardTitle>
                <CardDescription>Ce que vous obtenez, concrètement.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Confidentialité</div>
                    <div>Vos informations sont traitées avec discrétion.</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Analyse du besoin</div>
                    <div>Qualification + recommandation de dispositif adapté.</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Proposition claire</div>
                    <div>Devis détaillé, périmètre, postes, horaires, options.</div>
                  </div>
                </div>

                <Separator />

                <div className="rounded-xl border border-border bg-background/70 p-4">
                  <div className="text-sm font-semibold text-foreground">
                    Conseil rapide (utile)
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>• Indique la date + horaires</li>
                    <li>• Décris les accès / flux</li>
                    <li>• Précise VIP / alcool / ERP</li>
                    <li>• Mentionne contraintes du site</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Contact direct</CardTitle>
                <CardDescription>Si vous préférez un échange immédiat.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
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
                <Button asChild className="w-full rounded-xl">
                  <Link href="/services">
                    Voir nos services <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}