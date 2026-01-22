'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next';
import { servicesData } from '@/lib/services-data';
import { addDocumentNonBlocking } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, Mail, Phone } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Demande de Devis - Sécurité Privée',
  description: 'Obtenez une proposition sur-mesure pour nos services de sécurité privée. Remplissez notre formulaire pour une analyse confidentielle de vos besoins.',
  alternates: {
    canonical: '/devis',
  },
};

const serviceTitles = servicesData.map(s => s.title) as [string, ...string[]];

const quoteRequestSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  phone: z.string().min(10, { message: "Le numéro de téléphone doit contenir au moins 10 chiffres." }),
  company: z.string().optional(),
  serviceOfInterest: z.enum(serviceTitles, {
    errorMap: () => ({ message: "Veuillez sélectionner un service." }),
  }),
  message: z.string().min(10, { message: "Votre message doit contenir au moins 10 caractères." }).max(500, { message: "Votre message ne peut pas dépasser 500 caractères." }),
  honeypot: z.string().optional(), // Honeypot field
});

type QuoteRequestForm = z.infer<typeof quoteRequestSchema>;

export default function DevisPage() {
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<QuoteRequestForm>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    },
  });

  async function onSubmit(data: QuoteRequestForm) {
    if (data.honeypot) {
      // It's a bot!
      console.log("Honeypot triggered!");
      return;
    }

    try {
      const leadsCollection = collection(firestore, 'lead_requests');
      const leadData = {
        ...data,
        submissionDate: new Date().toISOString(),
        ipAddress: 'not-collected', // Placeholder for server-side collection
      };
      
      // Non-blocking fire-and-forget write to Firestore
      addDocumentNonBlocking(leadsCollection, leadData);
      
      // Placeholder for analytics event
      console.log('Analytics Event: submit_devis', { service: data.serviceOfInterest });

      // Redirect to thank you page
      router.push('/merci');

    } catch (error) {
      console.error("Error submitting quote: ", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la soumission",
        description: "Un problème est survenu. Veuillez réessayer ou nous contacter directement.",
      });
    }
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
            <ShieldCheck className="mx-auto h-16 w-16 text-primary" />
            <h1 className="mt-4 text-4xl md:text-5xl font-headline font-bold text-primary">
                Demandez votre devis confidentiel
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
                Remplissez le formulaire ci-dessous pour nous faire part de vos besoins. Un de nos experts vous contactera sous 24h pour une analyse approfondie et une proposition sur-mesure, en toute discrétion.
            </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Informations sur votre projet</CardTitle>
                        <CardDescription>Plus vos informations sont précises, plus notre proposition sera pertinente.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                             {/* Honeypot Field */}
                            <FormField
                              control={form.control}
                              name="honeypot"
                              render={({ field }) => (
                                <FormItem className="hidden">
                                  <FormLabel>Ne pas remplir</FormLabel>
                                  <FormControl>
                                    <Input {...field} autoComplete="off" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                      <FormLabel>Adresse e-mail *</FormLabel>
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
                                      <FormLabel>Société (facultatif)</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Nom de votre entreprise" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                            </div>

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
                                      {serviceTitles.map(title => (
                                        <SelectItem key={title} value={title}>{title}</SelectItem>
                                      ))}
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
                                  <FormLabel>Votre message *</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Décrivez votre besoin, le contexte, les dates et lieux souhaités..."
                                      className="resize-y min-h-[120px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Maximum 500 caractères.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <Button type="submit" size="lg" className="w-full font-bold" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                            </Button>
                          </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-8">
                 <Card className="bg-primary/5 border-primary/20">
                     <CardHeader>
                        <CardTitle className="text-primary">Nos Garanties</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" /><span><strong className="text-foreground">Confidentialité 100% assurée</strong><br/>Toutes les informations sont traitées avec la plus grande discrétion.</span></p>
                        <p className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" /><span><strong className="text-foreground">Experts certifiés</strong><br/>Votre demande est analysée par un directeur d'opérations expérimenté.</span></p>
                        <p className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" /><span><strong className="text-foreground">Proposition sans engagement</strong><br/>Recevez une proposition détaillée et transparente.</span></p>
                    </CardContent>
                 </Card>
                 <Card>
                     <CardHeader>
                        <CardTitle>Contact Direct</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Vous préférez un contact direct ?</p>
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
            </div>
        </div>
      </div>
    </div>
  );
}
