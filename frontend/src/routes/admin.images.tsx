import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ImageInput } from "@/components/admin/ImageInput";
import { api } from "@/lib/api";

export const Route = createFileRoute("/admin/images")({
  component: AdminImages,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

const IMAGE_FIELDS = [
  { key: "heroEducation", label: "Hero - Education", description: "Main hero image for education section" },
  { key: "heroBlankets", label: "Hero - Blankets", description: "Main hero image for blanket drive" },
  { key: "heroFlood", label: "Hero - Flood Relief", description: "Main hero image for flood relief" },
  { key: "heroWomen", label: "Hero - Women Empowerment", description: "Main hero image for women empowerment" },
  { key: "pNotebooks", label: "Project - Notebooks", description: "Project Sankalp notebook distribution image" },
  { key: "pSanitary", label: "Project - Sanitary Pads", description: "Sanitary pad distribution image" },
  { key: "pRotibank", label: "Project - Roti Bank", description: "Roti Bank food distribution image" },
  { key: "pJoycation", label: "Project - JoyCation", description: "JoyCation outing image" },
  { key: "blanket", label: "Gallery - Blanket", description: "Blanket distribution gallery image" },
  { key: "chappal", label: "Gallery - Footwear", description: "Footwear distribution image" },
  { key: "diwali", label: "Gallery - Diwali 1", description: "Diwali celebration image 1" },
  { key: "diwali2", label: "Gallery - Diwali 2", description: "Diwali celebration image 2" },
  { key: "diwali3", label: "Gallery - Diwali 3", description: "Diwali celebration image 3" },
  { key: "flag", label: "Gallery - Flag", description: "Flag distribution image" },
  { key: "holi", label: "Gallery - Holi 1", description: "Holi celebration image 1" },
  { key: "holi2", label: "Gallery - Holi 2", description: "Holi celebration image 2" },
  { key: "holi3", label: "Gallery - Holi 3", description: "Holi celebration image 3" },
  { key: "joycation1", label: "Gallery - JoyCation", description: "JoyCation gallery image" },
] as const;

function AdminImages() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
      const initialFormData: Record<string, string> = {};
      IMAGE_FIELDS.forEach(field => {
        initialFormData[field.key] = data[field.key] || "";
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateSettings({
        ...settings,
        ...formData,
      });
      toast.success('Images updated successfully');
      await loadSettings();
    } catch (error) {
      console.error('Failed to save images:', error);
      toast.error('Failed to save images');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Site Images</h1>
            <p className="text-muted-foreground">Manage images used throughout the website</p>
          </div>
          <div className="grid gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="h-6 w-1/2 bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-32 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Site Images</h1>
            <p className="text-muted-foreground">Manage images used throughout the website</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {IMAGE_FIELDS.map((field) => (
            <div key={field.key} className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div>
                <h3 className="font-display text-lg font-semibold">{field.label}</h3>
                <p className="text-sm text-muted-foreground">{field.description}</p>
              </div>
              <ImageInput
                value={formData[field.key] || ""}
                onChange={(value) => setFormData({ ...formData, [field.key]: value })}
              />
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
