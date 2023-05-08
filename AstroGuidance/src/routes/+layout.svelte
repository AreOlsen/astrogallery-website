<script lang="ts">
	/* 
        TAILWINDCSS INIT
    */
	import "../app.css";

	/* 
		FIREBASE LOGIN & SIGNOUT.
	*/
	import { signOut, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
	import { auth } from "../firebase.js";
	import { userStore } from "$lib/authStore";
	let user = userStore(auth);
	const logout = async () => {
		signOut(auth);
	};

	const loginWithGoogle = async () => {
		signInWithRedirect(auth, new GoogleAuthProvider());
	};

	//EMAIL SUBSCRIPTION
	import { updateFirestoreDocument } from "$lib/updateSetDoc.js";
	import { docStore } from "$lib/docCollectionStore.ts";
	import { dbFireStore } from "../firebase.js";
	let subscribeNewsletterEmail;
	let subscribedEmails = docStore(dbFireStore, "newsletter/subscribedEmails");
	function subscribeToNewsletter() {
		if ($subscribedEmails) {
			if (
				$subscribedEmails?.emails == undefined ||
				($subscribedEmails?.emails == null && /[^@\s]+@[^@\s]+\.[^@\s]+/.test(subscribeNewsletterEmail))
			) {
				updateFirestoreDocument("newsletter", "subscribedEmails", {
					emails: [subscribeNewsletterEmail],
				});
			} else {
				if (
					!$subscribedEmails?.emails.includes(subscribeNewsletterEmail) &&
					/[^@\s]+@[^@\s]+\.[^@\s]+/.test(subscribeNewsletterEmail)
				) {
					updateFirestoreDocument("newsletter", "subscribedEmails", {
						emails: [...$subscribedEmails?.emails, subscribeNewsletterEmail],
					});
				}
			}
		}
	}
</script>

<header class="sticky top-0 z-50">
	<div class="navbar bg-base-100" style="border-bottom:3px solid hsl(var(--a))">
		<div class="flex-1">
			<a class="btn btn-ghost flex flex-row gap-2" href="/">
				<img src="/CompanyLogo/Logo.png" width="32px" height="32px" class="rounded-full" alt="Company Logo " />
				<span class="normal-case text-2xl">ASTROGUIDANCE</span></a
			>
		</div>
		<div class="flex-none gap-2">
			<div class="form-control">
				<div class="input-group">
					<input type="text" placeholder="Search…" class="input input-bordered" />
					<button class="btn btn-square">
						<img src="/Icons/search.svg" alt="Search icon" width="24px" height="24px" />
					</button>
				</div>
			</div>
			<a class="btn btn-ghost text-accent text-xl" href="/forum">FORUM</a>
			<a class="btn btn-ghost text-accent text-xl" href="/aboutus">ABOUT US</a>
			{#if $user}
				<a class="btn btn-ghost text-accent text-xl" href="/newpost">NEW POST</a>
				<div class="dropdown dropdown-end">
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="rounded-full">
							<img src={$user?.photoURL} alt="Profile icon" />
						</div>
					</label>
					<ul
						tabindex="0"
						class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
					>
						<li>
							<a class="justify-between" href="/profile/{$user?.uid}"> Profile </a>
						</li>
						<li><button on:click={() => logout()}>Logout</button></li>
					</ul>
				</div>
			{:else}
				<button class="btn btn-ghost text-accent text-xl" on:click={() => loginWithGoogle()}>LOG IN</button>
			{/if}
		</div>
	</div>
</header>
<slot />
<footer class="footer p-10 bg-base-200 text-base-content">
	<div>
		<img src="/CompanyLogo/Logo.png" width="50px" alt="AstroGuidance Logo" />

		<h2 class="font-bold text-xl">AstroGuidance.</h2>
		<br />
		<h3 class="italic text-m text-accent">The forum for Astronomers.</h3>
		<h4 class="opacity-50 italic">Hosted & Funded by SpaceX</h4>
	</div>
	<div>
		<span class="footer-title">Navigation</span>
		<a class="link link-hover" href="/">Homepage</a>
		<a class="link link-hover" href="/forum">Forum</a>
		{#if $user != null}<a class="link link-hover" href="/profile/{$user?.uid}">Profile</a>{/if}
		<a class="link link-hover" href="/aboutus">About us</a>
	</div>
	<div>
		<span class="footer-title">Legals</span>
		<a class="link link-hover" href="/terms">Terms & Conditions</a>
		<a class="link link-hover" href="/privacy">Privacy policy</a>
	</div>
	<div>
		<span class="footer-title">Newsletter</span>
		<div class="form-control w-80">
			<label class="label" for="email">
				<span class="label-text">Enter your email address</span>
			</label>
			<div class="relative">
				<input
					type="text"
					id="email"
					name="email"
					placeholder="username@site.com"
					class="input input-bordered w-full pr-16"
					bind:value={subscribeNewsletterEmail}
				/>
				<button
					class="btn btn-accent absolute top-0 right-0 rounded-l-none"
					on:click={() => {
						subscribeToNewsletter();
					}}>Subscribe</button
				>
			</div>
		</div>
	</div>
</footer>

<title> AstroGuidance </title>

<!-- 
    Holy Grail - CSS Layout.
-->
<style>
	:global(body) {
		display: grid;
		grid-template-rows: auto minmax(90vh, auto) auto;
		grid-template-areas:
			"header"
			"main"
			"footer";

		margin: 0;
		min-width: 100%;
		min-height: 100%;
	}

	header {
		grid-area: "header" !important;
	}
	footer {
		grid-area: "footer" !important;
	}
	:global(main) {
		grid-area: "main" !important;
	}
</style>
