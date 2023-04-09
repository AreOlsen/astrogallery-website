import { dbFireStore, storage } from "../firebase";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const updateFirestoreDocument = async (collection, docId, data) => {
	try {
		const docRef = doc(dbFireStore, collection, docId);
		await updateDoc(docRef, data);
		console.log("Document updated successfully!");
	} catch (error) {
		console.error("Error updating document: ", error);
	}
};

export const setFirestoreDocument = async (collection, docId, data) => {
	try {
		const docRef = doc(dbFireStore, collection, docId);
		await setDoc(docRef, data);
		console.log("Document created successfully!");
	} catch (error) {
		console.error("Error creating document: ", error);
	}
};

export const deleteFireStoreDocument = async (collection, docID) => {
	try {
		const docRef = doc(dbFireStore, collection, docID);
		await deleteDoc(docRef);
	} catch (error) {
		console.log("Error deleting document: ", error);
	}
};

export const uploadStorageImageGetURL = async (file, child) => {
	try {
		const storageRef = ref(storage, `${child}/${file.name}`);
		await uploadBytes(storageRef, file).then(async (snapshot) => {
			console.log("Uploaded image file");
			return await getDownloadURL(snapshot.ref);
		});
	} catch (error) {
		console.log("Error uploading file:", error);
	}
};

export const deleteStorageObject = async (filename, child) => {
	try {
		const storageRef = ref(storage, `${child}/${filename}`);
		await deleteObject(storageRef);
	} catch (error) {
		console.log("Error deleiting object: ", error);
	}
};
