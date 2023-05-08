<script>
	export let elements;
</script>

{#each elements as element, i}
	<div id="slide1" class="carousel-item relative w-full group">
		{#if element.filetype == "image"}
			<img src={element.url} alt={element.title} class="w-full h-full" id="postElement{i}" />
		{:else if element.filetype == "video"}
			<video src={element.url} class="w-full h-full" controls id="postElement{i}" />
		{/if}
		<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			<a
				href={i == 0 ? `#postElement${elements.length - 1}` : `#postElement${i - 1}`}
				class="btn btn-circle group-hover:flex group-hover:justify-center group-hover:items-center hidden">❮</a
			>
			<a
				href={i == elements.length - 1 ? "#postElement0" : `#postElement${i + 1}`}
				class="btn btn-circle group-hover:flex group-hover:justify-center group-hover:items-center hidden">❯</a
			>
		</div>
	</div>
{/each}
