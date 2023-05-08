<script lang="ts">
	import Post from "$lib/Post.svelte";
	import { dbFireStore } from "../../firebase";
	import { collectionStore } from "$lib/docCollectionStore.ts";
	let posts = collectionStore(dbFireStore, "posts");

	let searchQuery;
</script>

<main class="flex flex-col gap-4 text-center my-7">
	<h2 class="text-6xl font-bold">Forum</h2>
	<div class="flex flex-col justify-center items-center gap-2">
		<label for="searchQuery" class="text-3xl font-bold">Search</label>
		<input
			type="text"
			placeholder="Search"
			class="input input-bordered input-lg w-full max-w-xs"
			id="searchQuery"
			name="searchQuery"
			bind:value={searchQuery}
		/>
	</div>
	{#if $posts}
		<div class="m-6 w-full min-h-full grid auto-cols-[25rem] gap-6 auto-rows-[40rem]">
			{#each $posts as post}
				<Post onProfile={false} postID={post.id} />
			{/each}
		</div>
	{:else}
		<div class="w-full h-full flex justify-center items-center">
			<h2 class="text-4xl font-bold">Loading posts...</h2>
		</div>
	{/if}
</main>
