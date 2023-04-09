/** @type {import('./$types').PageLoad} */

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

export function load({ params }) {
	let heroImage = backgrounds[Math.round(Math.random() * (backgrounds.length - 1))];

	return {
		images: { heroImage },
	};
}
