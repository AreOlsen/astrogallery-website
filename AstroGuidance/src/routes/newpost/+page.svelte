<script>
	import MediaGallery from "$lib/MediaGallery.svelte";
	import { goto } from "$app/navigation";
	import { auth, dbFireStore } from "../../firebase";
	import { userStore } from "$lib/authStore.ts";
	import { docStore } from "$lib/docCollectionStore.ts";
	import { setFirestoreDocument, uploadStorageImageGetData, updateFirestoreDocument } from "$lib/updateSetDoc.js";
	let user = userStore(auth);
	let userData = docStore(dbFireStore, `profiles/${$user?.uid}`);
	let title = "";
	let description = "";
	let files;
	let fileObjects = [];

	//LOAD LOCALE IMAGES FOR MEDIAGALLERY PREVIEW.
	function handleFileSelection(event) {
		// Update the files array with selected files
		files = Array.from(event.target.files);
		fileObjects = Array.from(files).map((file, index) => ({
			url: URL.createObjectURL(file),
			filetype: file.type.includes("image/") ? "image" : "video",
			title: "",
		}));
	}

	//UPLOAD POST
	async function createPost() {
		/*
			Create the post. 
		*/
		let postID = crypto.randomUUID();
		let filesData = [];

		/*
			UPLOAD ALL POST ELEMENTS (VIDEO & IMAGES).
		*/
		if (files) {
			if (files.length !== 0) {
				console.log("Uploading files.");
				for (let i = 0; i < files.length; i++) {
					let dataBack = await uploadStorageImageGetData(files[i], "postsImages");
					filesData[i] = {
						filetype: files[i].type.match("image.*") ? "image" : "video",
						url: dataBack.url,
						title: fileObjects[i].title,
					};
				}
				console.log("Uploaded files.");
			}
		}

		/* POST DATA */
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
		console.log("Publishing post.");
		//UPDATE AUTHOR'S CREATED POST ARRAY FOR DIRECT LINKING.
		await setFirestoreDocument("posts", `${postID}`, data);
		console.log("Updating author doc.");
		//IF FIRST POST, POSTS FIELD MAY BE UNDEFINED WE CHECK FOR THIS, MOST LIKELY FIRST POST.
		if (typeof $userData?.posts == "undefined" || typeof $userData?.posts == "null") {
			await updateFirestoreDocument("profiles", `${$user?.uid}`, { posts: [`${postID}`] });
		} else {
			//IF FIELD EXISTS WE EXTEND ON IT.
			await updateFirestoreDocument("profiles", `${$user?.uid}`, {
				posts: [...$userData?.posts, `${postID}`],
			});
		}
		//REROUTE USER TO THE POST CREATED.
		goto(`/forum/post/${postID}`);
	}
</script>

<main class="flex flex-col w-full lg:flex-row justify-center items-center p-6">
	<!-- POST MEDIA ELEMENTS PREVIEW.-->
	<div class="w-1/2 flex flex-col justify-center items-center gap-10 bg-base-300 p-6 rounded-box">
		<h2 class="text-4xl font-bold">Preview Media.</h2>
		<div class="carousel rounded-lg border-primary border-2 shadow-xl aspect-square max-w-[66%] bg-black">
			<!--IF NO MEDIA ELEMENTS HAVE BEEN UPLOADED WE SHOW DEFAULT IMAGE.-->
			{#if !files}
				<MediaGallery
					elements={[{ url: "/CompanyLogo/Logo.png", filetype: "image", title: "Company Logo" }]}
					postID={"newpost"}
				/>
			{:else}
				<!--IF MEDIA ELEMENTS HAVE BEEN UPLOADED WE SHOW THEM. -->
				<MediaGallery elements={fileObjects} postID={"newpost"} />
			{/if}
		</div>
	</div>
	<!--LINE SPLITTING THE PARTS.-->
	<div class="divider lg:divider-horizontal" />
	<!--POST DETAILS UPLOADING. -->
	<div class="w-1/2 flex flex-col justify-center items-center gap-3 bg-base-300 p-6 rounded-box">
		<h2 class="text-4xl font-bold">Post Details.</h2>
		<!--UPLOAD POST TITLE-->
		<label for="title" class="text-3xl font-bold">Title</label>
		<input
			type="text"
			placeholder="Title"
			class="input input-bordered input-primary w-full max-w-xs"
			id="title"
			name="title"
			bind:value={title}
		/>
		<!--UPLOAD POST DESCRIPTION-->
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
		<!--UPLOAD MEDIA ELEMENTS (TRICK: PRETTY UPLOAD BUTTON)-->
		<div>
			<label for="elements" class="btn btn-primary">UPLOAD ELEMENTS</label>
			<input
				accept=".jpg, .jpeg, .png, .gif, .mp4, .x-m4v, video/*"
				id="elements"
				class="hidden"
				type="file"
				multiple
				on:change={handleFileSelection}
				bind:files
			/>
		</div>
		<!--ADD DESCRIPTIONS TO EACH MEDIA ELEMENT (UNIVERSAL DESIGN). -->
		{#if files}
			<div class="flex flex-wrap flex-row gap-2 justify-center items-center">
				{#each files as element, i}
					<!--MEDIA ELEMENT DESCRIPTION CARD.-->
					<section class="card lg:card-side bg-base-100 shadow-xl relative">
						<!--DROPDOWN DESCRIPTION OF WHY WE WANT A DESCRIPTION (TRICK: PRETTY BUTTON DROPDOWN TRICK)-->
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

						<!--CHOOSE THE DESCRIPTION FOR THE ELEMENT.-->
						<div class="card-body">
							<label for={`file${i}`}>Choose Media Description</label>
							<input
								type="text"
								id={`file${i}`}
								name={`file${i}`}
								bind:value={fileObjects[i].title}
								placeholder={files[i].name}
								class="input input-primary"
							/>
						</div>
					</section>
				{/each}
			</div>
		{/if}
		<!--UPLOAD THE POST-->
		<button class="btn btn-primary" on:click={createPost}>UPLOAD POST</button>
	</div>
</main>
