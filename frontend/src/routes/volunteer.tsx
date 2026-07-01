import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Network, Sparkles, TrendingUp, Upload, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { breadcrumbJsonLd, createPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/volunteer")({
  head: () =>
    createPageSeo({
      title: "Volunteer with Baroda Youth Federation — One Sunday a month changes a life",
      description: "Join 450+ Baroda Youth Federation volunteers. Teach, organise events, drive, design — we have a role for every skill.",
      path: "/volunteer",
      keywords: ["volunteer Baroda Youth Federation", "volunteer Vadodara", "NGO volunteer Gujarat"],
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Volunteer", path: "/volunteer" },
      ]),
    }),
  component: VolunteerPage,
});

const BENEFITS = [
  { icon: TrendingUp, title: "Real social impact", desc: "Hands-on work where your hours translate to meals, books and warm nights." },
  { icon: Award, title: "Certificates", desc: "Annual certificates and recommendation letters for college, jobs and visas." },
  { icon: Network, title: "Networking", desc: "Build relationships across 450+ peers from every industry in Vadodara." },
  { icon: Sparkles, title: "Leadership growth", desc: "Coordinate teams, run events, present to donors — skills you can't learn in class." },
];

function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [formImage, setFormImage] = useState<string | null>(null);

  useEffect(() => {
    api.getSettings().then((data) => {
      if (data.volunteerHeroImage) {
        setHeroImage(imageUrl(data.volunteerHeroImage));
      }
      if (data.volunteerFormImage) {
        setFormImage(imageUrl(data.volunteerFormImage));
      }
    }).catch((error) => {
      console.error('Failed to fetch site settings:', error);
    });
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const resume = fd.get("resume") as File;
    
    setLoading(true);
    try {
      let resumeUrl = undefined;
      if (resume && resume.size > 0) {
        const uploadResult = await api.uploadImage(resume, 'resumes');
        resumeUrl = uploadResult.url;
      }

      await api.createVolunteer({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        address: String(fd.get("address") ?? ""),
        skills: String(fd.get("skills") ?? ""),
        availability: String(fd.get("availability") ?? ""),
        resumeName: resume && resume.size > 0 ? resume.name : undefined,
        resumeUrl,
      });
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to submit volunteer application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Volunteer with Baroda Youth Federation"
        title={<>Show up. <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Change a year.</span></>}
        description="No prior experience needed. Just bring time, energy and the willingness to listen first."
        image={heroImage}
      />

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeader eyebrow="Why volunteer" title={<>What you'll <span className="gradient-text">walk away with.</span></>} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-warm text-white">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative overflow-hidden rounded-3xl shadow-glow">
            <img src={formImage} alt="Volunteers at event" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="font-display text-2xl font-bold leading-tight">"This is the most honest team I've ever worked with."</p>
              <p className="mt-2 text-sm text-white/85">— Kunal T., volunteer since 2019</p>
            </div>
          </div>

          <div>
            <SectionHeader
              align="left"
              eyebrow="Registration"
              title={<>Sign up in <span className="gradient-text">two minutes.</span></>}
              description="We'll reach out within 48 hours with your first event invitation."
            />

            <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" required />
                <Field label="City / Area" name="address" required />
              </div>
              <Field label="Skills / interests" name="skills" placeholder="Teaching, design, event ops, driving..." />
              <div>
                <label className="text-sm font-semibold text-foreground">Availability</label>
                <select name="availability" required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <option value="">Select availability</option>
                  <option>Weekends only</option>
                  <option>Weekday evenings</option>
                  <option>Flexible — anytime</option>
                  <option>Event-based only</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground">Resume / CV (optional)</label>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-4 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4 text-primary" />
                  <input type="file" name="resume" accept=".pdf,.doc,.docx" className="block w-full text-sm" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-warm px-7 py-3.5 font-display text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-accent/15 px-4 py-3 text-sm font-medium text-accent-foreground"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  Thanks! We've received your application — expect to hear from us within 48 hours.
                </motion.div>
              )}
              <p className="text-xs text-muted-foreground">
                By submitting you agree to be contacted by Baroda Youth Federation about volunteer opportunities. We never share your details.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", required, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground">{label}{required && <span className="ml-0.5 text-secondary">*</span>}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
