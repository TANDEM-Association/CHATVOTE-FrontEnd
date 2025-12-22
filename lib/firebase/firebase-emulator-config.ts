export const firebaseEmulatorConfig = {
  useEmulator: process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  firestoreEmulatorHost: process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST,
  firestoreEmulatorPort: parseInt(process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT!),
  firebaseAuthEmulatorHost: process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST,
  firebaseAuthEmulatorPort: parseInt(process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT!),
};
