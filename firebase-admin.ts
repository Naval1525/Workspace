import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { App } from "firebase-admin/app";


import servicekey from "./service_key.json";

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(servicekey as any),
  });
} else {
  app = getApp();
}

const admindb = getFirestore(app);

export { app as adminApp, admindb };