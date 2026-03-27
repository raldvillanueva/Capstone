function loadCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart-items");

  if(!container) return;

  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index)=>{
    item.qty = item.qty || 1;
    subtotal += item.price * item.qty;

    container.innerHTML += `
      <div class="item">
        <img src="${item.img}">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>₱${item.price}</p>

          <div class="controls">
            <button onclick="decrease(${index})">-</button>
            <span>${item.qty}</span>
            <button onclick="increase(${index})">+</button>
          </div>

          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  let total = subtotal + 50;

  document.getElementById("subtotal").innerText = subtotal;
  document.getElementById("total").innerText = total;
}

function increase(i){
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[i].qty++;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function decrease(i){
  function showMsg(text){
  const msg = document.getElementById("msg");
  msg.innerText = text;
  msg.classList.add("show");

  setTimeout(()=>{
    msg.classList.remove("show");
  }, 2000);
}
  let cart = JSON.parse(localStorage.getItem("cart"));

  if(cart[i].qty > 1){
    cart[i].qty--;
  } else {
  showMsg("Minimum quantity is 1");
  return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(i){
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function goHome(){
  window.location.href = "../pages/homepage.html";
}

function goToCheckout(){
  window.location.href = "../pages/checkout.html";
}

function goBack(){
  window.location.href = "../pages/homepage.html";
}

document.addEventListener("DOMContentLoaded", loadCart);