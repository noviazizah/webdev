const typedText = "Welcome to Hoolyshop!";
const delay = 300; // Delay antara setiap karakter (ms)

// Fungsi untuk mengetikkan teks dengan efek
function typeEffect(text, element, index) {
  if (index < text.length) {
    element.innerHTML += text.charAt(index);
    setTimeout(() => {
      typeEffect(text, element, index + 1);
    }, delay);
  }
}

// Mulai efek mengetik pada teks
const textElement = document.getElementById("typed-text");
typeEffect(typedText, textElement, 0);

// Fungsi untuk menambah barang ke keranjang
function addToCart(item) {
  const cartList = document.querySelector(".cart-list");
  const listItem = document.createElement("li");
  listItem.classList.add("cart-item");

  // Menambahkan data atribut untuk item di keranjang
  listItem.setAttribute("data-name", item.name);
  listItem.setAttribute("data-price", item.price);
  listItem.setAttribute("data-qty", item.qty);
  listItem.setAttribute("data-img-src", item.imgSrc); // Tambahkan URL gambar

  // Menampilkan informasi barang di keranjang
  listItem.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}" class="w-8 h-8 mr-2" />
      ${item.qty}x ${item.name} - Rp${item.price * item.qty}
    `;

  cartList.appendChild(listItem);

  // Menghitung total harga
  const totalPriceElement = document.querySelector(".total-price");
  let total = parseFloat(totalPriceElement.textContent);
  total += item.price * item.qty;
  totalPriceElement.textContent = total;
}

document.addEventListener("DOMContentLoaded", () => {
  const incrementButtons = document.querySelectorAll(".btn-increment");
  const decrementButtons = document.querySelectorAll(".btn-decrement");
  const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
  const qtyElements = document.querySelectorAll(".item-qty");
  const checkoutButton = document.querySelector(".btn-checkout");

  const items = [
    {
      name: "Product 1",
      price: 150000,
      qty: 0,
      imgSrc: "assets/product1.jpeg",
    },
    {
      name: "Product 2",
      price: 120000,
      qty: 0,
      imgSrc: "assets/product2.jpeg",
    },
    { name: "Product 3", price: 80000, qty: 0, imgSrc: "assets/product3.jpeg" },
    {
      name: "Product 4",
      price: 135000,
      qty: 0,
      imgSrc: "assets/product4.jpeg",
    },
    { name: "Product 5", price: 65000, qty: 0, imgSrc: "assets/product5.jpeg" },
    {
      name: "Product 6",
      price: 114000,
      qty: 0,
      imgSrc: "assets/product6.jpeg",
    },
  ];

  // Event listener untuk tombol penambahan
  incrementButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      items[index].qty++;
      qtyElements[index].textContent = items[index].qty;
    });
  });

  // Event listener untuk tombol pengurangan
  decrementButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (items[index].qty > 0) {
        items[index].qty--;
        qtyElements[index].textContent = items[index].qty;
      }
    });
  });

  // Event listener untuk tombol tambahkan ke keranjang
  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (items[index].qty > 0) {
        addToCart(items[index]);
        items[index].qty = 0;
        qtyElements[index].textContent = items[index].qty;
      }
    });
  });

  checkoutButton.addEventListener("click", () => {
    const cartList = document.querySelector(".cart-list");
    const strukList = document.querySelector(".struk-list");
    const totalPriceElement = document.querySelector(".total-price-struk");

    // Menyiapkan struk
    strukList.innerHTML = ""; // Membersihkan struk sebelumnya
    let total = 0;

    // Menambahkan item dari keranjang ke struk
    const cartItems = cartList.querySelectorAll(".cart-item");
    cartItems.forEach(cartItem => {
      const qty = parseInt(cartItem.getAttribute("data-qty"));
      const name = cartItem.getAttribute("data-name");
      const price = parseFloat(cartItem.getAttribute("data-price"));

      // Menampilkan item di struk
      const strukItem = document.createElement("li");
      strukItem.textContent = `${qty}x ${name} - Rp${price * qty}`;
      strukList.appendChild(strukItem);

      // Menghitung total harga
      total += price * qty;
    });

    // Menampilkan total harga di struk
    totalPriceElement.textContent = total;

    // Menampilkan struk
    const struk = document.querySelector(".struk");
    struk.classList.remove("hidden");
  });
});

function showStruk() {
  const cartList = document.querySelector(".cart-list");
  const strukList = document.querySelector(".struk-list");
  const totalPriceElement = document.querySelector(".total-price-struk");

  // Menyiapkan struk
  strukList.innerHTML = ""; // Membersihkan struk sebelumnya
  let total = 0;

  // Menambahkan item dari keranjang ke struk
  const cartItems = cartList.querySelectorAll(".cart-item");
  cartItems.forEach(cartItem => {
    const qty = parseInt(cartItem.getAttribute("data-qty"));
    const name = cartItem.getAttribute("data-name");
    const price = parseFloat(cartItem.getAttribute("data-price"));
    const imgSrc = cartItem.getAttribute("data-img-src"); // Mendapatkan URL gambar

    // Menampilkan item di struk
    const strukItem = document.createElement("li");
    strukItem.innerHTML = `
        <img src="${imgSrc}" alt="${name}" class="w-8 h-8 mr-2" /> 
        ${qty}x ${name} - $${(price * qty).toFixed(2)}
      `;
    strukList.appendChild(strukItem);

    // Menghitung total harga
    total += price * qty;
  });

  // Menampilkan total harga di struk
  totalPriceElement.textContent = total.toFixed(2);

  // Menampilkan struk
  const struk = document.querySelector(".struk");
  struk.classList.remove("hidden");
}
