import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");
const galleryMarkup = createGallery(galleryItems);

galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

function createGallery(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

const instance = basicLightbox.create(
  `<img src=" " width="800" height="600">`,

  {
    onShow: () => {
      window.addEventListener("keydown", onEscapePress, { onse: true });
    },
    // onClose: () => {
    //   window.removeEventListener("keydown", onEscapePress);
    // },
  }
);
function onGalleryClick(event) {
  event.preventDefault();

  const originPicRef = event.target.dataset.source;
  if (!originPicRef) return;

  instance.element().querySelector("img").src = originPicRef;
  instance.show();
}

function onEscapePress(event) {
  if (event.key !== "Escape") return;
  instance.close();
}

galleryList.addEventListener("click", onGalleryClick);
