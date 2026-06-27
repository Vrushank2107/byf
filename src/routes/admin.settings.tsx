import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useSettingsStore, DEFAULT_SETTINGS, type SiteSettings } from "@/lib/admin-store";
import { useState } from "react";
import { Save, RotateCcw, Check } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
  beforeLoad: () => {
    if (!checkAdminAuth()) throw redirect({ to: "/admin" });
  },
});

function AdminSettings() {
  const [settings, setSettings] = useSettingsStore();
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);

  const update = (k: keyof SiteSettings, v: string) => setDraft({ ...draft, [k]: v });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (confirm("Reset all settings to the original defaults?")) {
      setSettings(DEFAULT_SETTINGS);
      setDraft(DEFAULT_SETTINGS);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Site Settings</h1>
          <p className="text-muted-foreground">
            Update contact details, social links, and the founder portfolio link.
          </p>
        </div>

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

          <Section title="Founder">
            <Input
              label="Rukmil Shah — Personal portfolio URL"
              value={draft.founderPortfolioUrl}
              onChange={(v) => update("founderPortfolioUrl", v)}
              placeholder="https://..."
            />
            <p className="text-xs text-muted-foreground mt-2">
              Leave blank to hide the portfolio button until the link is ready.
            </p>
          </Section>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Changes
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
