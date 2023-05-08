<script lang="ts">
	import { docStore } from "$lib/docCollectionStore.ts";
	import { dbFireStore } from ".././firebase";
	export let commentAuthorID;
	export let commentData;
	export let commentTime;
	let commentAuthorData = docStore(dbFireStore, `profiles/${commentAuthorID}`);
</script>

<div class="rounded-md p-3 bg-base-300 break-words">
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
	<div class="p-2">
		<p class="font-bold">{commentData}</p>
	</div>
</div>
