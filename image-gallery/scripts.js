
const box = document.querySelector(".search-box");
const lupaBtn = document.querySelector(".search-btn");
// const pupaBtn = document.querySelector(".reset-btn");
const main = document.querySelector(".main");

const url = "https://api.unsplash.com/search/photos";

async function search() {
	const result = await fetch(url);
	const data = await result.json();
	console.log(data);
}
search();
