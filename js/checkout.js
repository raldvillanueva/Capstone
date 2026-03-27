function loadCheckout(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let container = document.getElementById("summary-items");

  if(!container) return; // safety fix

  container.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item=>{
    item.qty = item.qty || 1;

    let itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    container.innerHTML += `
      <p>${item.name} x${item.qty} = ₱${itemTotal}</p>
    `;
  });

  let total = subtotal + 50;

  document.getElementById("subtotal").innerText = subtotal;
  document.getElementById("total").innerText = total;
}

/* PLACE ORDER */
function placeOrder(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if(!name || !phone || !address){
    alert("Please fill all required fields!");
    return;
  }

  alert("Order placed successfully! 🎉");

  localStorage.removeItem("cart");
  window.location.href = "../pages/homepage.html";
}

function goBack(){
  window.location.href = "../pages/cart.html";
}

function showMsg(text, type="error"){
  const msg = document.getElementById("msg");

  msg.innerText = text;
  msg.className = "msg show " + type;

  setTimeout(()=>{
    msg.classList.remove("show");
  }, 2500);
}

function placeOrder(){
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let address = document.getElementById("address").value.trim();
  let city = document.getElementById("city").value.trim();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  /* ❌ EMPTY CART */
  if(cart.length === 0){
    showMsg("Your cart is empty");
    return;
  }

  /* ❌ NAME VALIDATION */
  if(name.length < 3){
    showMsg("Name must be at least 3 characters");
    return;
  }

  /* ❌ PHONE VALIDATION (PH FORMAT) */
  if(!/^09\d{9}$/.test(phone)){
    showMsg("Invalid phone number (use 09XXXXXXXXX)");
    return;
  }

  /* ❌ ADDRESS */
  if(address.length < 5){
    showMsg("Address is too short");
    return;
  }

  /* ❌ CITY */
  if(city.length < 2){
    showMsg("Please enter a valid city");
    return;
  }

  /* ✅ SUCCESS */
  showMsg("Order placed successfully 🎉", "success");

  localStorage.removeItem("cart");

  setTimeout(()=>{
    window.location.href = "../pages/homepage.html";
  }, 2000);
}

/* 🔥 IMPORTANT FIX */
document.addEventListener("DOMContentLoaded", loadCheckout);