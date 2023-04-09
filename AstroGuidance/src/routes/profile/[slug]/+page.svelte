<script lang="ts">
	import { auth, dbFireStore } from "../../../firebase.js";
	import { userStore } from "$lib/authStore.ts";
	import { docStore } from "$lib/docCollectionStore.ts";
	import {
		uploadStorageImageGetURL,
		updateFirestoreDocument,
		deleteStorageObject,
	} from "../../../lib/updateSetDoc.js";
	export let data;

	let user = userStore(auth);
	let profile = docStore(dbFireStore, `profiles/${data.slug}`);

	let editingProfile = false;

	//For previewing the new profile image.
	//fileIMG is img element, fileIMGUPLOAD is the input element.files
	let profileIMG;
	let profileIMGUPLOAD;
	$: if (profileIMGUPLOAD) {
		const fileReader = new FileReader();
		fileReader.onload = function (event) {
			profileIMG.src = event.target.result;
		};
		fileReader.readAsDataURL(profileIMGUPLOAD[0]);
	}

	// function to update profile with new data.
	//! SOMETHING WRONG HERE.
	let usernameNEW = profile.username;
	let statusNEW = profile.status;
	let contactNEW = profile.contact;
	let biographyNEW = profile.biography;
	let profilepicNEW = profile.photoURL;
	async function updateProfile() {
		if (profileIMGUPLOAD[0] != undefined || profileIMGUPLOAD[0] != null) {
			profilepicNEW = await uploadStorageImageGetURL(profileIMGUPLOAD[0], "images");
		}
		await updateFirestoreDocument("profiles", `${$profile?.uid}`, {
			status: `${statusNEW}`,
			username: `${user?.displayName}`,
			biography: `${biographyNEW}`,
			contact: `${contactNEW}`,
			photoURL: `${profilepicNEW}`,
		});
	}
</script>

<main class="grid grid-cols-12 w-full min-h-screen grid-rows-1 p-10">
	<!-- Check if own profile. If own -> we allow edits to profile data -> double checked by firestore rules. -->
	<div
		class="bg-base-200 shadow-xl col-span-3 rounded-3xl flex flex-col justify-start items-center gap-8 py-20 p-8 text-center"
	>
		<div class="w-3/4 flex flex-col justify-center items-center gap-2">
			{#if !editingProfile}
				<img
					src={$profile?.photoURL}
					alt="User profile pic"
					class="rounded-full w-1/2 aspect-square"
					style="border:4px solid hsl(var(--a))"
				/>
				<h2 class="text-2xl font-bold">{$profile?.username}</h2>
				<span class="text-xl italic">{$profile?.status}</span>
			{:else}
				<div class="flex flex-row gap-4 justify-center items-center">
					<img
						src={$profile?.photoURL}
						alt="New profile pic"
						bind:this={profileIMG}
						class="rounded-full w-1/2 aspect-square"
						style="border:4px solid hsl(var(--a))"
					/>
					<div>
						<label for="newProfilePic" class="btn btn-accent">Select Image</label>
						<input
							accept=".jpg, .jpeg, .png"
							id="newProfilePic"
							class="hidden"
							type="file"
							bind:files={profileIMGUPLOAD}
						/>
					</div>
				</div>
				<input
					type="text"
					placeholder={$profile?.username}
					id="usernameEdit"
					class="input input-lg input-ghost font-bold h-min text-2xl font-bold placeholder:text-2xl placeholder:font-bold placeholder:text-center"
					maxlength="30"
					bind:value={usernameNEW}
				/>
				<textarea
					class="textarea textarea-sm textarea-ghost h-24 max-h-24 text-xl italic placeholder:text-center placeholder:text-xl placeholder:italic"
					placeholder={$profile?.status}
					id="statusEdit"
					maxlength="50"
					bind:value={statusNEW}
				/>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex flex-row gap-2 items-center justify-center">
				<img src="../Icons/text.svg" height="24px" width="24px" alt="Text icon" />
				<h3>Biography:</h3>
			</div>
			{#if !editingProfile}
				<p class="text-sm">{$profile?.biography}</p>
			{:else}
				<textarea
					class="textarea textarea-lg textarea-ghost h-52 max-h-52 text-sm placeholder:text-sm placeholder:text-center"
					maxlength="160"
					placeholder={$profile?.biography}
					bind:value={biographyNEW}
				/>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex flex-row gap-2 items-center justify-center">
				<img src="../Icons/contact.svg" height="24px" width="24px" alt="Contact icon" />
				<h3>Contact:</h3>
			</div>
			<div>
				{#if !editingProfile}
					<span class="text-sm">{$profile?.contact}</span>
				{:else}
					<input
						type="text"
						placeholder={$profile?.contact}
						class="input input-ghost input-lg h-min placeholder:text-sm"
						maxlength="320"
						bind:value={contactNEW}
					/>
				{/if}
			</div>
		</div>
		{#if $user?.uid == data.slug}
			{#if !editingProfile}
				<button
					class="btn btn-accent"
					on:click={() => {
						editingProfile = true;
					}}>Edit profile</button
				>
			{:else}
				<button
					class="btn btn-accent"
					on:click={async () => {
						editingProfile = false;
						await updateProfile();
					}}>Save edits</button
				>
			{/if}
		{/if}
	</div>
	<div class="col-span-9 flex justify-center items-center"><h2>Published Posts:</h2></div>
</main>
