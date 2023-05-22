import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// Firebase config, connecting to the servers.
const firebaseConfig = {
	apiKey: "AIzaSyCDnS2BOg57WiAjXaOfk0HUFOpI-DboGlo",
	authDomain: "astronomi-e7378.firebaseapp.com",
	databaseURL: "https://astronomi-e7378-default-rtdb.europe-west1.firebasedatabase.app/",
	projectId: "astronomi-e7378",
	storageBucket: "astronomi-e7378.appspot.com",
	messagingSenderId: "722166259201",
	appId: "1:722166259201:web:ab73112e1b044c2594aa00",
	measurementId: "G-RDZGZV2WWX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dbFireStore = getFirestore(app);
export const storage = getStorage(app);
