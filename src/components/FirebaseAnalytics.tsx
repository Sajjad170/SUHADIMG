"use client";

import { useEffect } from "react";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirebaseApp, isFirebaseConfigured } from "@/lib/firebase";

/** Firebase Analytics — client-only, lazy init after page load. */
export function FirebaseAnalytics() {
  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    void isSupported().then((supported) => {
      if (!supported) return;
      const app = getFirebaseApp();
      if (app) getAnalytics(app);
    });
  }, []);

  return null;
}
