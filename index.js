const imageSrcList = [
  'https://img.labnol.org/di/high-quality-photo.jpg',
  'https://images3.alphacoders.com/823/thumb-1920-82317.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/images3/Free-Download-Spring-Wallpaper-HD-for-Windows-768x480.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/images3/Awesome-Season-Spring-Wallpaper-HD-768x505.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/images3/Free-Download-Spring-Desktop-Wallpaper.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/images3/Original-Spring-Wallpaper-768x480.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/images3/Parliament-Hill-Spring-Wallpaper.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/images3/Spring-Live-Wallpaper-768x432.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/images3/Free-Download-Spring-Wallpaper-for-PC.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/images3/Spring-Art-Image-768x432.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/images3/Spring-Digital-Wallpaper-768x440.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/images3/Beautiful-Spring-Desktop-Background-768x512.jpg'
];


const gallery = document.getElementById('gallery');
let galleryElement = null;
function initGallery(gallery, data) {
  if (gallery) {
    if (typeof gallery === 'string') {
      galleryElement = document.querySelector(gallery);
    } else if (gallery instanceof HTMLElement) {
      galleryElement = gallery;
    }
    if (galleryElement) {
      imageSrcList.forEach((src) => {
        galleryElement.appendChild(createLazyImageTag(src));
      });
    } else {
      throw new Error('Invalid Gallery Element container');
    }
  } else {
    throw new Error('Not able to find Gallery element');
  }
}


initGallery('#gallery');


////////////

let lazyImageList = document.querySelectorAll("img.lazy");

function lazyLoadImageForElement(imgElement) {
  if (!imgElement.dataset.lazyLoaded) {
    imgElement.src = imgElement.dataset.lazySrc;
    imgElement.setAttribute('data-lazy-loaded', true);
    console.log(imgElement.src);
  }
}


function lazyLoadImageWithinFocus(imgElement, inAdvance) {
  if (Math.abs(imgElement.offsetTop - window.pageYOffset) < inAdvance + window.innerHeight) {
    lazyLoadImageForElement(imgElement);
  }
}

function lazyloadGallery() {
  lazyImageList.forEach(element => {
    lazyLoadImageWithinFocus(element, 200);
  });
}

window.addEventListener('scroll', throttle(lazyloadGallery, 50));
window.addEventListener('resize', throttle(lazyloadGallery, 50));

window.onload = () => {
  lazyloadGallery();
};

///////////


function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}


function createLazyImageTag(dataLazySrc) {
  const img = document.createElement('img');
  img.setAttribute('data-lazy-src', dataLazySrc);
  img.classList.add('lazy');
  return img;
}