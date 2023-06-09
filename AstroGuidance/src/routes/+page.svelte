<script>
	/* SERVER SIDE RENDER PRECHOOSE HERO IMAGE.*/
	/** @type {import('./$types').PageData} */ export let data;

	// Get the top 3 posts and render them, this uses fetch and is not dynamic for change.
	async function retrievePosts() {
		let response = await fetch(
			"/api/getPostsStatic?" +
				new URLSearchParams({
					numberPosts: 3,
				})
		);
		return await response.json();
	}
</script>

<main>
	<!-- HERO OF MAIN PAGE. -->
	<div
		class="hero min-h-screen bg-cover bg-center relative"
		style="background-image:url('/HomeBackground/Hero/{data.images.heroImage}.jpg')"
	>
		<div class="hero-overlay bg-opacity-40" />
		<div class="hero-content flex-col lg:flex-row gap-8 items-center justify-start w-full">
			<div class="flex flex-col">
				<h1 class="font-bold text-7xl italic">AstroGuidance</h1>
				<span class="text-accent italic text-3xl">The forum for astronomers.</span>
				<span class="italic">Funded & Hosted by SpaceX</span>
				<a href="/forum" class="btn btn-accent my-6">To The Forum.</a>
			</div>
			<img src="CompanyLogo/Logo.png" class="rounded-lg" width="200px" height="200px" alt="AstroGuidance logo." />
		</div>
		<!-- WAVE ON BOTTOM OF THE HERO.-->
		<div class="absolute bottom-0 left-0 w-full overflow-hidden rotate-180 leading-[0rem]">
			<svg
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1200 120"
				preserveAspectRatio="none"
				class="relative block h-[154px] w-[calc(164%+1.3px)]"
			>
				<path
					d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
					style="fill:hsl(var(--b1))"
				/>
			</svg>
		</div>
	</div>
	<!-- TOP POSTS - DIFFERENT TYPE OF POST CARD THAN "Post.svelte" COMPONENT. .-->
	<div class="w-full flex flex-col gap-10 justify-center items-center p-10">
		<h2 class="font-bold text-5xl">Top Posts.</h2>
		<!-- POSTS.-->
		<div class="flex items-center justify-center gap-20 flex-wrap">
			<!--While loading posts-->
			{#await retrievePosts()}
				<h2 class="text-xl font-bold italic my-20">Loading trending posts...</h2>
				<!-- When retrieved posts we render each post as a div.-->
			{:then posts}
				{#each posts as post, i}
					<!--STATIC-ESQUE POST CARD, DIFFERENT FROM POST.SVELTE COMPONENT-->
					<div class="card w-96 bg-base-300 rounded-2xl shadow-xl relative h-[35rem]">
						<div class="card-body flex flex-col justify-between gap-4 text-center">
							<h2 class="card-title font-bold text-3xl truncate h-8">
								{post.data.title.slice(0, 20)}{#if post.data.title.length > 20}...{/if}
							</h2>
							<!-- If we have an image or video for the post.-->
							{#if post.data.elements}
								{#if post.data.elements.length !== 0}
									<!-- Is it an image or video?-->
									{#if post.data.elements[0].filetype == "image"}
										<img
											src={post.data.elements[0].url}
											alt={post.data.description}
											class="h-72 w-full rounded-lg bg-base-200"
										/>
									{:else if post.data.elements[0].filetype == "video"}
										<video
											src={post.data.elements[0].url}
											class="h-72 w-full rounded-lg bg-black"
											controls
										/>
									{/if}
								{/if}
							{/if}
							<!--The description of the post.-->
							<span class="text-xl">
								{post.data.description.slice(0, 50)}{#if post.data.description.Length > 50}...{/if}
							</span>
							<!--Statistics and misc. of post.-->
							<div class="card-actions">
								<a class="btn btn-accent" href="/forum/post/{post.id}">Go to post.</a>
							</div>
							<div class="badge badge-lg absolute bottom-5 right-5 p-4 flex flex-row gap-2">
								<img src="Icons/heart.svg" alt="Heart icon" />
								<span class="text-[hsl(var(--bc))]">{post.data.totalLikes}</span>
							</div>
						</div>
					</div>
				{/each}
			{/await}
		</div>
	</div>
	<!-- ABOUT US.-->
	<div class="w-full gap-10 flex flex-col justify-center items-center bg-base-200 p-10 py-20">
		<h2 class="font-bold text-4xl">About AstroGuidance.</h2>
		<!-- A list of different rectangles which shows information about the site.-->
		<div class="gap-16 flex items-center justify-center gap-20 flex-wrap">
			<!--FORUM-WEBSITE INFO-->
			<div class="card bg-base-100 w-full sm:w-96 shadow-xl">
				<div class="card-body items-center text-center">
					<img src="Icons/forumNotepad.svg" height="128px" width="128px" alt="A minimalistic notepad." />
					<h2 class="card-title">Forum!</h2>
					<p>
						We are primarily a forum website and company allowing astronomers around the world to share
						their findings, understandings and research.
					</p>
				</div>
			</div>
			<!--SCIENCE BASED INFO.-->
			<div class="card bg-base-100 w-full sm:w-96 shadow-xl">
				<div class="card-body items-center text-center">
					<img src="Icons/astronomyPlanet.svg" height="128px" width="128px" alt="A planet with rings." />
					<h2 class="card-title">Science Based!</h2>
					<p>
						We are focused on science and research, the contents and ideas shown on this website are always
						science related or space inspired.
					</p>
				</div>
			</div>
			<!--CLIMATE FRIENDLY INFO. -->
			<div class="card bg-base-100 w-full sm:w-96 shadow-xl">
				<div class="card-body items-center text-center">
					<img src="Icons/recycle.svg" height="128px" width="128px" alt="Recycling icon." />
					<h2 class="card-title">Climate Friendly!</h2>
					<p>
						Our services are 100% run on green energy, and some of our profits go directly into helping the
						climate, through planting new trees and capturing carbon!
					</p>
				</div>
			</div>
		</div>
	</div>
	<!-- SOCIALS.-->
	<div
		class="w-full flex flex-col gap-4 justify-center items-center bg-cover bg-center bg-[url('/HomeBackground/Backgrounds/Nebula.jpg')]"
	>
		<!-- WAVE ABOVE SOCIALS. -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1440 320"
			class="relative block w-full h-[200px]"
			preserveAspectRatio="none"
		>
			<path
				fill-opacity="1"
				d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,165.3C840,181,960,235,1080,224C1200,213,1320,139,1380,101.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
				style="fill:hsl(var(--b2))"
			/>
		</svg>
		<!-- CONTENT OF SOCIALS.-->
		<div class="py-20 gap-4 justify-center items-center flex flex-col">
			<h2 class="text-4xl font-bold">Follow the stars.</h2>
			<nav class="flex flex-row gap-4">
				<!--Instagram social link-->
				<a href="https://www.instagram.com" class="p-4">
					<img src="Socials/instagram.svg" alt="Instagram logo." />
				</a>
				<!--Youtube social link-->
				<a href="https://www.youtube.com" class="p-4">
					<img src="Socials/youtube.svg" alt="Youtube logo." />
				</a>
				<!--Twitter social link-->
				<a href="https://twitter.com/" class="p-4">
					<img src="Socials/twitter.svg" alt="Twitter logo." />
				</a>
			</nav>
		</div>
	</div>
</main>
