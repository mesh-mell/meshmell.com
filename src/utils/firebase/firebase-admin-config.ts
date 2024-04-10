import { cert } from "firebase-admin/app";

const admin = require("firebase-admin");

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
  databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL
}

export const customInitApp = () => {
  if (!admin.apps.length) {
    // if (process.env.NEXT_PUBLIC_ENV_STATUS === "development_with_emulators") {
    //   admin.initializeApp({ projectId: "firebase-emulators-meshmell" });
    // } else {
    //   admin.initializeApp(firebaseAdminConfig);
    // }

    admin.initializeApp(firebaseAdminConfig);

    return
  } else {
    return admin.app();
  }
}
