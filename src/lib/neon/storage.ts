import "server-only";

import { Files } from "files-sdk";
import type { SignedUpload } from "files-sdk";
import { neon } from "files-sdk/neon";

const bucket = "project-images";
const maxImageSize = 10 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export interface ProjectImageUpload {
  upload: SignedUpload;
  publicUrl: string;
}

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

const getFileNameExtension = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : "webp";
};

const validateProjectImage = (contentType: string, size: number) => {
  if (!allowedImageTypes.has(contentType)) {
    throw new Error("Envie uma imagem JPG, PNG, WebP ou GIF.");
  }

  if (!Number.isFinite(size) || size <= 0 || size > maxImageSize) {
    throw new Error("A imagem deve ter no máximo 10 MB.");
  }
};

export const createProjectImageUpload = async (
  fileName: string,
  contentType: string,
  size: number,
  projectSlug: string,
): Promise<ProjectImageUpload> => {
  validateProjectImage(contentType, size);

  const safeSlug = projectSlug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const key = `${safeSlug}/${crypto.randomUUID()}.${getFileNameExtension(fileName)}`;
  const files = getFiles();

  const upload = await files.signedUploadUrl(key, {
    expiresIn: 5 * 60,
    contentType,
    maxSize: maxImageSize,
  });

  return {
    upload,
    publicUrl: await files.url(key),
  };
};
