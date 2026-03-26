const products = [
  {name:"Chocolate Chip Cookies",price:120,img:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e",type:"cookie"},
  {name:"Oatmeal Cookies",price:100,img:"https://images.unsplash.com/photo-1606312619070-d48b4c652a52",type:"cookie"},
  {name:"Fudge Brownies",price:150,img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c",type:"brownie"},
  {name:"Red Velvet Brownies",price:180,img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729",type:"brownie"},
  {name:"Vanilla Cupcake",price:90,img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587",type:"cupcake"},
  {name:"Chocolate Cupcake",price:100,img:"https://images.unsplash.com/photo-1603532648955-039310d9ed75",type:"cupcake"}
];

function render(list){
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  list.forEach(p=>{
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

/* FILTER */
function filterProducts(type, el){
  document.querySelectorAll(".cat").forEach(c=>c.classList.remove("active"));
  el.classList.add("active");

  let filtered = type === "all" ? products : products.filter(p=>p.type === type);
  render(filtered);
}

/* CART */
function addProduct(name, price, img){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(i=>i.name === name);

  if(existing){
    existing.qty++;
  } else {
    cart.push({name,price,img,qty:1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart").innerText = cart.length;
}

/* NAV */
function goHome(){
  window.location.href = "../pages/homepage.html";
}

function goToCart(){
  window.location.href = "../pages/cart.html";
}

function goBack(){
  window.history.back();
}

/* INIT */
document.addEventListener("DOMContentLoaded", ()=>{
  render(products);
  updateCart();
});