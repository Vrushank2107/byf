import { useRef, useState } from "react";
import { Loader2, Upload, Link2 } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/admin-store";

interface Props {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  folder?: string;
}

/** Image input that accepts a URL or uploads to Cloudinary via the backend API. */
export function ImageInput({ value, onChange, label = "Image", folder = "projects" }: Props) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5_000_000) {
      toast.error("Please choose an image under 5 MB.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success("Image uploaded");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to upload image";
      toast.error(message, { duration: 8000 });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium">{label}</label>
        <div className="flex gap-1 text-xs">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-1 rounded ${mode === "url" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <Link2 className="inline h-3 w-3 mr-1" /> URL
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-1 rounded ${mode === "upload" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <Upload className="inline h-3 w-3 mr-1" /> Upload
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="https://... or /assets/..."
        />
      ) : (
        <div className="space-y-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="w-full text-sm disabled:opacity-50"
          />
          {uploading && (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Uploading to Cloudinary…
            </p>
          )}
        </div>
      )}

      {value && (
        <img
          src={value}
          alt="preview"
          className="mt-3 h-24 w-24 rounded-lg object-cover border border-border"
        />
      )}
    </div>
  );
}
