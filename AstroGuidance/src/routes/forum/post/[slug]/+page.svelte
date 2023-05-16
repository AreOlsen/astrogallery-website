<script>
	import { docStore } from "$lib/docCollectionStore.ts";
	import { dbFireStore, auth } from "../../../../firebase";
	import { userStore } from "$lib/authStore.ts";
	import { updateFirestoreDocument, deleteFireStoreDocument } from "$lib/updateSetDoc.js";
	import { goto } from "$app/navigation";
	import Comment from "$lib/Comment.svelte";
	import MediaGallery from "$lib/MediaGallery.svelte";

	export let data;

	let postData = docStore(dbFireStore, `posts/${data.slug}`);
	let user = userStore(auth);
	$: authorData = docStore(dbFireStore, `profiles/${$postData?.authorID}`);
	$: likedPost = $postData?.likesUsers.includes($user?.uid.toString());

	function likePost() {
		if ($user) {
			if (!likedPost) {
				//Like
				updateFirestoreDocument("posts", `${data.slug}`, {
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
				updateFirestoreDocument("posts", `${data.slug}`, {
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
			deleteFireStoreDocument("posts", `${data.slug}`);
			//Update author published posts.
			if ($authorData && $postData) {
				let temp = $authorData;
				var index = temp.posts.indexOf($postData?.id);
				if (index !== -1) {
					temp.posts.splice(index, 1);
				}
				updateFirestoreDocument("profiles", `${$user?.uid}`, temp);
			}
			goto("/forum/");
		}
	}

	let postCommentData;

	function postComment() {
		if ($user) {
			//Post a comment.
			if ($postData?.comments != null || $postData?.comments != undefined) {
				updateFirestoreDocument("posts", `${data.slug}`, {
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
				updateFirestoreDocument("posts", `${data.slug}`, {
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

<main class="p-20 py-12 flex flex-col gap-8">
	<h3 class="text-5xl text-center font-bold">{$postData?.title}</h3>
	<div class="flex flex-row gap-4 justify-evenly grow">
		{#if $postData?.elements}
			{#if $postData?.elements.length !== 0}
				<div class="carousel rounded-lg shadow-xl aspect-square max-h-[50vh] bg-black">
					<MediaGallery elements={$postData?.elements} />
				</div>
			{/if}
		{/if}
		<div class="flex flex-col text-center">
			<h3 class="text-2xl font-bold">Description:</h3>
			<section>
				<p class="text-center">{$postData?.description}</p>
			</section>
		</div>
	</div>
	<div class="grid grid-cols-{$user ? 2 : 1} grid-rows-1 gap-10 w-full">
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
								{postData}
								postID={data.slug}
							/>
						{/each}
					{/if}
				</section>
			{/if}
		</div>
		{#if $user}
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
		{/if}
	</div>

	<div class="flex flex-row justify-evenly items-center">
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
		{#if $postData?.authorID == $user?.uid}
			<button
				class="btn bg-base-300 rounded-lg bg-primary hover:bg-error text-white"
				on:click={() => {
					deletePost();
				}}
			>
				<span class="font-bold text-xl">DELETE POST</span>
			</button>
		{/if}
		<button
			class="btn bg-base-300 rounded-lg hover:bg-success {likedPost == true ? 'bg-primary text-white' : ''}"
			on:click={() => {
				likePost();
			}}
		>
			<img src="/Icons/heart.svg" width="24px" height="24px" alt="Like icon" />
			<span class="font-bold text-xl">{$postData?.totalLikes}</span>
		</button>
	</div>
</main>
