
const box = document.querySelector(".search-box");
const lupaBtn = document.querySelector(".search-btn");
// const pupaBtn = document.querySelector(".reset-btn");
const main = document.querySelector(".main");

const api = "GuVJqqfGl9C6fsyeYxysRBNNr-DZx0b3FI5w4nJ9wAA";
let val = document.querySelector(".search-box").value;

const url = "https://api.unsplash.com/search/photos";
let q = url + "/?query=" + val + "&client_id=" + api + "&tag_mode=all&orientation=landscape&page=2&per_page=18"

async function search() {

	val = document.querySelector(".search-box").value;
	q = url + "/?query=" + val + "&client_id=" + api + "&tag_mode=all&orientation=landscape&page=2&per_page=18"

	const result = await fetch(q);
	const data = await result.json();

	console.log(data);
}

search();

function keyEnter(event) {
	if (event.key === "Enter") { search(); }

}
