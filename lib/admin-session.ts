import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

/**
 * Sign-in for the admin panel (/admin). There is one shared password, set as
 * ADMIN_PASSWORD in .env.local. A correct password earns a signed cookie that
 * lasts a week; changing the password signs everyone out.
 */
const COOKIE = "fgbmfi_admin";
const WEEK = 60 * 60 * 24 * 7;

const password = () => process.env.ADMIN_PASSWORD ?? "";
const sign = (expires: string) => createHmac("sha256", `admin-session:${password()}`).update(expires).digest("hex");

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/** Whether the admin panel has been given a password at all. */
export const adminConfigured = () => password().length >= 8;

export const passwordMatches = (attempt: string) => adminConfigured() && same(sign(attempt), sign(password()));

export async function isAdmin() {
  if (!adminConfigured()) return false;
  // The check depends on the clock, so it must run per request and never while prerendering.
  await connection();
  const [expires, signature] = ((await cookies()).get(COOKIE)?.value ?? "").split(".");
  return !!expires && !!signature && Number(expires) > Date.now() && same(signature, sign(expires));
}

export async function startAdminSession() {
  const expires = String(Date.now() + WEEK * 1000);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: WEEK });
}

export async function endAdminSession() {
  (await cookies()).delete(COOKIE);
}
