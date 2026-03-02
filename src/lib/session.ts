import { SessionOptions } from "iron-session";

export interface SessionData {
  isAdmin: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? "fallback-secret-at-least-32-chars!!",
  cookieName: "awsm-admin-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
  },
};
