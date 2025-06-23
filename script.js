window.onload = () => {
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn === "true") {
    showMain();
    loadCatalog();
    loadCart();
  }
};

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    localStorage.setItem("loggedIn", "true");
    showMain();
    loadCatalog();
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

const produtos = [
  { nome: "Maçã", preco: 3.5, imagem: "https://i.imgur.com/QG2vT6L.jpg" },
  { nome: "Banana", preco: 2.8, imagem: "https://i.imgur.com/LABvC5M.jpg" },
  { nome: "Laranja", preco: 4.2, imagem: "https://i.imgur.com/SDu5A1J.jpg" },
  { nome: "Tomate", preco: 5.0, imagem: "https://i.imgur.com/93bDRwC.jpg" },
  { nome: "Cenoura", preco: 3.0, imagem: "https://i.imgur.com/1tkNDL4.jpg" },
  { nome: "Alface", preco: 2.2, imagem: "https://i.imgur.com/Bg9vM9f.jpg" },
  { nome: "Batata", preco: 4.5, imagem: "https://i.imgur.com/YZGxH1S.jpg" },
  { nome: "Cebola", preco: 3.8, imagem: "https://i.imgur.com/t3hEvp4.jpg" },
  { nome: "Melancia", preco: 6.0, imagem: "https://i.imgur.com/jFUCg7n.jpg" },
  { nome: "Abacaxi", preco: 5.9, imagem: "https://i.imgur.com/9YV1xqe.jpg" },
  { nome: "Pimentão", preco: 3.7, imagem: "https://i.imgur.com/bMplqOo.jpg" },
  { nome: "Uva", preco: 7.5, imagem: "https://i.imgur.com/vYlPb6S.jpg" }
];

function loadCatalog() {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";
  produtos.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <h3>${item.nome}</h3>
      <p>R$ ${item.preco.toFixed(2)}</p>
      <button onclick='addToCart(${i})'>Adicionar</button>
    `;
    catalog.appendChild(div);
  });
}

function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(produtos[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function loadCart() {
  const cartDiv = document.getElementById("cart");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.preco;
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)}
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