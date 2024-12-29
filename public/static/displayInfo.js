// Set up Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, query} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var ID = document.querySelector("#names");

ID.addEventListener("change", async () => {
    const selectedName = ID.value;

    const existingResults = document.getElementById("results");
    if(existingResults) existingResults.remove();

    if(selectedName == "") return;

    const resultsContainer = document.createElement("div");
    resultsContainer.id = "results";
    document.body.appendChild(resultsContainer);

    try{
        const q = query(collection(db, selectedName+"-"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            resultsContainer.innerHTML = `<p>No data found for ${selectedName}.</p>`;
        } else {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const dataDiv = document.createElement("div");
                dataDiv.innerHTML = `
                    <h3>Item: ${data.item}</h3>
                    <p>Link: ${data.link}</p>
                    <p>Description: ${data.other}</p>
                `; // Adjust fields as per your Firestore document structure
                resultsContainer.appendChild(dataDiv);
            });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
});
