import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWnLOOIscQsHZtFvYaFBlf9gBVXdIg1sU",
  authDomain: "rn-econominator.firebaseapp.com",
  projectId: "rn-econominator",
  storageBucket: "rn-econominator.appspot.com",
  messagingSenderId: "399259805360",
  appId: "1:399259805360:web:694e14b84379c33b933d75",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
