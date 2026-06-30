import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettingsStore, DEFAULT_SETTINGS, type SiteSettings } from "@/lib/admin-store";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { Save, RotateCcw, Check } from "lucide-react";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { ImageInput } from "@/components/admin/ImageInput";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminSettings() {
  const { data: settings, loading, refresh } = useSettingsStore();
  const [draft, setDraft] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const { confirm, dialog } = useConfirmDialog();

  type EditableSettingKey = Exclude<keyof SiteSettings, "id" | "updatedAt">;

  useEffect(() => {
    if (settings) {
      setDraft({ ...DEFAULT_SETTINGS, ...settings });
    }
  }, [settings]);

  const update = (k: EditableSettingKey, v: string) => setDraft({ ...draft, [k]: v } as SiteSettings);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id, updatedAt, ...payload } = draft;
      await api.updateSettings(payload);
      setSaved(true);
      refresh();
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    const ok = await confirm({
      title: "Reset settings?",
      description: "Reset all settings to the original defaults? Unsaved changes will be lost.",
      confirmLabel: "Reset",
    });
    if (ok) {
      setDraft(DEFAULT_SETTINGS);
    }
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Site Settings</h1>
          <p className="text-muted-foreground">
            Update contact details and social links.
          </p>
        </div>

        {loading ? (
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full md:col-span-2" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8">
            <Section title="Contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Email" value={draft.email} onChange={(v) => update("email", v)} type="email" />
                <Input label="Phone" value={draft.phone} onChange={(v) => update("phone", v)} />
                <Input
                  label="WhatsApp number (digits only, with country code)"
                  value={draft.whatsapp}
                  onChange={(v) => update("whatsapp", v.replace(/\D/g, ""))}
                  placeholder="919723784628"
                />
                <Input
                  label="WhatsApp contact name"
                  value={draft.whatsappName}
                  onChange={(v) => update("whatsappName", v)}
                />
                <div className="md:col-span-2">
                  <Input label="Address" value={draft.address} onChange={(v) => update("address", v)} />
                </div>
              </div>
            </Section>

            <Section title="Social Links">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Instagram URL" value={draft.instagram} onChange={(v) => update("instagram", v)} />
                <Input label="Facebook URL" value={draft.facebook} onChange={(v) => update("facebook", v)} />
                <Input label="Twitter / X URL" value={draft.twitter} onChange={(v) => update("twitter", v)} />
                <Input label="YouTube URL" value={draft.youtube} onChange={(v) => update("youtube", v)} />
              </div>
            </Section>

            <Section title="Site Images">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageInput label="Hero Education Image" value={draft.heroEducation || ''} onChange={(v) => update("heroEducation", v)} />
                <ImageInput label="Hero Blankets Image" value={draft.heroBlankets || ''} onChange={(v) => update("heroBlankets", v)} />
                <ImageInput label="Hero Flood Image" value={draft.heroFlood || ''} onChange={(v) => update("heroFlood", v)} />
                <ImageInput label="Hero Women Image" value={draft.heroWomen || ''} onChange={(v) => update("heroWomen", v)} />
                <ImageInput label="P Notebooks Image" value={draft.pNotebooks || ''} onChange={(v) => update("pNotebooks", v)} />
                <ImageInput label="P Sanitary Image" value={draft.pSanitary || ''} onChange={(v) => update("pSanitary", v)} />
                <ImageInput label="P Rotibank Image" value={draft.pRotibank || ''} onChange={(v) => update("pRotibank", v)} />
                <ImageInput label="P Joycation Image" value={draft.pJoycation || ''} onChange={(v) => update("pJoycation", v)} />
                <ImageInput label="Blanket Image" value={draft.blanket || ''} onChange={(v) => update("blanket", v)} />
                <ImageInput label="Chappal Image" value={draft.chappal || ''} onChange={(v) => update("chappal", v)} />
                <ImageInput label="Diwali Image" value={draft.diwali || ''} onChange={(v) => update("diwali", v)} />
                <ImageInput label="Diwali 2 Image" value={draft.diwali2 || ''} onChange={(v) => update("diwali2", v)} />
                <ImageInput label="Diwali 3 Image" value={draft.diwali3 || ''} onChange={(v) => update("diwali3", v)} />
                <ImageInput label="Flag Image" value={draft.flag || ''} onChange={(v) => update("flag", v)} />
                <ImageInput label="Holi Image" value={draft.holi || ''} onChange={(v) => update("holi", v)} />
                <ImageInput label="Holi 2 Image" value={draft.holi2 || ''} onChange={(v) => update("holi2", v)} />
                <ImageInput label="Holi 3 Image" value={draft.holi3 || ''} onChange={(v) => update("holi3", v)} />
                <ImageInput label="Joycation 1 Image" value={draft.joycation1 || ''} onChange={(v) => update("joycation1", v)} />
              </div>
            </Section>

            <Section title="Page Hero Images">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageInput label="Donate Hero Image" value={draft.donateHeroImage || ''} onChange={(v) => update("donateHeroImage", v)} />
                <ImageInput label="About Hero Image" value={draft.aboutHeroImage || ''} onChange={(v) => update("aboutHeroImage", v)} />
                <ImageInput label="About Section Image" value={draft.aboutSectionImage || ''} onChange={(v) => update("aboutSectionImage", v)} />
                <ImageInput label="Contact Hero Image" value={draft.contactHeroImage || ''} onChange={(v) => update("contactHeroImage", v)} />
                <ImageInput label="Events Hero Image" value={draft.eventsHeroImage || ''} onChange={(v) => update("eventsHeroImage", v)} />
                <ImageInput label="Blog Hero Image" value={draft.blogHeroImage || ''} onChange={(v) => update("blogHeroImage", v)} />
                <ImageInput label="Volunteer Hero Image" value={draft.volunteerHeroImage || ''} onChange={(v) => update("volunteerHeroImage", v)} />
                <ImageInput label="Volunteer Form Image" value={draft.volunteerFormImage || ''} onChange={(v) => update("volunteerFormImage", v)} />
                <ImageInput label="Gallery Hero Image" value={draft.galleryHeroImage || ''} onChange={(v) => update("galleryHeroImage", v)} />
                <ImageInput label="Projects Hero Image" value={draft.projectsHeroImage || ''} onChange={(v) => update("projectsHeroImage", v)} />
              </div>
            </Section>


            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to defaults
              </button>
              {saved && (
                <span className="flex items-center gap-1 text-sm text-accent">
                  <Check className="h-4 w-4" /> Saved
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="font-display text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}
