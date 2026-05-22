import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Onboarding from "@/components/Onboarding";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MonParcours VAE",
  description: "Votre accompagnement VAE personnalisé",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2D6A4F",
};

/* Anti-flash: apply saved theme before React hydrates */
const themeScript = `try{var t=localStorage.getItem('vae_theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}`;

/* PWA startup: redirect to "/" on direct launch (no referrer = opened from home screen) */
const pwaStartScript = `try{var sa=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone;if(sa&&window.location.pathname!=='/'&&!document.referrer)window.location.replace('/');}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: pwaStartScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Onboarding />
          <main className="pb-20 min-h-screen bg-background">
            <PageTransition>{children}</PageTransition>
          </main>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
