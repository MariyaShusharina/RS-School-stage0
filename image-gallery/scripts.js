
const box = document.querySelector(".search-box");
const lupaBtn = document.querySelector(".search-btn");
// const pupaBtn = document.querySelector(".reset-btn");
const main = document.querySelector(".main");

const api = "GuVJqqfGl9C6fsyeYxysRBNNr-DZx0b3FI5w4nJ9wAA";
let val = "horse";
// document.querySelector(".search-box").value = val;

const url = "https://api.unsplash.com/search/photos";
let q = url + "/?query=" + val + "&client_id=" + api + "&tag_mode=all&orientation=landscape&page=2&per_page=18"

async function search() {

	checkVal = document.querySelector(".search-box").value;
	
	if (checkVal != "") {
		val = document.querySelector(".search-box").value;
	}
	
	q = url + "/?query=" + val + "&client_id=" + api + "&tag_mode=all&orientation=landscape&page=2&per_page=18"

	const result = await fetch(q);
	const data = await result.json();

	console.log(data);

	showPhotos(data);
}

search();

function keyEnter(event) {
	if (event.key === "Enter") { search(); }

}

function showPhotos(data) {

	main.innerHTML = "";

	for (let i = 0; i < data.length; i++) {

		let imgAlt = data[i].alt_description;
		let imgSrc = data[i].urls.regular;
		let aHref = data[i].links.html;

		let link = document.createElement("a");
		link.setAttribute("href", aHref);
		link.setAttribute("target", "_blank");
		main.appendChild(link);

		let pic = document.createElement("img");
		pic.setAttribute("src", imgSrc);
		pic.setAttribute("alt", imgAlt);
		main.lastElementChild.appendChild(pic);
	}
}
