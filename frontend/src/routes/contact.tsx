import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2, Send } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ORG, IMG } from "@/lib/site-data";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { breadcrumbJsonLd, createPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    createPageSeo({
      title: "Contact Baroda Youth Federation — Get in touch",
      description: "Reach Baroda Youth Federation by email, phone, WhatsApp or visit our office in Vadodara.",
      path: "/contact",
      keywords: ["contact Baroda Youth Federation", "Baroda Youth Federation phone", "Vadodara NGO contact"],
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    }),
  component: ContactPage,
});

function ContactPage() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    api.getSettings().then((data) => {
      setSettings(data);
    }).catch((error) => {
      console.error('Failed to fetch settings:', error);
    });
  }, []);

  const org = settings ? {
    name: ORG.name,
    email: settings.email || ORG.email,
    phone: settings.phone || ORG.phone,
    address: settings.address || ORG.address,
    whatsapp: settings.whatsapp || ORG.whatsapp,
    whatsappName: settings.whatsappName || ORG.whatsappName,
  } : ORG;

  const heroImage = settings?.contactHeroImage ? imageUrl(settings.contactHeroImage) : IMG.heroEducation;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    
    setLoading(true);
    try {
      await api.createMessage({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        subject: String(fd.get("subject") ?? ""),
        message: String(fd.get("message") ?? ""),
      });
      setDone(true);
      form.reset();
      setTimeout(() => setDone(false), 5000);
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>We'd <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">love to hear from you.</span></>}
        description="Partnerships, press, volunteering or just a hello — drop us a note."
        image={heroImage}
      />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_1.4fr]">
          <form
            onSubmit={onSubmit}
            className="order-1 self-start rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6 md:p-10 lg:order-2"
          >
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">Send a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">We reply within one working day.</p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Subject" name="subject" required />
            </div>
            <div className="mt-4">
              <label className="text-sm font-semibold text-foreground">Message<span className="ml-0.5 text-secondary">*</span></label>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-warm px-7 py-3.5 font-display text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
            </button>

            {done && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-center gap-2 rounded-xl bg-accent/15 px-4 py-3 text-sm font-medium text-accent-foreground"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                Thanks! Your message is on its way. We'll be in touch soon.
              </motion.div>
            )}
          </form>

          <div className="order-2 space-y-5 lg:order-1">
            <ContactCard icon={MapPin} title="Visit us" body={org.address} accent="primary" />
            <ContactCard icon={Mail} title="Email" body={<a className="break-all hover:text-primary" href={`mailto:${org.email}`}>{org.email}</a>} accent="secondary" />
            <ContactCard icon={Phone} title="Call" body={<a className="hover:text-primary" href={`tel:${org.phone.replace(/\s/g, "")}`}>{org.phone}</a>} accent="accent" />
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp"
              body={
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{org.whatsappName} · {org.phone}</p>
                  <a
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white sm:w-auto"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://wa.me/${org.whatsapp}?text=${encodeURIComponent("Hi Baroda Youth Federation, I'd like to know more.")}`}
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              }
              accent="accent"
            />

            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <iframe
                title="Baroda Youth Federation Office Location"
                src="https://www.google.com/maps?q=Vadodara,Gujarat,India&output=embed"
                className="h-56 w-full sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon, title, body, accent,
}: { icon: React.ComponentType<{ className?: string }>; title: string; body: React.ReactNode; accent: "primary" | "secondary" | "accent" }) {
  const cls = accent === "secondary" ? "bg-secondary text-white" : accent === "accent" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground";
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${cls}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <div className="mt-1 break-words text-base text-foreground">{body}</div>
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", required,
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground">{label}{required && <span className="ml-0.5 text-secondary">*</span>}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
