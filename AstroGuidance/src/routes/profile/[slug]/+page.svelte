<script lang="ts">
	import { auth, dbFireStore, storage } from "../../../firebase.js";
	import { userStore } from "$lib/authStore.ts";
	import { docStore } from "$lib/docCollectionStore.ts";
	import { uploadStorageImageGetData, updateFirestoreDocument } from "$lib/updateSetDoc.js";
	import { updateProfile } from "firebase/auth";
	import Post from "$lib/Post.svelte";
	export let data;
	let user = userStore(auth);
	let profile = docStore(dbFireStore, `profiles/${data.slug}`);
	let editingProfile = false;

	//For previewing the new profile image.
	let profileIMG;
	let profileIMGUPLOAD;
	$: if (profileIMGUPLOAD) {
		const fileReader = new FileReader();
		fileReader.onload = function (event) {
			profileIMG.src = event.target.result;
		};
		fileReader.readAsDataURL(profileIMGUPLOAD[0]);
	}

	let initEditData;
	//Updating the user profile.
	async function updateThisProfile() {
		if (typeof profileIMGUPLOAD != "undefined") {
			if (profileIMGUPLOAD[0]) {
				//Update photoURL.
				const data = await uploadStorageImageGetData(profileIMGUPLOAD[0], "profilePics");
				initEditData.photoURL = data.url;

				//For updating local user. Used on layout and such for quick access :)
				await updateProfile($user, { photoURL: data.url });
			}
		}
		await updateProfile($user, { displayName: initEditData.username });

		//For viewing by other profiles.
		await updateFirestoreDocument("profiles", `${data.slug}`, {
			status: `${initEditData.status}`,
			username: `${initEditData.username}`,
			biography: `${initEditData.biography}`,
			contact: `${initEditData.contact}`,
			photoURL: `${initEditData.photoURL}`,
		});
	}
</script>

<main class="grid gap-10 grid-rows-1 w-full min-h-screen p-10" style="grid-template-columns:3fr 9fr;">
	<!--* THIS IS THE USER DETAILS SIDE. -->
	<!--* Check if own profile. If own -> we allow edits to profile data -> double checked by firestore rules. -->
	<div class="bg-base-200 shadow-xl rounded-3xl flex flex-col justify-start items-center gap-8 py-20 p-8 text-center">
		<div class="w-3/4 flex flex-col justify-center items-center gap-2">
			{#if !editingProfile}
				{#if $profile}
					<img
						src={$profile?.photoURL}
						alt="User profile pic"
						class="rounded-full w-1/2 aspect-square"
						style="border:4px solid hsl(var(--a))"
					/>
					<h2 class="text-2xl font-bold">{$profile?.username}</h2>
					<span class="text-xl italic">{$profile?.status}</span>
				{:else}
					<img
						src="/CompanyLogo/Logo.png"
						alt="Default profile pic"
						class="rounded-full w-1/2 aspect-square"
						style="border:4px solid hsl(var(--a))"
					/>
					<h2 class="text-2xl font-bold">User does not exist.</h2>
					<span class="text-xl italic">🛑 Please select a correct user!</span>
				{/if}
			{:else}
				<div class="flex flex-col gap-4">
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
								accept=".jpg, .jpeg, .png, .gif"
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
						bind:value={initEditData.username}
					/>
					<textarea
						class="textarea textarea-sm textarea-ghost h-24 max-h-24 text-xl italic placeholder:text-center placeholder:text-xl placeholder:italic"
						placeholder={$profile?.status}
						id="statusEdit"
						maxlength="50"
						bind:value={initEditData.status}
					/>
				</div>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex flex-row gap-2 items-center justify-center">
				<img src="../Icons/text.svg" height="24px" width="24px" alt="Text icon" />
				<h3>Biography:</h3>
			</div>
			{#if !editingProfile}
				{#if $profile}
					<p class="text-sm">{$profile?.biography}</p>
				{:else}
					<p class="text-sm">
						You need to choose a correct user id to get to a profile. To go to your profile, sign in, use
						the top right icon and drop down list for your profile.
					</p>
				{/if}
			{:else}
				<textarea
					class="textarea textarea-lg textarea-ghost h-52 max-h-52 text-sm placeholder:text-sm placeholder:text-center"
					maxlength="160"
					placeholder={$profile?.biography}
					bind:value={initEditData.biography}
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
					{#if $profile}
						<span class="text-sm">{$profile?.contact}</span>
					{:else}
						<span class="text-sm">loremipsum@dolor.com</span>
					{/if}
				{:else}
					<input
						type="text"
						placeholder={$profile?.contact}
						class="input input-ghost input-lg h-min placeholder:text-sm"
						maxlength="320"
						bind:value={initEditData.contact}
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
						initEditData = {
							status: `${$profile?.status}`,
							username: `${$profile?.username}`,
							biography: `${$profile?.biography}`,
							contact: `${$profile?.contact}`,
							photoURL: `${$profile?.photoURL}`,
						};
					}}>Edit profile</button
				>
			{:else}
				<button
					class="btn btn-accent"
					on:click={async () => {
						editingProfile = false;
						await updateThisProfile();
					}}>Save edits</button
				>
			{/if}
		{/if}
	</div>
	<!--* DISPLAY THE USER'S PUBLISHED POSTS. -->
	{#if $profile}
		{#if $profile?.posts.length == 0}
			<div class="flex justify-center items-center">
				<h2 class="text-2xl font-bold">No posts published by user.</h2>
			</div>
		{:else}
			<div class="grid auto-rows-[35rem] gap-4" style="grid-template-columns: repeat(auto-fill, 23rem);">
				{#each $profile?.posts as postID, index (postID + index)}
					<Post {postID} onProfile={true} />
				{/each}
			</div>
		{/if}
	{:else}
		<div class="flex justify-center items-center">
			<h2 class="text-2xl font-bold">Reading profile data...</h2>
		</div>
	{/if}
</main>
