// Set up Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

require('dotenv').config();

// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};


console.log(process.env.API_KEY);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get form elements
var submitButton = document.querySelector("#submit");
var form = document.getElementById("itemInfo");

async function InsertData(event){
    event.preventDefault();  // Prevent form from submitting and reloading the page
    
    // Get current values from form inputs
    var enterIdentity = document.querySelector("#identity").value;
    var enterItem = document.querySelector("#item").value;
    var enterLink = document.querySelector("#link").value;
    var enterOther = document.querySelector("#other").value;


    
    try {
        // Add data to Firestore
        const docRef = await addDoc(collection(db, enterIdentity+"-"), {
            item: enterItem,
            link: enterLink,
            other: enterOther,
        });
        alert("Your list was submitted successfully!");
        form.reset(); // Clear the form after submission
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to submit");
    }
}

// Add event listener to submit button
submitButton.addEventListener('click', InsertData);
