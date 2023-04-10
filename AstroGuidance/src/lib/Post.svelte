<script>
	export let postID;
	export let onProfile;
	import { docStore } from "$lib/docCollectionStore.ts";
	import { dbFireStore } from ".././firebase";
	let postData = docStore(dbFireStore, `posts/${postID}`);
	$: authorData = docStore(dbFireStore, `profiles/${$postData?.authorID}`);
</script>

<div class="bg-base-300 flex flex-col justify-center items-center gap-2 rounded-lg shadow-2xl text-center relative">
	<h1 class="font-bold text-4xl">{$postData?.title.slice(0, 25)}</h1>
	{#if $postData?.imageSRC}
		<img src={$postData?.imageSRC} alt={$postData?.title} class="rounded-lg border-accent shadow-xl" />
	{/if}
	<p>{$postData?.description.slice(0, 50)}</p>
	{#if !onProfile}
		<a
			href="/profile/{$postData?.authorID}"
			class="p-1 btn-ghost flex flex-row gap-3 justify-center items-center rounded-md absolute left-3 bottom-3"
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

	<button class="btn btn-accent">More details.</button>
</div>
