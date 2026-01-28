import { NextResponse } from "next/server";

import { initializeServerApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

import { type Municipality } from "@/lib/election/election.types";
import { firebaseConfig } from "@/lib/firebase/firebase-config";

// Cache the municipalities in memory on the server
let cachedMunicipalities: Municipality[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

async function loadMunicipalities(): Promise<Municipality[]> {
  const now = Date.now();

  // Return cached data if still valid
  if (cachedMunicipalities !== null && now - cacheTimestamp < CACHE_TTL) {
    return cachedMunicipalities;
  }

  const serverApp = initializeServerApp(firebaseConfig, {});
  const db = getFirestore(serverApp);
  const municipalitiesRef = collection(db, "municipalities");
  const snapshot = await getDocs(municipalitiesRef);

  const municipalities = snapshot.docs.map(
    (docSnap) => docSnap.data() as Municipality,
  );

  // Sort by population (descending)
  municipalities.sort((a, b) => (b.population || 0) - (a.population || 0));

  // Update cache
  cachedMunicipalities = municipalities;
  cacheTimestamp = now;

  return municipalities;
}

export async function GET() {
  try {
    const municipalities = await loadMunicipalities();

    return NextResponse.json(municipalities, {
      headers: {
        // Cache for 24 hours on the client and CDN
        "Cache-Control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Error fetching municipalities:", error);
    return NextResponse.json(
      { error: "Failed to fetch municipalities" },
      { status: 500 },
    );
  }
}
