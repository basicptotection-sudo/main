'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { addDocumentNonBlocking } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, Building, Clock, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CoverageSection } from '@/components/shared';
import { locationsData } from '@/lib/locations-data';
import Link from 'next/link';

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères." }),
  message: z.string().min(10, { message: "Votre message doit contenir au moins 10 caractères." }).max(500, { message: "Votre message ne peut pas dépasser 500 caractères." }),
  honeypot: z.string().optional(),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export default function ContactPageClient() {
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const mapImage = PlaceHolderImages.find(p => p.id === 'contact-map');

  const coverageZonesFromData = locationsData.map(loc => ({
    name: loc.name,
    href: `/zones/${loc.slug}`
  }));
  const otherZones = [
      { name: "Yvelines (78)", href: "/devis" },
      { name: "Val-de-Marne (94)", href: "/devis" },
      { name: "Seine-Saint-Denis (93)", href: "/devis" },
      { name: "Essonne (91)", href: "/devis" },
      { name: "Val-d'Oise (95)", href: "/devis" },
      { name: "Seine-et-Marne (77)", href: "/devis" },
  ].filter(zone => !coverageZonesFromData.some(cz => cz.name.includes(zone.name.split(' ')[0])));
  const coverageZones = [...coverageZonesFromData, ...otherZones];

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactForm) {
    if (data.honeypot) {
      console.log("Honeypot triggered!");
      return;
    }

    try {
      const contactCollection = collection(firestore, 'contact_requests');
      const contactData = {
        ...data,
        submissionDate: new Date().toISOString(),
      };
      
      addDocumentNonBlocking(contactCollection, contactData);
      
      router.push('/merci');

    } catch (error) {
      console.error("Error submitting contact form: ", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'envoi",
        description: "Un problème est survenu. Veuillez réessayer ou nous contacter directement.",
      });
    }
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
            <Mail className="mx-auto h-16 w-16 text-primary" />
            <h1 className="mt-4 text-4xl md:text-5xl font-headline font-bold text-primary">
                Contactez-Nous
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
                Une question ? Un besoin spécifique ? Notre équipe est à votre écoute pour vous conseiller et vous orienter vers la meilleure solution de sécurité.
            </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Building className="w-6 h-6 text-primary" /> Nos Coordonnées</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{siteConfig.business.address.street},<br />{siteConfig.business.address.postalCode} {siteConfig.business.address.city}</p>
                         <Button asChild variant="outline" className="w-full">
                            <a href={`mailto:${siteConfig.contact.email}`}>
                                <Mail className="mr-2 h-4 w-4" />
                                {siteConfig.contact.email}
                            </a>
                        </Button>
                         <Button asChild variant="outline" className="w-full">
                            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                {siteConfig.contact.phone}
                            </a>
                        </Button>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Clock className="w-6 h-6 text-primary" /> Horaires d'Ouverture</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">{siteConfig.business.openingHours}</p>
                        <p className="text-sm text-muted-foreground mt-2">Notre ligne d'urgence opérationnelle reste disponible 24h/24, 7j/7 pour les clients sous contrat.</p>
                    </CardContent>
                 </Card>
            </div>
            <div className="lg:col-span-3">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Envoyez-nous un message</CardTitle>
                        <CardDescription>Nous vous répondrons dans les meilleurs délais.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField control={form.control} name="honeypot" render={({ field }) => (<FormItem className="hidden"><FormControl><Input {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom complet</FormLabel>
                                    <FormControl><Input placeholder="Jean Dupont" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adresse e-mail</FormLabel>
                                    <FormControl><Input placeholder="votre@email.com" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="subject" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sujet</FormLabel>
                                    <FormControl><Input placeholder="Demande d'information" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="message" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Votre message</FormLabel>
                                    <FormControl><Textarea placeholder="Bonjour, je souhaiterais..." className="resize-y min-h-[100px]" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" size="lg" className="w-full font-bold" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Envoi..." : "Envoyer le message"}
                            </Button>
                          </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>

      <CoverageSection
        title="Nos Zones d'Intervention"
        description="Notre présence stratégique en Île-de-France nous permet d'assurer une réactivité et une efficacité maximales sur l'ensemble de la région."
        zones={coverageZones}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                    Où nous trouver
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Notre siège est basé à Paris, au cœur de nos zones d'intervention stratégiques.
                </p>
            </div>
            <div className="mt-12 relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                {mapImage && (
                    <Image
                        src={mapImage.imageUrl}
                        alt={mapImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={mapImage.imageHint}
                    />
                )}
                 <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Card className="text-center p-6 bg-background/90">
                        <CardTitle>{siteConfig.business.name}</CardTitle>
                        <CardDescription className="mt-2">
                             {siteConfig.business.address.street}<br/>
                             {siteConfig.business.address.postalCode} {siteConfig.business.address.city}
                        </CardDescription>
                        <Button asChild className="mt-4">
                            <Link href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Voir sur la carte</Link>
                        </Button>
                    </Card>
                 </div>
            </div>
        </div>
      </section>
    </div>
  );
}
