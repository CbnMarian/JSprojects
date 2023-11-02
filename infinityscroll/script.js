const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash api

const count = 30;
const apiKey = "qVdZKoMqrZ_vQwvWen4WRsdxlk1S8zlDsMntEDavfus";

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// helper function
/* function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
} */

//Create Elements For links and photos
function displayPhotos() {
  imagesLoaded = 0;
  //we run for each obj
  photosArray.forEach((photo) => {
    totalImages = photosArray.length;
    console.log("total images =", totalImages);
    //create <a> to link to unsplash</a>
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    //create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    //put <img> inside<a>, then put both inside imageContainer elem
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
  //event listener, check when each is finished loading
  img.addEventListener("load", imageLoaded);
}

//  Get photos FROM unsplah api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //catch error here
  }
}

//Check to see if scrolling neat bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// when loading
getPhotos();
