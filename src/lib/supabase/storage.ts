import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

const bucketName = "project-images";

const getFileExtension = (file: File) => {
  const extension = file.name.split(".").pop();
  return extension ? extension.toLowerCase() : "webp";
};

export const uploadProjectImage = async (
  supabase: SupabaseClient<Database>,
  file: File,
  projectSlug: string,
) => {
  const filePath = `${projectSlug}/${crypto.randomUUID()}.${getFileExtension(file)}`;

  const { error } = await supabase.storage.from(bucketName).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
};

export const uploadProjectImages = async (
  supabase: SupabaseClient<Database>,
  files: File[],
  projectSlug: string,
) => Promise.all(files.map((file) => uploadProjectImage(supabase, file, projectSlug)));
