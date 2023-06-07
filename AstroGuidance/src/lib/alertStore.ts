import { writable } from "svelte/store";
//not = notification
//show = show notification or not.
export let currentNotification = writable({ not: "", show: false });
export function updateNotification(text: string) {
	currentNotification.set({ not: text, show: true });
	setTimeout(() => {
		currentNotification.set({ not: "", show: false });
	}, 5000);
}
