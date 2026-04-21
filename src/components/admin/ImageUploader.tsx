"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploaderProps {
  label: string;
  multiple?: boolean;
  existingUrls: string[];
  files: File[];
  onFilesChange: (files: File[]) => void;
  onExistingUrlsChange: (urls: string[]) => void;
}

export const ImageUploader = ({
  label,
  multiple = false,
  existingUrls,
  files,
  onFilesChange,
  onExistingUrlsChange,
}: ImageUploaderProps) => {
  const previewUrls = files.map((file) => URL.createObjectURL(file));

  const handleChange = (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }

    const selectedFiles = Array.from(fileList);
    onFilesChange(multiple ? [...files, ...selectedFiles] : selectedFiles.slice(0, 1));
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <Input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(event) => handleChange(event.target.files)}
      />

      {(existingUrls.length > 0 || previewUrls.length > 0) && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {existingUrls.map((url) => (
            <div key={url} className="relative overflow-hidden rounded-lg border border-border bg-bg-secondary">
              <Image
                src={url}
                alt="Imagem salva do projeto"
                width={480}
                height={280}
                className="h-40 w-full object-cover"
              />
              <Button
                type="button"
                variant="danger"
                className="absolute right-2 top-2 h-8 w-8 px-0"
                onClick={() => onExistingUrlsChange(existingUrls.filter((item) => item !== url))}
                aria-label="Remover imagem"
              >
                <X size={16} />
              </Button>
            </div>
          ))}

          {previewUrls.map((url, index) => (
            <div key={url} className="relative overflow-hidden rounded-lg border border-border bg-bg-secondary">
              <Image
                src={url}
                alt="Preview da nova imagem"
                width={480}
                height={280}
                className="h-40 w-full object-cover"
              />
              <Button
                type="button"
                variant="danger"
                className="absolute right-2 top-2 h-8 w-8 px-0"
                onClick={() => onFilesChange(files.filter((_, fileIndex) => fileIndex !== index))}
                aria-label="Remover preview"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
