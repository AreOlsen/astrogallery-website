<script lang="ts">
	import { docNameIDRefCollectionStore } from "$lib/docCollectionStore.ts";
	import { dbFireStore } from ".././firebase";
	let postsBasicInfo = docNameIDRefCollectionStore(dbFireStore, "posts");

	//Function uses basic levenhstein distance search.
	function search(inputArray, searchString) {
		return inputArray.filter((item) => item.title.toLowerCase().includes(searchString.trim().toLowerCase()));
	}

	let searchQuery = "";
	$: searchResults = search($postsBasicInfo, searchQuery);
</script>

<div class="w-64">
	<div class="form-control relative">
		<div class="input-group">
			<input type="text" class="input input-bordered" placeholder="Search…" bind:value={searchQuery} />
			<button class="btn btn-square">
				<img src="/Icons/search.svg" alt="Search icon" width="24px" height="24px" style="margin:0 !important" />
			</button>
		</div>
		{#if searchResults.length > 0 && searchQuery.length > 0}
			<div
				class="shadow bg-base-100 rounded-box p-2 rounded flex flex-col gap-2 absolute top-14 w-64 box-content overflow-y-auto max-h-48"
			>
				{#each searchResults as result (result.id)}
					<a
						href="/forum/post/{result.id}"
						class="block btn rounded-md p-2 shadow-xl flex justify-center items-center w-64"
						>{result.title}</a
					>
				{/each}
			</div>
		{/if}
	</div>
</div>
