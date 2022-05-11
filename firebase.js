import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

import {
  API_KEY as apiKey,
  AUTH_DOMAIN as authDomain,
  PROJECT_ID as projectId,
  STORAGE_BUCKET as storageBucket,
  MESSAGING_SENDER_ID as messagingSenderId,
  APP_ID as appId,
  DATABASE_URL as databaseURL,
} from "@env";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  databaseURL: databaseURL,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getDatabase(app);

export const auth = getAuth(app);

export const uniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const storage = getStorage(app);
