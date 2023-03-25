<script>
	let backgrounds = [
		"Moon",
		"Moon2",
		"Moon3",
		"Moon4",
		"Astronaut",
		"Astronaut2",
		"Astronaut3",
		"Earth",
		"Earth2",
		"Launch",
		"Launch2",
		"Launch3",
		"Launch4",
		"Launch5",
		"Launch6",
		"Launch7",
		"Meeting",
		"NorthernLights",
		"SpaceStation",
		"USA",
		"Window",
	];
	let heroImage = backgrounds[Math.round(Math.random() * (backgrounds.length - 1))];
</script>

<main>
	<div
		class="hero min-h-screen bg-cover bg-center relative"
		style="background-image:url('HomeBackground/{heroImage}.jpg')"
	>
		<div class="hero-overlay bg-opacity-40" />
		<div class="hero-content flex-col lg:flex-row gap-8 items-center justify-start w-full">
			<div class="flex flex-col">
				<h1 class="font-bold text-7xl italic">AstroGallery</h1>
				<span class="text-accent italic text-3xl">The forum for astronomers.</span>
				<span class="opacity-50 italic">Funded & Hosted by SpaceX</span>
				<a href="/forum" class="btn btn-accent my-6">To The Forum.</a>
			</div>
			<img
				src="CompanyLogo/PeoplePerson.webp"
				class="rounded-lg"
				width="200px"
				height="200px"
				alt="AstroGallery logo."
			/>
		</div>
		<!-- Wave. -->
		<div class="absolute bottom-0 left-0 w-full overflow-hidden rotate-180" style="line-height:0">
			<svg
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1200 120"
				preserveAspectRatio="none"
				class="relative block"
				style="
				width: calc(164% + 1.3px);
				height: 154px;"
			>
				<path
					d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
					style="fill:hsl(var(--b1))"
				/>
			</svg>
		</div>
	</div>
	<div class="w-full flex flex-col gap-4 justify-center items-center">
		<h2 class="text-4xl font-bold">Trending Posts</h2>
		<div />
	</div>
	<div />
</main>
