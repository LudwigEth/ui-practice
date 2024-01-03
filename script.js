const imageSlider = {
  currentIndex: 1,
  imageSlider: document.getElementById('image-slider'),
  imageContainer: document.getElementById('image-container'),
  btnPrevious: document.getElementById('btnPrevious'),
  btnNext: document.getElementById('btnNext'),
  currentImage: document.getElementById('activeImgDots'),
}

imageSlider.imageContainer.scrollLeft = imageSlider.imageContainer.clientWidth

imageSlider.btnPrevious.addEventListener('click', onPreviousClick)
imageSlider.btnNext.addEventListener('click', onNextClick)
imageSlider.imageContainer.addEventListener(
  'touchend',
  updateActiveImageIndicator
)

function updateActiveImageIndicator(index) {
  const dots = document.querySelectorAll('#activeImgDots div')
  dots.forEach((dot) => dot.classList.remove('activeImage'))
  if (index === 4) {
    dots[0].classList.add('activeImage')
    setTimeout(() => {
      imageSlider.imageContainer.scrollLeft = 0
    }, 150)
  } else {
    dots[index].classList.add('activeImage')
  }
}

function handleIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = parseInt(entry.target.getAttribute('data-index'), 10)
      imageSlider.currentIndex = index
      updateActiveImageIndicator(index)
    }
  })
}

function onPreviousClick() {
  if (imageSlider.currentIndex > 1) {
    imageSlider.currentIndex--
    scrollToImage(imageSlider.currentIndex)
  } else {
    imageSlider.currentIndex = 4
    scrollToImage(imageSlider.currentIndex)
  }
}
function onNextClick() {
  const images = imageSlider.imageContainer.querySelectorAll('img')
  if (imageSlider.currentIndex < images.length - 2) {
    imageSlider.currentIndex++
    scrollToImage(imageSlider.currentIndex)
  } else {
    imageSlider.currentIndex = 1
    scrollToImage(imageSlider.currentIndex)
  }
}

const options = {
  root: imageSlider.imageContainer,
  rootMargin: '0px',
  threshold: 0.5,
}

const observer = new IntersectionObserver(handleIntersect, options)

const images = imageSlider.imageContainer.querySelectorAll('img')
images.forEach((image) => observer.observe(image))

function scrollToImage(index) {
  const images = imageSlider.imageContainer.querySelectorAll('img')
  const targetImage = images[index]
  if (targetImage) {
    targetImage.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  }
}
