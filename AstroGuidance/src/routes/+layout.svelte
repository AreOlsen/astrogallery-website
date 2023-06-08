<script lang="ts">
	/* 
        TAILWINDCSS INIT
    */
	import "../app.css";

	//ALERT / NOTIFICATION SYSTEM.
	import { currentNotification, updateNotification } from "$lib/alertStore.ts";

	/* 
		FIREBASE LOGIN & SIGNOUT.
	*/
	import { signOut, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
	import { auth } from "../firebase.js";
	import { userStore } from "$lib/authStore";
	let user = userStore(auth);
	const logout = async () => {
		signOut(auth);
		updateNotification("Signed out!");
	};

	const loginWithGoogle = async () => {
		signInWithRedirect(auth, new GoogleAuthProvider());
	};

	//EMAIL SUBSCRIPTION
	import { docStore } from "$lib/docCollectionStore.ts";
	import { subscribeToNewsletter } from "$lib/emailSub.js";
	import { dbFireStore } from "../firebase.js";
	let subscribeNewsletterEmail;
	let subscribedEmails = docStore(dbFireStore, "newsletter/subscribedEmails");

	//SEARCH
	import Search from "$lib/Search.svelte";
</script>

<!--HEADER-->
<header class="sticky top-0 z-50">
	<div class="navbar bg-base-100 flex-row flex gap-2" style="border-bottom:3px solid hsl(var(--a))">
		<!--WEBSITE LOGO AND MAIN PAGE BUTTOn. -->
		<div class="flex-1">
			<a class="btn btn-ghost flex flex-row gap-2" href="/">
				<img src="/CompanyLogo/Logo.png" width="32px" height="32px" class="rounded-full" alt="Company Logo " />
				<span class="normal-case text-2xl">ASTROGUIDANCE</span></a
			>
		</div>
		<!-- SEARCH. -->
		<Search />
		<!-- FORUM BUTTON -->
		<a class="btn btn-ghost text-accent text-xl" href="/forum">FORUM</a>
		<!-- ABOUT US BUTTON -->
		<a class="btn btn-ghost text-accent text-xl" href="/aboutus">ABOUT US</a>
		<!-- IF LOGGED IN  -->
		{#if $user}
			<!-- IF LOGGED IN => NEW POST BUTTON-->
			<a class="btn btn-ghost text-accent text-xl" href="/newpost">NEW POST</a>
			<!-- IF LOGGED IN => USER DETAILS. -->
			<div class="dropdown dropdown-end">
				<!-- BUTTON DESIGN -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="rounded-full">
						<img src={$user?.photoURL} alt="Profile icon" />
					</div>
				</label>
				<ul
					tabindex="0"
					class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
				>
					<!-- GO TO PROFILE BUTTON -->
					<li>
						<a class="justify-between" href="/profile/{$user?.uid}"> Profile </a>
					</li>
					<!-- LOG OUT BUTTON -->
					<li><button on:click={() => logout()}>Logout</button></li>
				</ul>
			</div>
		{:else}
			<!-- LOG IN BUTTON IF NOT LOGGED IN ALREADY-->
			<button class="btn btn-ghost text-accent text-xl" on:click={() => loginWithGoogle()}>LOG IN</button>
		{/if}
	</div>
</header>

<!--WEBSITE CONTENT-->
<slot />

<!--FOOTER-->
<footer class="footer p-10 bg-base-200 text-base-content overflow-hidden">
	<!-- FOOTER WEBSITE INFORMATION-->
	<div>
		<img src="/CompanyLogo/Logo.png" width="50px" alt="AstroGuidance Logo" />

		<h2 class="font-bold text-xl">AstroGuidance.</h2>
		<br />
		<h3 class="italic text-accent text-base">The forum for Astronomers.</h3>
		<h4 class="opacity-80 text-sm italic text-accent">Hosted & Funded by SpaceX</h4>
	</div>
	<!--FOOTER NAVIGATION LINKS-->
	<div>
		<span class="footer-title">Navigation</span>
		<a class="link link-hover" href="/">Homepage</a>
		<a class="link link-hover" href="/forum">Forum</a>
		<!--We only show the profile link if we are logged in.-->
		{#if $user != null}<a class="link link-hover" href="/profile/{$user?.uid}">Profile</a>{/if}
		<a class="link link-hover" href="/aboutus">About us</a>
	</div>
	<!-- FOOTER LEGAL NAVIGATION LINKS-->
	<div>
		<span class="footer-title">Legals</span>
		<a class="link link-hover" href="/terms">Terms & Conditions</a>
		<a class="link link-hover" href="/privacy">Privacy policy</a>
	</div>
	<!-- Little form for subscribing to website newsletter. -->
	<div>
		<span class="footer-title">Newsletter</span>
		<div class="form-control w-80">
			<label class="label" for="email">
				<span class="label-text">Enter your email address</span>
			</label>
			<!-- Simple button.  -->
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
						subscribeToNewsletter(subscribeNewsletterEmail, $subscribedEmails?.emails);
					}}>Subscribe</button
				>
			</div>
		</div>
	</div>
</footer>

<!-- Website title. -->
<title> AstroGuidance </title>

<!-- NOTIFICATION ALERT. -->
<div class="alert alert-info {$currentNotification?.show ? '' : 'hidden'} fixed bottom-5 right-5 w-1/3">
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/></svg
	>
	<span>{$currentNotification?.not}</span>
</div>

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
