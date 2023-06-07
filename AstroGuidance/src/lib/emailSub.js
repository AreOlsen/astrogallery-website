import { updateFirestoreDocument } from "./updateSetDoc.js";
import { updateNotification } from "./alertStore.ts";

export function subscribeToNewsletter(subscribeNewsletterEmail, subscribedEmails) {
	let regexEmail = /[^@\s]+@[^@\s]+\.[^@\s]+/;
	//If subscribed emails is undefined, it means the field doesn't exist server side so we create it.
	if ((subscribedEmails == undefined || subscribedEmails == null) && regexEmail.test(subscribeNewsletterEmail)) {
		updateFirestoreDocument("newsletter", "subscribedEmails", {
			emails: [subscribeNewsletterEmail],
		});
		updateNotification("Added you to the email subscription list!");
	} else {
		//If subscribed emails field exists serverside we build on it.
		if (!subscribedEmails.includes(subscribeNewsletterEmail) && regexEmail.test(subscribeNewsletterEmail)) {
			updateFirestoreDocument("newsletter", "subscribedEmails", {
				emails: [...subscribedEmails, subscribeNewsletterEmail],
			});
			updateNotification("Added you to the email subscription list!");
		}
	}
}
