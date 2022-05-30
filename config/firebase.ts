import * as admin from "firebase-admin";
import * as firebaseConfig from "../firebaseConfig.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error?.stack);
  }
}

export default admin;
