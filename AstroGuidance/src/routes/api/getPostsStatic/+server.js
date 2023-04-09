import { json } from "@sveltejs/kit";
import { dbFireStore } from "../../../firebase";
import { collection, orderBy, query, limit, getDocs } from "firebase/firestore";

export async function GET({ url }) {
	//* Retrieve all posts from firebase.
	let posts = [];
	const numberOfPosts = url.searchParams.get("numberPosts");
	const collectionRef = collection(dbFireStore, "posts");
	if (numberOfPosts != null) {
		await (
			await getDocs(query(collectionRef, orderBy("popularity", "desc"), limit(numberOfPosts)))
		).forEach((doc) => {
			posts.push({ id: doc.id, data: doc.data() });
		});
	}
	return json(posts);
}
