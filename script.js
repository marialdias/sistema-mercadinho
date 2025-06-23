window.onload = () => {
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn === "true") {
    showMain();
    fetchProducts();
    loadCart();
  }
};

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    localStorage.setItem("loggedIn", "true");
    showMain();
    fetchProducts();
  } else {
    alert("Usuário e senha obrigatórios!");
  }
}

function showMain() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("main-container").style.display = "block";
}

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("cart");
  location.reload();
}

function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      const catalog = document.getElementById("catalog");
      catalog.innerHTML = "";
      data.forEach(prod => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${prod.image}" alt="${prod.title}">
          <h3>${prod.title}</h3>
          <p>R$ ${prod.price.toFixed(2)}</p>
          <button onclick='addToCart(${JSON.stringify(prod)})'>Adicionar</button>
        `;
        catalog.appendChild(div);
      });
    });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function loadCart() {
  const cartDiv = document.getElementById("cart");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.title} - R$ ${item.price.toFixed(2)}
      <button onclick="removeFromCart(${index})">Remover</button>
    `;
    cartDiv.appendChild(div);
  });

  document.getElementById("total").innerText = total.toFixed(2);
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function checkout() {
  if (confirm("Deseja finalizar a compra?")) {
    alert("Compra finalizada com sucesso!");
    localStorage.removeItem("cart");
    loadCart();
  }
}