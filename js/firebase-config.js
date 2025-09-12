import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQiFMWRmvP46kHgbf9E2Pr3nSctGQWe7A",
  authDomain: "edudisha-webapp.firebaseapp.com",
  projectId: "edudisha-webapp",
  storageBucket: "edudisha-webapp.firebasestorage.app",
  messagingSenderId: "404187603792",
  appId: "1:404187603792:web:cc86b74b1bb8f9968e0255",
  measurementId: "G-NZRN2KGCWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized services for other files to use
export { auth, db };