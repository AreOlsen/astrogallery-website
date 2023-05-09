<script lang="ts">
	import Post from "$lib/Post.svelte";
	import { dbFireStore } from "../../firebase";
	import { collectionStore } from "$lib/docCollectionStore.ts";
	let posts = collectionStore(dbFireStore, "posts");
</script>

<main class="flex flex-col gap-4 text-center">
	<div class="flex flex-row justify-evenly items-center border-b-accent-focus border-b-[1px] py-6">
		<h2 class="text-6xl font-bold">Forum</h2>
	</div>
	{#if $posts}
		<div class="m-6 w-full min-h-full grid auto-cols-[25rem] gap-6 auto-rows-[40rem]">
			{#each $posts as post}
				<Post onProfile={false} postID={post.id} />
			{/each}
		</div>
	{:else}
		<div class="h-full flex justify-center items-center">
			<h2 class="text-4xl font-bold">Loading posts...</h2>
		</div>
	{/if}
</main>
