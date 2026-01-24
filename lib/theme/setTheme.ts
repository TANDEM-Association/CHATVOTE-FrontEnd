"use server";

import { cookies } from "next/headers";

import { type Theme } from "./types";

export async function setTheme(theme: Theme) {
  const cookieStore = await cookies();

  cookieStore.set("theme", theme, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
