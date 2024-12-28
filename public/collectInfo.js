// Set up Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  authDomain: "secret-santa-2025-6e38f.web.app",
  projectId: "secret-santa-2025-6e38f",
  appId: "1:724496064011:web:223bc1dc86c65c129d310e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Debug mode
let DEBUG = true;

// Form submission
document.getElementById('itemInfo').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Raw information collected
  const form = document.getElementById('itemInfo');

  // Create an array of key-value pairs holding information
  const data = new FormData(form);

  // Extract data from form
  const identity = data.get('identity'); // User's identity
  const item = data.get('item'); // Gift item
  const link = data.get('link'); // Link to the gift
  const other = data.get('other'); // Additional info
  const file = data.get('pic'); // File (image)

  // Debugging: Log form data
  if (DEBUG) {
    console.log('Form submitted');
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    if (file && file.name) {
      console.log(`File name: ${file.name}`);
    }
  }

  try {
    // Example: Firestore structure -> secretSantta/groupID/giftLists/userID/items
    const groupID = "group1"; // Replace with the actual group ID
    const userID = identity; // Assuming identity is the user ID

    // Firestore reference
    const userRef = doc(db, "secretSantta", groupID, "giftLists", userID);
    
    // Firestore data structure
    const itemData = {
      item: item,
      link: link,
      other: other,
      timestamp: new Date().toISOString()
    };

    // Add data to Firestore
    await setDoc(userRef, { items: [itemData] }, { merge: true });

    // Notify user of success
    alert("Your list has been successfully submitted!");
    form.reset();
  } catch (error) {
    console.error("Error submitting form to Firestore:", error);
    alert("An error occurred. Please try again.");
  }
});
