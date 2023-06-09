<script lang="ts">
	import { docNameIDRefCollectionStore } from "$lib/docCollectionStore.ts";
	import { dbFireStore } from ".././firebase";
	let postsBasicInfo = docNameIDRefCollectionStore(dbFireStore, "posts");

	//Function uses basic includes search, searches the post's title.
	function search(postArray, searchString) {
		return postArray.filter((item) => item.title.toLowerCase().includes(searchString.trim().toLowerCase()));
	}

	let searchQuery = "";
	$: searchResults = search($postsBasicInfo, searchQuery);
</script>

<form class="w-64">
	<div class="form-control relative w-full">
		<input
			type="text"
			class="input input-bordered w-full border-accent"
			placeholder="Search…"
			bind:value={searchQuery}
		/>
		{#if searchResults.length > 0 && searchQuery.length > 0}
			<div
				class="w-full shadow bg-base-100 rounded-box p-2 rounded flex flex-col gap-2 absolute top-14 box-content overflow-y-auto max-h-48"
			>
				{#each searchResults as result (result.id)}
					<a
						href="/forum/post/{result.id}"
						class="block btn border-accent border-[1px] rounded-md p-2 shadow-xl flex justify-center items-center w-64"
						>{result.title}</a
					>
				{/each}
			</div>
		{/if}
	</div>
</form>
