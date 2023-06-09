<script>
	import { docStore } from "$lib/docCollectionStore.ts";
	import { dbFireStore, auth } from "../../../../firebase";
	import { userStore } from "$lib/authStore.ts";
	import Comment from "$lib/Comment.svelte";
	import MediaGallery from "$lib/MediaGallery.svelte";
	import { postComment, deletePost, likePost } from "$lib/postHandling.js";

	export let data;

	let postData = docStore(dbFireStore, `posts/${data.slug}`);
	let user = userStore(auth);
	$: authorData = docStore(dbFireStore, `profiles/${$postData?.authorID}`);
	$: likedPost = $postData?.likesUsers.includes($user?.uid.toString());

	let postCommentData;
</script>

<!-- THIS IS THE SITE VERSION OF THE MODAL-BASED POST CARDS. -->
<main class="p-20 py-12 flex flex-col gap-8">
	<h3 class="text-5xl text-center font-bold">{$postData?.title}</h3>
	<div class="flex flex-row gap-4 justify-evenly grow">
		<!--Post Elements. -->
		{#if $postData?.elements}
			{#if $postData?.elements.length !== 0}
				<div class="carousel rounded-lg shadow-xl aspect-square max-h-[50vh] bg-black w-1/2">
					<MediaGallery elements={$postData?.elements} postID={data.slug} />
				</div>
			{/if}
		{/if}
		<!--Description of post.-->
		<div class="flex flex-col text-center w-1/2">
			<h3 class="text-2xl font-bold">Description:</h3>
			<section>
				<p class="text-center">{$postData?.description}</p>
			</section>
		</div>
	</div>
	<!--COMMENTS-->
	<div class="grid grid-cols-{$user ? 2 : 1} grid-rows-1 gap-10 w-full">
		<div class="flex flex-col gap-2">
			<h3 class="text-2xl font-bold text-center">Comments:</h3>
			{#if $postData}
				<section class="p-4 rounded-lg bg-neutral max-h-[30vh] overflow-scroll flex-1 flex flex-col gap-3">
					<!--IF NO COMMENTS -->
					<!--IF COMMENTS FIELD DOESN'T EXIST -> NO COMMENTS -->
					{#if $postData?.comments == undefined || $postData?.comments == null}
						<span class="font-bold text-xl">No comments posted.</span>
						<!--IF COMMENTS FIELD EXISTS BUT IS EMPTY -> NO COMMENTS (HAS TO BE CHECKED AFTERWARDS AS IF postData.comments IS UNDEFINED WE GET ERROR)-->
					{:else if $postData?.comments.length == 0}
						<span class="font-bold text-xl">No comments posted.</span>
						<!-- IF COMMENTS EXIST. -->
					{:else}
						<!--SHOW EACH COMMENT-->
						{#each $postData?.comments.sort((a, b) => b.commentTime - a.commentTime) as curComment (data.slug + curComment.commentAuthorID + curComment.commentTime)}
							<Comment
								commentAuthorID={curComment.commentAuthorID}
								commentData={curComment.commentData}
								commentTime={curComment.commentTime}
								{postData}
								postID={data.slug}
							/>
						{/each}
					{/if}
				</section>
			{/if}
		</div>
		<!-- POST NEW COMMENT-->
		{#if $user}
			<form class="flex flex-col gap-2 text-center">
				<label for="publishComment" class="text-2xl font-bold">Post Comment:</label>
				<div class="flex flex-row gap-2 items-center flex-1">
					<!--NEW COMMENT TEXT-->
					<textarea
						class="textarea textarea-lg textarea-accent flex-1 max-h-44 min-h-[7rem]"
						placeholder="Comment..."
						id="publishComment"
						maxlength="150"
						minlength="5"
						bind:value={postCommentData}
					/>
					<div class="divider lg:divider-horizontal" />
					<!--POST NEW COMMENT BUTTON-->
					<button
						class="btn btn-accent"
						on:click={() => {
							postComment($user, $postData, data.slug, postCommentData);
						}}>Upload</button
					>
				</div>
			</form>
		{/if}
	</div>

	<!--POST DETAILS AND STATISTICS-->
	<div class="flex flex-row justify-evenly items-center">
		<!--AUTHOR OF POST DETAILS-->
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
		<!--DELETE POST BUTTON IF AUTHOR-->
		{#if $postData?.authorID == $user?.uid}
			<button
				class="btn bg-base-300 rounded-lg bg-primary hover:bg-error text-white"
				on:click={() => {
					deletePost($user, data.slug, $postData, $authorData, true);
				}}
			>
				<span class="font-bold text-xl">DELETE POST</span>
			</button>
		{/if}
		<!--LIKE BUTTON-->
		<button
			class="btn bg-base-300 rounded-lg hover:bg-success {likedPost == true ? 'bg-primary text-white' : ''}"
			on:click={() => {
				likePost(data.slug, $postData, $user);
			}}
		>
			<img src="/Icons/heart.svg" width="24px" height="24px" alt="Like icon" />
			<span class="font-bold text-xl text-white">{$postData?.totalLikes}</span>
		</button>
	</div>
</main>
