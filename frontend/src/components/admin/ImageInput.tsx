import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/admin-store";
import { imageUrl } from "@/lib/image-url";

interface Props {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  folder?: string;
}

/** Upload-only image input — sends files to Cloudinary via the backend API. */
export function ImageInput({ value, onChange, label = "Image", folder = "projects" }: Props) {
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
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <div className="space-y-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          className="w-full text-sm disabled:opacity-50"
        />
        {uploading ? (
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" />
            Uploading…
          </p>
        ) : (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Upload className="h-3 w-3" />
            JPG, PNG or WebP — max 5 MB
          </p>
        )}
      </div>

      {value && (
        <img
          src={imageUrl(value)}
          alt="preview"
          className="mt-3 h-24 w-24 rounded-lg border border-border object-cover"
        />
      )}
    </div>
  );
}
