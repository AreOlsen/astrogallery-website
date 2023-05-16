<script lang="ts">
	import { docStore } from "$lib/docCollectionStore.ts";
	import { dbFireStore, auth } from ".././firebase";
	import { updateFirestoreDocument } from "$lib/updateSetDoc.js";
	import { userStore } from "$lib/authStore.ts";
	export let commentAuthorID;
	export let commentData;
	export let commentTime;
	export let postData;
	export let postID;
	let user = userStore(auth);
	let commentAuthorData = docStore(dbFireStore, `profiles/${commentAuthorID}`);
	async function deleteComment() {
		//Remove the specific comment in mind.
		let comments_temp = [];
		$postData?.comments.forEach((object) => {
			console.log(object);
			if (
				object.commentAuthorID !== commentAuthorID ||
				object.commentData !== commentData ||
				object.commentTime !== commentTime
			) {
				comments_temp.push(object);
			}
		});
		//Update to remove the comment.
		await updateFirestoreDocument("posts", `${postID}`, { comments: comments_temp });
	}
</script>

<div class="rounded-md p-3 bg-base-300 break-words relative">
	<!--If own comment => Allows for deletion. -->
	{#if $user?.uid == commentAuthorID}
		<div class="flex flex-row justify-between items-center border-b-primary border-b-2 py-1">
			<button
				class="btn btn-square btn-ghost flex justify-center items-center h-[28px] w-[28px]"
				on:click={() => {
					deleteComment();
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/></svg
				>
			</button>
			<h4 class="font-bold text-xl">{$commentAuthorData?.username}</h4>
			<h5 class="italic text-md">{new Date(commentTime).toLocaleDateString()}</h5>
		</div>
	{:else}
		<!--Comment.-->
		<a
			class="flex flex-row justify-between items-center border-b-primary border-b-2 py-1"
			href="/profile/{commentAuthorID}"
		>
			<img
				src={$commentAuthorData?.photoURL}
				alt={$commentAuthorData?.username}
				class="rounded-full border-accent border-2 aspect-square"
				width="28px"
				height="28px"
			/>
			<h4 class="font-bold text-xl">{$commentAuthorData?.username}</h4>
			<h5 class="italic text-md">{new Date(commentTime).toLocaleDateString()}</h5>
		</a>
	{/if}
	<div class="p-2">
		<p class="font-bold">{commentData}</p>
	</div>
</div>
