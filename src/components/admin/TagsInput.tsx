"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TagsInputProps {
  label: string;
  tags: string[];
  value: string;
  onValueChange: (value: string) => void;
  onTagsChange: (tags: string[]) => void;
}

export const TagsInput = ({
  label,
  tags,
  value,
  onValueChange,
  onTagsChange,
}: TagsInputProps) => {
  const addTag = () => {
    const tag = value.trim();

    if (!tag || tags.includes(tag)) {
      onValueChange("");
      return;
    }

    onTagsChange([...tags, tag]);
    onValueChange("");
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          placeholder="React, Next.js, Supabase..."
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
          }}
        />
        <Button type="button" variant="secondary" onClick={addTag}>
          Adicionar
        </Button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-3 py-1 text-sm text-text-primary"
            >
              {tag}
              <button
                type="button"
                className="text-text-secondary transition hover:text-text-primary"
                onClick={() => removeTag(tag)}
                aria-label={`Remover ${tag}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
