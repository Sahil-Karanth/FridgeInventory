import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCLUY3q8kBlpwkiZQ9gxW9Bz_JEjHOgVs4",
  authDomain: "fridgeinventory-7d647.firebaseapp.com",
  databaseURL: "https://fridgeinventory-7d647-default-rtdb.firebaseio.com",
  projectId: "fridgeinventory-7d647",
  storageBucket: "fridgeinventory-7d647.appspot.com",
  messagingSenderId: "496022441380",
  appId: "1:496022441380:web:e93d8cf18fedf1363e0531",
  measurementId: "G-56M1ZRMDEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
