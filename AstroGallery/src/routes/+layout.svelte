<script>
	/* 
        TAILWINDCSS INIT
    */
	import "../app.css";

	/* 
        FIREBASE
    */
	import { getAuth } from "firebase/auth";
	import { initializeApp } from "firebase/app";
	import { getAnalytics } from "firebase/analytics";
	import { onMount } from "svelte";
	onMount(() => {
		const firebaseConfig = {
			apiKey: "AIzaSyCDnS2BOg57WiAjXaOfk0HUFOpI-DboGlo",
			authDomain: "astronomi-e7378.firebaseapp.com",
			databaseURL: "https://astronomi-e7378-default-rtdb.europe-west1.firebasedatabase.app",
			projectId: "astronomi-e7378",
			storageBucket: "astronomi-e7378.appspot.com",
			messagingSenderId: "722166259201",
			appId: "1:722166259201:web:ab73112e1b044c2594aa00",
			measurementId: "G-RDZGZV2WWX",
		};
		const app = initializeApp(firebaseConfig);
		const analytics = getAnalytics(app);
		const auth = getAuth(app);
	});
</script>

<header>
	<div class="navbar bg-base-200">
		<div class="navbar-start">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/></svg
					>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
				>
					<li><a href="/forum">Forum</a></li>
					<li><a href="/profile">Profile</a></li>
					<li><a href="/">Homepage</a></li>
					<li><a href="/aboutus">About us</a></li>
				</ul>
			</div>
		</div>
		<div class="navbar-center">
			<a class="btn btn-ghost normal-case text-3xl" href="/">ASTROGALLERY</a>
		</div>
		<div class="navbar-end">
			<button class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/></svg
				>
			</button>
			<button class="btn btn-ghost btn-circle">
				<div class="indicator">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/></svg
					>
					<span class="badge badge-xs badge-primary indicator-item" />
				</div>
			</button>
		</div>
	</div>
</header>
<slot />
<footer class="footer p-10 bg-base-200 text-base-content">
	<div>
		<svg
			width="50"
			height="50"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill-rule="evenodd"
			clip-rule="evenodd"
			class="fill-current"
			><path
				d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
			/></svg
		>
		<h2 class="font-bold text-xl">AstroGallery.</h2>
		<br />
		<h3 class="italic text-m text-accent">The forum for Astronomers.</h3>
		<h4 class="opacity-50 italic">Hosted & Funded by SpaceX</h4>
	</div>
	<div>
		<span class="footer-title">Navigation</span>
		<a class="link link-hover">Homepage</a>
		<a class="link link-hover">Forum</a>
		<a class="link link-hover">Profile</a>
		<a class="link link-hover">About us</a>
	</div>
	<div>
		<span class="footer-title">Newsletter</span>
		<div class="form-control w-80">
			<label class="label">
				<span class="label-text">Enter your email address</span>
			</label>
			<div class="relative">
				<input type="text" placeholder="username@site.com" class="input input-bordered w-full pr-16" />
				<button class="btn btn-accent absolute top-0 right-0 rounded-l-none">Subscribe</button>
			</div>
		</div>
	</div>
</footer>

<title> AstroGallery </title>

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
