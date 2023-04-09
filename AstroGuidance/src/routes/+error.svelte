<script>
	import { page } from "$app/stores";
</script>

<main class="flex flex-col gap-2 justify-center items-center">
	<h1 class="text-5xl">Error:</h1>
	<h2 class="text-3xl">{$page.error.message}</h2>
	<a href="/" class="btn btn-accent">GO TO HOME.</a>
</main>
