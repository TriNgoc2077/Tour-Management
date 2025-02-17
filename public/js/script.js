const alertAddCartSuccess = () => {
  const alert = document.querySelector('[add-to-cart-success]');
  if (alert) {
    alert.classList.remove('alert-hidden');
    setTimeout(() => {
      alert.classList.add("alert-hidden");
    }, 3000);
    const closeAlert = alert.querySelector('[close-alert]');
    closeAlert.addEventListener("click", () => {
      alert.classList.add("alert-hidden");
    });
  }
}
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


//show quantity in minicart
const showMiniCart = () => {
  const miniCart = document.querySelector('[mini-cart]');
  if (miniCart) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      miniCart.innerHTML = cart.length;
    }
  }

}
showMiniCart();
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
      alertAddCartSuccess();
      showMiniCart();
    }
  });
}
