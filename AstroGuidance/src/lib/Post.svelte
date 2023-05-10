<script lang="ts">
	export let postID;
	export let onProfile;
	import { docStore } from "$lib/docCollectionStore.ts";
	import { dbFireStore, auth } from ".././firebase";
	import { userStore } from "$lib/authStore.ts";
	import { updateFirestoreDocument, deleteFireStoreDocument } from "$lib/updateSetDoc.js";
	import Comment from "$lib/Comment.svelte";
	import MediaGallery from "./MediaGallery.svelte";
	let user = userStore(auth);
	let postData = docStore(dbFireStore, `posts/${postID}`);
	$: authorData = docStore(dbFireStore, `profiles/${$postData?.authorID}`);
	$: likedPost = $postData?.likesUsers.includes($user?.uid.toString());
	function likePost() {
		if ($user) {
			if (!likedPost) {
				//Like
				updateFirestoreDocument("posts", `${postID}`, {
					totalLikes: $postData?.totalLikes + 1,
					popularity: $postData?.popularity + 1,
					likesUsers: [...$postData?.likesUsers, $user?.uid],
				});
			} else {
				//Remove like
				const index = $postData?.likesUsers.indexOf(`${$user?.uid}`);
				let temp = $postData?.likesUsers;
				if (index > -1) {
					temp.splice(index, 1);
				}
				updateFirestoreDocument("posts", `${postID}`, {
					totalLikes: $postData?.totalLikes - 1,
					popularity: $postData?.popularity - 1,
					likesUsers: temp,
				});
			}
		}
	}

	function deletePost() {
		if ($user && $user?.uid == $postData?.authorID) {
			//Delete post document.
			deleteFireStoreDocument("posts", `${postID}`);
			//Update author published posts.
			if ($authorData && $postData) {
				let temp = $authorData;
				var index = temp.posts.indexOf($postData?.id);
				if (index !== -1) {
					temp.posts.splice(index, 1);
				}
				updateFirestoreDocument("posts", `${postID}`, temp);
			}
		}
	}

	let postCommentData;

	function postComment() {
		if ($user) {
			//Post a comment.
			if ($postData?.comments != null || $postData?.comments != undefined) {
				updateFirestoreDocument("posts", `${postID}`, {
					comments: [
						...$postData?.comments,
						{
							commentAuthorID: $user?.uid,
							commentData: postCommentData,
							commentTime: Date.now(),
						},
					],
				});
			} else {
				//Post the first comment. (Cannot use postData.comments if is undefined)
				updateFirestoreDocument("posts", `${postID}`, {
					comments: [
						{
							commentAuthorID: $user?.uid,
							commentData: postCommentData,
							commentTime: Date.now(),
						},
					],
				});
			}
		} else {
			console.log("Needs to sign in to comment.");
		}
	}
</script>

<article class="bg-base-300 flex flex-col items-center gap-2 rounded-lg shadow-2xl text-center relative p-10 py-4">
	<h1 class="font-bold text-4xl break-words max-w-full">{$postData?.title.slice(0, 25)}</h1>
	{#if $postData?.elements[0].filetype == "image" && $postData?.elements[0].url.length != 0}
		<img
			src={$postData?.elements[0].url}
			alt={$postData?.title}
			class="rounded-lg border-accent shadow-xl h-[55%] w-[100%]"
		/>
	{:else if $postData?.elements[0].filetype == "video" && $postData?.elements[0].url.length != 0}
		<video src={$postData?.elements[0].url} class="rounded-lg border-accent shadow-xl h-[55%] w-[100%]" controls />
	{/if}
	<p class="break-words max-w-full">{$postData?.description.slice(0, 50)}</p>
	<button
		class="btn bg-base-300 rounded-lg flex flex-row gap-2 absolute right-5 bottom-5 {likedPost == true
			? 'bg-primary text-white'
			: ''}"
		on:click={() => {
			likePost();
		}}
	>
		<img src="/Icons/heart.svg" width="24px" height="24px" alt="Like icon" />
		<span class="font-bold text-xl">{$postData?.totalLikes}</span>
	</button>
	<!-- The button to open post MODAL.  -->
	<label for="postMODAL" class="btn btn-accent absolute left-5 bottom-5">More details.</label>
</article>

<!-- POST MODAL  -->

<input type="checkbox" id="postMODAL" class="modal-toggle" />
<div class="modal">
	<div class="modal-box max-w-5xl relative p-7 pb-20 flex flex-col gap-6">
		<label for="postMODAL" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-5xl text-center font-bold">{$postData?.title}</h3>
		<div class="flex flex-row gap-4 justify-evenly">
			<div class="carousel rounded-lg border-accent shadow-xl aspect-square max-h-[50vh] bg-black">
				{#if $postData?.elements}
					<MediaGallery elements={$postData?.elements} />
				{/if}
			</div>
			<div class="flex flex-col text-center">
				<h3 class="text-2xl font-bold">Description:</h3>
				<section>
					<p class="text-center">{$postData?.description}</p>
				</section>
			</div>
		</div>
		<div class="grid grid-cols-2 grid-rows-1 gap-10 w-full">
			<div class="flex flex-col gap-2">
				<h3 class="text-2xl font-bold text-center">Comments:</h3>
				{#if $postData}
					<section class="p-4 rounded-lg bg-neutral max-h-[30vh] overflow-scroll flex-1 flex flex-col gap-3">
						{#if $postData?.comments == undefined || $postData?.comments == null}
							<span class="font-bold text-xl">No comments posted.</span>
						{:else if $postData?.comments.length == 0}
							<!-- Has to be checked afterwards because we cannot read length of undefined.-->
							<span class="font-bold text-xl">No comments posted.</span>
						{:else}
							{#each $postData?.comments.sort((a, b) => b.commentTime - a.commentTime) as comment, i}
								<Comment
									commentAuthorID={comment.commentAuthorID}
									commentData={comment.commentData}
									commentTime={comment.commentTime}
								/>
							{/each}
						{/if}
					</section>
				{/if}
			</div>
			<div class="flex flex-col gap-2 text-center">
				<label for="publishComment" class="text-2xl font-bold">Post Comment:</label>
				<div class="flex flex-row gap-2 items-center flex-1">
					<textarea
						class="textarea textarea-lg textarea-accent flex-1 max-h-44 min-h-[7rem]"
						placeholder="Comment..."
						id="publishComment"
						maxlength="150"
						minlength="5"
						bind:value={postCommentData}
					/>
					<div class="divider lg:divider-horizontal" />
					<button
						class="btn btn-accent"
						on:click={() => {
							postComment();
						}}>Upload</button
					>
				</div>
			</div>
		</div>

		<div class="flex flex-row justify-evenly items-center">
			{#if !onProfile}
				<a
					href="/profile/{$postData?.authorID}"
					class="p-1 btn-ghost flex flex-row gap-3 justify-center items-center rounded-md"
				>
					<img
						src={$authorData?.photoURL}
						alt="{$authorData?.username} profile"
						class="rounded-full aspect-square"
						style="border:2px solid hsl(var(--a))"
						width="50px"
						height="50px"
					/><span>{$authorData?.username}</span></a
				>
			{/if}
			{#if $postData?.authorID == $user?.uid}
				<button
					class="btn bg-base-300 rounded-lg bg-primary hover:bg-error text-white}"
					on:click={() => {
						deletePost();
					}}
				>
					<span class="font-bold text-xl">DELETE POST</span>
				</button>
			{/if}
			<button
				class="btn bg-base-300 rounded-lg {likedPost == true ? 'bg-primary text-white' : ''}"
				on:click={() => {
					likePost();
				}}
			>
				<img src="/Icons/heart.svg" width="24px" height="24px" alt="Like icon" />
				<span class="font-bold text-xl">{$postData?.totalLikes}</span>
			</button>
		</div>
	</div>
</div>
