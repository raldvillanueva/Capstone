let cart = 0;

const products = [
  {
    name:"Chocolate Chip Cookies",
    price:120,
    img:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e"
  },
  {
    name:"Fudge Brownies",
    price:150,
    img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
  },
  {
    name:"Red Velvet Dessert",
    price:180,
    img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729"
  }
];

function render(){
  const container = document.getElementById("list");

  products.forEach(p=>{
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <div class="card-body">
          <h3>${p.name}</h3>
          <p class="price">₱${p.price}</p>
          <button onclick="addProduct('${p.name}', ${p.price}, '${p.img}')">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

function addProduct(name, price, img){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ name, price, img });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

function updateCartCount(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart").innerText = cart.length;
}

updateCartCount();

function goToShop(){
  window.location.href = "products.html";
}

function goToCart(){
  window.location.href = "cart.html";
}

function goToLogin(){
  window.location.href = "login.html";
}

function updateNavUser(){
  const nav = document.getElementById("nav-actions");
  let loggedIn = localStorage.getItem("loggedIn");

  if(loggedIn === "true"){
    nav.innerHTML = `
      <div class="user-icon" onclick="logout()">👤</div>
    `;
  }
}

function logout(){
  localStorage.removeItem("loggedIn");
  location.reload();
}

/* RUN ON LOAD */
document.addEventListener("DOMContentLoaded", updateNavUser);


render();