import { dbFireStore, storage } from "../firebase";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const updateFirestoreDocument = async (
	collection,
	docId,
	data,
	docRef = doc(dbFireStore, collection, docId)
) => {
	try {
		await updateDoc(docRef, data);
		console.log("Document updated successfully!");
	} catch (error) {
		console.error("Error updating document: ", error);
	}
};

export const setFirestoreDocument = async (collection, docId, data, docRef = doc(dbFireStore, collection, docId)) => {
	try {
		await setDoc(docRef, data);
		console.log("Document created successfully!");
	} catch (error) {
		console.error("Error creating document: ", error);
	}
};

export const deleteFireStoreDocument = async (collection, docID, docRef = doc(dbFireStore, collection, docID)) => {
	try {
		await deleteDoc(docRef);
	} catch (error) {
		console.log("Error deleting document: ", error);
	}
};

export const uploadStorageImageGetData = async (
	file,
	child,
	storageRef = ref(storage, `${child}/${crypto.randomUUID()}`)
) => {
	try {
		const snapshot = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(snapshot.ref);
		return { url: url.toString(), ref: storageRef };
	} catch (error) {
		console.log("Error uploading file:", error);
	}
};

export const deleteStorageObject = async (filename, child, storageRef = ref(storage, `${child}/${filename}`)) => {
	try {
		await deleteObject(storageRef);
	} catch (error) {
		console.log("Error deleiting object: ", error);
	}
};
