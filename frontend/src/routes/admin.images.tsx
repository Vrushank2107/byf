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
  { key: "donateHeroImage", label: "Page Hero - Donate", description: "Background image for Donate page hero section" },
  { key: "aboutHeroImage", label: "Page Hero - About", description: "Background image for About page hero section" },
  { key: "aboutSectionImage", label: "About Section Image", description: "Image shown in About page leadership section" },
  { key: "contactHeroImage", label: "Page Hero - Contact", description: "Background image for Contact page hero section" },
  { key: "eventsHeroImage", label: "Page Hero - Events", description: "Background image for Events page hero section" },
  { key: "blogHeroImage", label: "Page Hero - Blog", description: "Background image for Blog page hero section" },
  { key: "volunteerHeroImage", label: "Page Hero - Volunteer", description: "Background image for Volunteer page hero section" },
  { key: "volunteerFormImage", label: "Volunteer Form Side Image", description: "Image shown beside volunteer registration form" },
  { key: "galleryHeroImage", label: "Page Hero - Gallery", description: "Background image for Gallery page hero section" },
  { key: "projectsHeroImage", label: "Page Hero - Projects", description: "Background image for Projects page hero section" },
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
      await api.updateSettings(formData);
      toast.success('Site images updated successfully');
      await loadSettings();
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('Failed to save settings');
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Site Images</h1>
            <p className="text-muted-foreground">Manage images used throughout the website</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
