import { updateFirestoreDocument, deleteFireStoreDocument } from "$lib/updateSetDoc.js";
import { updateNotification } from "$lib/alertStore.ts";
import { goto } from "$app/navigation";
export function likePost(postID, postData, user) {
	if (user) {
		if (!postData.likesUsers.includes(user.uid.toString())) {
			//Like
			updateFirestoreDocument("posts", `${postID}`, {
				totalLikes: postData.totalLikes + 1,
				popularity: postData.popularity + 1,
				likesUsers: [...postData.likesUsers, user.uid],
			});
		} else {
			//Remove like
			const index = postData.likesUsers.indexOf(`${user.uid}`);
			let temp = postData.likesUsers;
			if (index > -1) {
				temp.splice(index, 1);
			}
			updateFirestoreDocument("posts", `${postID}`, {
				totalLikes: postData.totalLikes - 1,
				popularity: postData.popularity - 1,
				likesUsers: temp,
			});
		}
	} else {
		updateNotification("To like the post, sign in!");
	}
}

export function deletePost(user, postID, postData, authorData, redirect) {
	if (user && user.uid == postData.authorID) {
		//Delete post document.
		deleteFireStoreDocument("posts", `${postID}`);
		//Update author published posts.
		if (authorData && postData) {
			let temp = authorData;
			var index = temp.posts.indexOf(postID);
			if (index !== -1) {
				temp.posts.splice(index, 1);
			}
			updateFirestoreDocument("profiles", `${user.uid}`, temp);
		}
		if (redirect) {
			goto("/forum/");
		}
		updateNotification("Post deleted!");
	}
}

export function postComment(user, postData, postID, postCommentData) {
	if (user) {
		//Post a comment.
		if (postData.comments != null || postData.comments != undefined) {
			updateFirestoreDocument("posts", `${postID}`, {
				comments: [
					...postData.comments,
					{
						commentAuthorID: user.uid,
						commentData: postCommentData,
						commentTime: Date.now(),
					},
				],
				popularity: postData.popularity + 2,
			});
		} else {
			//Post the first comment. (Cannot use postData.comments if is undefined)
			updateFirestoreDocument("posts", `${postID}`, {
				comments: [
					{
						commentAuthorID: user.uid,
						commentData: postCommentData,
						commentTime: Date.now(),
					},
				],
				popularity: postData.popularity + 2,
			});
		}
	} else {
		updateNotification("To comment on the post, sign in!");
	}
}
