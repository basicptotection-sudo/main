'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Use a timeout to avoid hydration issues and to not be too intrusive on page load
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('cookie_consent');
      if (consent !== 'true') {
        setShowBanner(true);
      }
    }, 1500); // Wait 1.5s before showing

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 z-[100] w-full max-w-sm transition-transform duration-500 ease-in-out',
        showBanner ? 'translate-x-0' : '-translate-x-[calc(100%+2rem)]'
      )}
    >
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            <span>Votre vie privée</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Ce site utilise des cookies pour améliorer votre expérience utilisateur et analyser le trafic. En continuant, vous acceptez notre utilisation des cookies.
            Consultez notre{' '}
            <Link href="/politique-de-confidentialite" className="underline hover:text-primary">
              politique de confidentialité
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-3">
            <Button onClick={handleAccept} className="w-full">
              Accepter
            </Button>
            <Button onClick={handleAccept} variant="outline" className="w-full">
              Refuser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
