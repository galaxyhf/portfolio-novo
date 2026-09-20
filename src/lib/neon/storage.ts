import "server-only";

import { Files } from "files-sdk";
import { neon } from "files-sdk/neon";

const bucket = "project-images";
const maxImageSize = 10 * 1024 * 1024;

export const getStoragePublicBaseUrl = () => {
  if (process.env.NEON_STORAGE_PUBLIC_URL) {
    return process.env.NEON_STORAGE_PUBLIC_URL.replace(/\/$/, "");
  }

  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  if (!endpoint) {
    throw new Error("AWS_ENDPOINT_URL_S3 não foi configurada.");
  }

  return `${endpoint.replace(/\/$/, "")}/${bucket}`;
};

const getFiles = () =>
  new Files({
    adapter: neon({
      bucket,
      publicBaseUrl: getStoragePublicBaseUrl(),
    }),
  });

const getFileExtension = (file: File) => {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : "webp";
};

export const uploadProjectImage = async (file: File, projectSlug: string) => {
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
  if (!allowedTypes.has(file.type)) {
    throw new Error("Envie uma imagem JPG, PNG, WebP ou GIF.");
  }

  if (file.size > maxImageSize) {
    throw new Error("A imagem deve ter no máximo 10 MB.");
  }

  const safeSlug = projectSlug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const key = `${safeSlug}/${crypto.randomUUID()}.${getFileExtension(file)}`;
  const files = getFiles();

  await files.upload(key, file, {
    contentType: file.type,
    cacheControl: "public, max-age=31536000, immutable",
  });

  return files.url(key);
};

export const uploadProjectImages = (files: File[], projectSlug: string) =>
  Promise.all(files.map((file) => uploadProjectImage(file, projectSlug)));
