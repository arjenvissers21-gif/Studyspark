import { cookies } from "next/headers";
import crypto from "node:crypto";
import { prisma } from "./prisma";

const COOKIE = "studyspark_session";
function secret() { return process.env.AUTH_SECRET || "development-only-secret-change-me"; }
function sign(value: string) { return crypto.createHmac("sha256", secret()).update(value).digest("base64url"); }
function encode(userId: string) { const body = Buffer.from(JSON.stringify({ userId, iat: Date.now() })).toString("base64url"); return `${body}.${sign(body)}`; }
function decode(token: string) {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!data.userId || typeof data.iat !== "number" || Date.now() - data.iat > 1000 * 60 * 60 * 24 * 30) return null;
    return String(data.userId);
  } catch { return null; }
}
export function sessionCookie(userId: string) { return { name: COOKIE, value: encode(userId), httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 30 }; }
export async function getCurrentUser() {
  const token = (await cookies()).get(COOKIE)?.value;
  const userId = token ? decode(token) : null;
  if (!userId) return null;
  return prisma.user.findUnique({ where: { id: userId }, include: { progress: true } });
}
