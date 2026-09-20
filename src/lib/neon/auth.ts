import "server-only";

import { createNeonAuth } from "@neondatabase/neon-js/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

if (!baseUrl) {
  throw new Error("NEON_AUTH_BASE_URL não foi configurada.");
}

if (!cookieSecret || cookieSecret.length < 32) {
  throw new Error("NEON_AUTH_COOKIE_SECRET deve ter pelo menos 32 caracteres.");
}

export const auth = createNeonAuth({
  baseUrl,
  cookies: {
    secret: cookieSecret,
    sessionDataTtl: 300,
  },
});

export const requireAdminSession = async () => {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (adminEmails.length === 0) {
    throw new Error("ADMIN_EMAILS não foi configurada.");
  }

  const { data: session } = await auth.getSession();
  const email = session?.user.email?.toLowerCase();

  if (!email || !adminEmails.includes(email)) {
    throw new Error("Você não tem permissão para acessar o painel.");
  }

  return session;
};
