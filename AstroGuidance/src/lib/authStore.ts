import { writable } from "svelte/store";
import { onAuthStateChanged, type Auth } from "firebase/auth";
import { setFirestoreDocument } from "./updateSetDoc";
export function userStore(auth: Auth) {
	let unsubscribe: () => void;

	const { subscribe } = writable(auth.currentUser, (set) => {
		unsubscribe = onAuthStateChanged(auth, async (user) => {
			set(user);

			//If this is the first time the user is logged in -> create profile data.
			if (user?.metadata.creationTime == user?.metadata.lastSignInTime) {
				if (user?.uid != undefined) {
					await setFirestoreDocument("profiles", `${user?.uid}`, {
						status: "🌳 Hello world!",
						username: `${user?.displayName}`,
						biography:
							"Crafting a bio is essential as it allows you to highlight your achievements, showcase your personality, make connections, and build relationships. Who doesn't love talking about themselves, after all?",
						contact: `${user?.email}`,
						photoURL: `${user?.photoURL}`,
						posts: [],
					});
				}
			}
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
	};
}
