// show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]")
    
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}
// end show alert

//slider images
var imagesThumb = new Swiper(".imagesThumb", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var imagesMain = new Swiper(".imagesMain", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: imagesThumb,
  },
});


//cart
const cart = localStorage.getItem('cart');
if (!cart) {
  localStorage.setItem('cart', JSON.stringify([]));
}


//add to cart
const formAddToCart = document.querySelector('[form-add-to-cart]');
if (formAddToCart) {
  formAddToCart.addEventListener('submit', (e) => {
    e.preventDefault();
    const quantity = parseInt(e.target.elements.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute('tour-id'));
    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const indexExistTour = cart.findIndex(item => item.tourId == tourId);
      if (indexExistTour == -1) {
        cart.push({
          tourId: tourId,
          quantity: quantity
        });
      } else {
        cart[indexExistTour].quantity = cart[indexExistTour].quantity + quantity;
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    }
  });
}
