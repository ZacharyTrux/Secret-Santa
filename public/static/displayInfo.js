// Set up Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1X9W4HfCnwdXIuFDXiaWTjB613RyqkUw",
    authDomain: "secret-santa-2025-6e38f.firebaseapp.com",
    projectId: "secret-santa-2025-6e38f",
    storageBucket: "secret-santa-2025-6e38f.firebasestorage.app",
    messagingSenderId: "724496064011",
    appId: "1:724496064011:web:223bc1dc86c65c129d310e",
    measurementId: "G-RKP9H1XHRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

