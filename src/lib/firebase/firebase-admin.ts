"use server";

import { unstable_cache as cache } from "next/cache";

import { CacheTags } from "@lib/cache-tags";
import { credential } from "firebase-admin";
import {
  type App as FirebaseApp,
  getApps,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import { type Tenant } from "./firebase.types";

function initializeApp(): FirebaseApp {
  const existingApps = getApps();

  if (existingApps.length > 0) {
    return existingApps[0];
  }

  const {
    NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
  } = process.env;

  if (
    !NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    !FIREBASE_CLIENT_EMAIL ||
    !FIREBASE_PRIVATE_KEY
  ) {
    throw new Error("Missing Firebase environment variables.");
  }

  return initializeAdminApp({
    credential: credential.cert({
      projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const app = initializeApp();

const db = getFirestore(app);

export async function getTenantImpl(tenantId?: string | null) {
  if (!tenantId) {
    return;
  }

  const tenantRef = db.collection("tenants").doc(tenantId);
  const tenant = await tenantRef.get();

  if (!tenant.exists) {
    return;
  }

  return {
    id: tenant.id,
    ...tenant.data(),
  } as Tenant;
}

export const getTenant = cache(getTenantImpl, undefined, {
  revalidate: 60 * 60 * 24,
  tags: [CacheTags.TENANT],
});
