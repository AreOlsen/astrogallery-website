import { json } from "@sveltejs/kit";
import { dbFireStore } from "../../../firebase";

import { getDoc, doc } from "firebase/firestore";

export async function GET({ url }) {
	//* Retrieve specific post from firebase.
	const postID = url.searchParams.get("postID");
	const postRef = doc(dbFireStore, "posts", postID);
	const postSnap = await getDoc(postRef);
	if (postSnap.exists()) {
		return json({
			postID: postSnap.id,
			postContent: postSnap.data(),
		});
	} else {
		return new Response("No such document exists.");
	}
}
