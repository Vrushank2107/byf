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
