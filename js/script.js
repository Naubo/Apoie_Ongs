// Efeito menu hamburger
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

const routes = {
  "/": "index.html",
  "/projetos": "pages/projetos.html",
  "/doacoes": "pages/doacoes.html",
  "/cadastro": "pages/cadastro.html",
};

async function loadRoute() {
  const path = window.location.hash.replace("#", "") || "/";
  const route = routes[path] || routes["/"];

  try {
    const response = await fetch(route);
    const html = await response.text();

    document.getElementById("app").innerHTML = html;
    // Scrollando para o topo
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Focando o primeiro elemento
    const main =
      document.getElementById("main-content") || document.getElementById("app");
    main.setAttribute("tabindex", "-1");
    main.focus();
  } catch (error) {
    document.getElementById("app").innerHTML = `<h2>Página não encontrada</h2>`;
  }
}

window.addEventListener("hashchange", loadRoute);
window.addEventListener("load", loadRoute);

// Seleciona os botões
const darkBtn = document.getElementById("darkModeBtn");
const contrastBtn = document.getElementById("contrastModeBtn");
const resetBtn = document.getElementById("resetThemeBtn");

// Função para ativar modo escuro
darkBtn.addEventListener("click", () => {
  document.body.classList.add("dark-mode");
  document.body.classList.remove("high-contrast");
  localStorage.setItem("theme", "dark");
});

// Função para ativar modo alto contraste
contrastBtn.addEventListener("click", () => {
  document.body.classList.add("high-contrast");
  document.body.classList.remove("dark-mode");
  localStorage.setItem("theme", "contrast");
});

// Função para restaurar o tema padrão
resetBtn.addEventListener("click", () => {
  document.body.classList.remove("dark-mode", "high-contrast");
  localStorage.setItem("theme", "default");
});

// Mantém o tema escolhido após recarregar
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else if (savedTheme === "contrast") {
    document.body.classList.add("high-contrast");
  }
});
