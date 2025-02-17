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

// Display tour in cart
const eventDeleteItem = () => {
  const listButtonDelete = document.querySelectorAll("[btn-delete]");
  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const tourId = button.getAttribute("btn-delete");
      const cart = JSON.parse(localStorage.getItem("cart"));
      const newCart = cart.filter(item => item.tourId != tourId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      drawCart();
    })
  })
}

const eventUpdateQuantityItem = () => {
  const listInputQuantity = document.querySelectorAll("[table-cart] input[name='quantity']");

  listInputQuantity.forEach(input => {
    input.addEventListener("change", () => {
      const quantity = parseInt(input.value);
      if(quantity > 0) {
        const tourId = input.getAttribute("item-id");
        const cart = JSON.parse(localStorage.getItem("cart"));

        const existItem = cart.find(item => item.tourId == tourId);
        if(existItem) {
          existItem.quantity = quantity;
          localStorage.setItem("cart", JSON.stringify(cart));
          drawCart();
        }
      }
    })
  })
}

const drawCart = () => {
  const tableCart = document.querySelector("[table-cart]");
  if(tableCart) {
    fetch("/cart/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: localStorage.getItem("cart")
    })
      .then(res => res.json())
      .then(data => {
        const total = data.total;
        const tours = data.tours;
  
        const htmlsTr = tours.map((item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>
              <img 
                src="${item.image}" 
                alt="${item.title}" 
                width="80px"
              >
            </td>
            <td>
              <a href="/tours/detail/${item.slug}">
                ${item.title}
              </a>
            </td>
            <td>
              ${item.price_special.toLocaleString()}đ
            </td>
            <td>
              <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px">
            </td>
            <td>
              ${item.total.toLocaleString()}đ
            </td>
            <td>
              <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
            </td>
          </tr>
        `);
  
        const tbody = tableCart.querySelector("tbody");
        tbody.innerHTML = htmlsTr.join("");
  
        const totalPrice = document.querySelector("[total-price]");
        if(totalPrice) {
          totalPrice.innerHTML = total.toLocaleString();
        }

        eventDeleteItem();

        eventUpdateQuantityItem();
      })
  }
}
drawCart();
