import { type ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { api } from "@/lib/api";
import { setDynamicImages } from "@/lib/site-data";

export function SiteLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    api.getSettings().then((settings) => {
      setDynamicImages(settings);
    }).catch((error) => {
      console.error('Failed to load site settings:', error);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
