// SPDX-FileCopyrightText: 2025 2025 wahl.chat
//
// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0
//
import {
    Auth,
  connectAuthEmulator,
} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  Firestore,
} from 'firebase/firestore';

import { firebaseEmulatorConfig } from './firebase-emulator-config';

export function connectEmulators(db: Firestore, auth: Auth, context: string): void {
  if (firebaseEmulatorConfig.useEmulator?.toLowerCase() === "true") {
    connectFirestoreEmulator(db, firebaseEmulatorConfig.firestoreEmulatorHost!, firebaseEmulatorConfig.firestoreEmulatorPort);
    connectAuthEmulator(auth, "http://" + firebaseEmulatorConfig.firestoreEmulatorHost! + "", { disableWarnings: true });
    console.info(
      `[firebase-${context}] Using emulators. Auth at ${firebaseEmulatorConfig.firebaseAuthEmulatorHost}:${firebaseEmulatorConfig.firebaseAuthEmulatorPort}, 
      Firestore at ${firebaseEmulatorConfig.firestoreEmulatorHost}:${firebaseEmulatorConfig.firestoreEmulatorPort}`,
    )
  }
}
