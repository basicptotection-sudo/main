
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useFirestore } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection } from "firebase/firestore";

import { CTASection } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";


import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const COMPANY = {
  name: "Basic Protection Privée",
  email: "contact@basic-protection.fr",
  phone: "+33677932831",
  phoneDisplay: "06 77 93 28 31",
  address: "5 rue des Frères Lumière, 78370 Plaisir",
  area: "Île-de-France (Paris, 78, 92, 93, 94)",
};

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet est requis." }),
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  subject: z.string().min(3, { message: "Veuillez préciser un sujet." }),
  message: z.string().min(10, { message: "Votre message doit contenir au moins 10 caractères." }),
  company: z.string().optional(),
  phone: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPageClient() {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "devis", // Valeur par défaut pour le select
      message: "",
      company: "",
      phone: ""
    },
  });

  async function onSubmit(data: ContactFormValues) {
    try {
      const contactCollection = collection(firestore, 'contact_requests');
      
      const submissionData = {
        ...data,
        submissionDate: new Date().toISOString(),
      };
      
      addDocumentNonBlocking(contactCollection, submissionData);

      router.push('/merci');
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire de contact:", error);
      toast({
        variant: "destructive",
        title: "Une erreur est survenue",
        description: "Votre message n'a pas pu être envoyé. Veuillez réessayer ou nous contacter directement.",
      });
    }
  }

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="pt-14 md:pt-20 pb-10 md:pb-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Contact & devis
            </Badge>

            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary leading-tight">
              Parlons de votre besoin en sécurité.
            </h1>

            <p className="mt-5 text-lg text-muted-foreground">
              Décrivez votre site, vos horaires et vos contraintes : nous vous
              proposons un dispositif clair et adapté (gardiennage, rondes,
              contrôle d’accès, événementiel). Basés à{" "}
              <strong className="text-foreground">Plaisir (78370)</strong>, nous
              intervenons en{" "}
              <strong className="text-foreground">Île-de-France</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild className="w-full sm:w-auto">
                <a href={`tel:${COMPANY.phone}`}>
                  Appeler {COMPANY.phoneDisplay}
                </a>
              </Button>

              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-2">
                <ShieldCheck className="w-4 h-4" />
                Dispositifs cadrés
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Suivi & reporting
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <Clock className="w-4 h-4" />
                Réponse rapide
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Layout */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-7">
              <Card className="border bg-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">
                    Envoyer une demande
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Plus vous êtes précis, plus nous pouvons cadrer rapidement
                    (site, horaires, effectifs, contexte, contraintes).
                  </p>
                </CardHeader>

                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom & prénom *</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex : Amar Hachour" {...field} />
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
                              <FormLabel>Entreprise (optionnel)</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex : Société XYZ" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="vous@domaine.fr" {...field} />
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
                              <FormLabel>Téléphone (optionnel)</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="06 00 00 00 00" {...field} />
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
                            <FormLabel>Sujet *</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger aria-label="Sujet">
                                  <SelectValue placeholder="Choisir un sujet" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="devis">Demande de devis</SelectItem>
                                  <SelectItem value="gardiennage">Gardiennage / surveillance</SelectItem>
                                  <SelectItem value="rondes">Rondes & interventions</SelectItem>
                                  <SelectItem value="controle-acces">Contrôle d’accès</SelectItem>
                                  <SelectItem value="evenementiel">Sécurité événementielle</SelectItem>
                                  <SelectItem value="autre">Autre</SelectItem>
                                </SelectContent>
                              </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Décrivez le besoin *</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={7}
                                placeholder="Contexte, risques, public, accès, nombre de points sensibles, consignes, contraintes…"
                                {...field}
                              />
                            </FormControl>
                             <p className="mt-2 text-xs text-muted-foreground">
                              Astuce : indiquez le type de site (commerce, chantier,
                              résidence, événement), la plage horaire et le niveau
                              d’urgence.
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
                        <p className="text-xs text-muted-foreground">
                          En envoyant ce formulaire, vous acceptez d’être recontacté
                          pour traiter votre demande.
                        </p>

                        <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </form>
                  </Form>

                  <Separator />

                  <div className="text-sm text-muted-foreground">
                    Besoin d’un traitement plus rapide ?{" "}
                    <a className="underline" href={`tel:${COMPANY.phone}`}>
                      Appelez-nous
                    </a>{" "}
                    ou envoyez un email à{" "}
                    <a className="underline" href={`mailto:${COMPANY.email}`}>
                      {COMPANY.email}
                    </a>
                    .
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side info */}
            <aside className="lg:col-span-5 space-y-6">
              {/* Option : Google Maps embed (sans JS lourd) */}
              <Card className="border overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Localisation</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <iframe
                    title="Carte - Basic Protection Privée"
                    className="w-full h-[320px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      COMPANY.address
                    )}&output=embed`}
                  />
                </CardContent>
              </Card>
            
              <Card className="border bg-card">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">
                    Coordonnées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-primary/10 rounded-xl p-3 shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Adresse</p>
                      <p className="text-sm text-muted-foreground">
                        {COMPANY.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-primary/10 rounded-xl p-3 shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Téléphone</p>
                      <a
                        className="text-sm text-muted-foreground hover:underline"
                        href={`tel:${COMPANY.phone}`}
                      >
                        {COMPANY.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-primary/10 rounded-xl p-3 shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a
                        className="text-sm text-muted-foreground hover:underline"
                        href={`mailto:${COMPANY.email}`}
                      >
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-primary/10 rounded-xl p-3 shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Disponibilité</p>
                      <p className="text-sm text-muted-foreground">
                        Réponse rapide (jours ouvrés) — intervention en {COMPANY.area}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/services">Voir nos prestations</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-muted/20">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">
                    Pour un devis précis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Préparez ces éléments (si possible) :</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Type de site (commerce, chantier, immeuble, événement…)</li>
                    <li>Adresse du site et plages horaires</li>
                    <li>Objectifs (dissuasion, contrôle d’accès, ronde…)</li>
                    <li>Contraintes (public, badges, procédures, accès)</li>
                  </ul>
                  <p className="pt-2">
                    On vous répond avec une proposition claire : effectifs,
                    organisation, consignes, et modalités de suivi.
                  </p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA bas de page */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <CTASection
            title="Besoin d’un dispositif de sécurité fiable en Île-de-France ?"
            description="Par téléphone, email ou formulaire : on analyse votre contexte et on vous propose un cadrage clair."
            cta={{ label: "Demander un devis", href: "/devis" }}
          />
        </div>
      </section>
    </main>
  );
}
