<script>
	export let elements;
	export let postID;
</script>

{#each elements as element, i}
	<div class="carousel-item relative w-full group">
		{#if element.filetype == "image"}
			<img src={element.url} alt={element.title} class="w-full h-full" id="postElement{postID}{i}" />
		{:else if element.filetype == "video"}
			<video src={element.url} class="w-full h-full" controls id="postElement{postID}{i}" />
		{/if}
		{#if elements.length != 1}
			<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a
					href={i == 0 ? `#postElement${postID}${elements.length - 1}` : `#postElement${postID}${i - 1}`}
					class="btn btn-circle group-hover:flex group-hover:justify-center group-hover:items-center hidden"
					>❮</a
				>
				<a
					href={i == elements.length - 1 ? `#postElement${postID}0` : `#postElement${postID}${i + 1}`}
					class="btn btn-circle group-hover:flex group-hover:justify-center group-hover:items-center hidden"
					>❯</a
				>
			</div>
		{/if}
	</div>
{/each}
