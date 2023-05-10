<script>
	import MediaGallery from "$lib/MediaGallery.svelte";
	import { auth, dbFireStore } from "../../firebase";
	import { userStore } from "$lib/authStore.ts";
	import { docStore } from "$lib/docCollectionStore.ts";
	import { setFirestoreDocument, uploadStorageImageGetData, updateFirestoreDocument } from "$lib/updateSetDoc.js";
	let user = userStore(auth);
	let userData;
	if ($user) {
		userData = docStore(`profiles/${$user?.uid}`);
	}
	let title;
	let description;
	let files;
	let filesTitles = [];

	async function createPost() {
		/*
			Create the post. 
		*/
		let postID = crypto.randomUUID();
		let filesData = [];
		if (typeof files != "undefined" || typeof files != "null") {
			for (let i = 0; i < files.length; i++) {
				let dataBack = await uploadStorageImageGetData(files[i], "postsImages");
				filesData[i] = {
					filetype: files[i].type.match("image.*") ? "image" : "video",
					url: dataBack.url,
					title: filesTitles[i],
				};
			}
		}

		let data = {
			comments: [],
			title: title,
			description: description,
			totalLikes: 1,
			likesUsers: [`${$user?.uid}`],
			popularity: 1,
			authorID: $user?.uid,
			id: postID,
			elements: filesData,
		};
		await setFirestoreDocument("posts", `${postID}`, data);
		await updateFirestoreDocument("profiles", `${$user?.uid}`, { posts: [`${postID}`] });
	}
</script>

<main class="flex flex-col w-full lg:flex-row justify-center items-center p-6">
	<div class="w-1/2 flex flex-col justify-center items-center gap-10 bg-base-300 p-6 rounded-box">
		<h2 class="text-4xl font-bold">Preview Media.</h2>
		<div class="w-1/2 aspect-square border-primary border-2 rounded-3xl p-4 bg-black">
			<MediaGallery elements={[{ url: "/CompanyLogo/Logo.png", filetype: "image", title: "Hello" }]} />
		</div>
	</div>
	<div class="divider lg:divider-horizontal" />
	<div class="w-1/2 flex flex-col justify-center items-center gap-3 bg-base-300 p-6 rounded-box">
		<h2 class="text-4xl font-bold">Post Details.</h2>
		<label for="title" class="text-3xl font-bold">Title</label>
		<input
			type="text"
			placeholder="Title"
			class="input input-bordered input-primary w-full max-w-xs"
			id="title"
			name="title"
			bind:value={title}
		/>
		<label for="description" class="text-3xl font-bold">Description</label>
		<textarea
			placeholder="Description"
			rows="5"
			maxlength="150"
			minlength="10"
			class="textarea textarea-primary textarea-bordered w-full max-w-xs"
			id="description"
			name="description"
			bind:value={description}
		/>
		<div>
			<label for="elements" class="btn btn-primary">UPLOAD ELEMENTS</label>
			<input
				accept=".jpg, .jpeg, .png, .gif, video/mp4, video/x-m4v, video/*"
				id="elements"
				class="hidden"
				type="file"
				multiple
				bind:files
			/>
		</div>
		<div>
			{#if files}
				<div class="grid grid-cols-{files.length > 1 ? 2 : 1} auto-rows-[10rem] gap-2">
					{#each files as element, i}
						<section class="card lg:card-side bg-base-100 shadow-xl relative">
							<div class="dropdown dropdown-end absolute top-2 right-2">
								<label tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										class="w-4 h-4 stroke-current"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="3"
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/></svg
									>
								</label>
								<div
									tabindex="0"
									class="card compact dropdown-content shadow bg-base-100 rounded-box w-64 border-primary border-[1px]"
								>
									<div class="card-body">
										<h2 class="card-title">What is this?</h2>
										<p>We require a description for universal design!</p>
									</div>
								</div>
							</div>
							<figure><img src="" alt="" class="rounded-full" /></figure>
							<div class="card-body">
								<label for={`file${i}`}>Choose Media Description</label>
								<input
									type="text"
									id={`file${i}`}
									name={`file${i}`}
									bind:value={filesTitles[i]}
									placeholder="Media Description"
									class="input input-primary"
								/>
							</div>
						</section>
					{/each}
				</div>
			{/if}
		</div>
		<button class="btn btn-primary" on:click={createPost}>UPLOAD POST</button>
	</div>
</main>
