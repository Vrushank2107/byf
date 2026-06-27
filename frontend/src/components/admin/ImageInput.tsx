import { useRef, useState } from "react";
import { Upload, Link2 } from "lucide-react";
import { fileToDataUrl } from "@/lib/admin-store";

interface Props {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

/** Image input that accepts either a URL or a file upload (stored as data URL). */
export function ImageInput({ value, onChange, label = "Image" }: Props) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2_000_000) {
      alert("Please choose an image under 2 MB (admin uses browser storage).");
      e.target.value = "";
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    onChange(dataUrl);
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
          placeholder="/assets/... or https://..."
        />
      ) : (
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full text-sm"
        />
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
