// Navegação e SPA básica
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

// Evita erro caso não exista o elemento
if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// Rotas da aplicação
const routes = {
  "/": "index.html",
  "/projetos": "pages/projetos.html",
  "/doacoes": "pages/doacoes.html",
  "/cadastro": "pages/cadastro.html",
};

// Função de carregamento de rotas
async function loadRoute() {
  const path = window.location.hash.replace("#", "") || "/";
  const route = routes[path] || routes["/"];
  const app = document.getElementById("app");

  if (!app) return;

  try {
    const response = await fetch(route);
    if (!response.ok) throw new Error("Página não encontrada");

    const html = await response.text();
    app.innerHTML = html;

    // Rolagem suave até o topo
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Foco de acessibilidade
    const main = document.querySelector("main") || app;
    main.setAttribute("tabindex", "-1");
    main.focus();
  } catch (error) {
    app.innerHTML = `<h2>Página não encontrada</h2>`;
  }
}

window.addEventListener("hashchange", loadRoute);
window.addEventListener("load", loadRoute);

// Temas de acessibilidade
const darkBtn = document.getElementById("darkModeBtn");
const contrastBtn = document.getElementById("contrastModeBtn");
const resetBtn = document.getElementById("resetThemeBtn");

function applyTheme(theme) {
  document.body.classList.remove("dark-mode", "high-contrast");
  if (theme === "dark") document.body.classList.add("dark-mode");
  if (theme === "contrast") document.body.classList.add("high-contrast");
  localStorage.setItem("theme", theme);
}

// Eventos de troca de tema
if (darkBtn) darkBtn.addEventListener("click", () => applyTheme("dark"));
if (contrastBtn)
  contrastBtn.addEventListener("click", () => applyTheme("contrast"));
if (resetBtn) resetBtn.addEventListener("click", () => applyTheme("default"));

// Mantém o tema após recarregar
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || "default");
});

//  Máscaras e Validação de Formulário
const form = document.querySelector("form");
const cpfInput = document.getElementById("cpf");
const cepInput = document.getElementById("cep");
const telefoneInput = document.getElementById("telefone");

//  Máscara de CPF
if (cpfInput) {
  cpfInput.addEventListener("input", () => {
    let value = cpfInput.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    // Monta a máscara passo a passo
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d+)/, "$1.$2");
    }

    cpfInput.value = value;
  });
}

//  Máscara de CEP
if (cepInput) {
  cepInput.addEventListener("input", () => {
    let value = cepInput.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    cepInput.value = value;
  });
}

//  Máscara de Telefone
if (telefoneInput) {
  telefoneInput.addEventListener("input", () => {
    let value = telefoneInput.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    // Formatos diferentes conforme a quantidade de dígitos
    if (value.length <= 10) {
      value = value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      value = value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }

    telefoneInput.value = value;
  });
}

//  Validação de CPF no envio
if (form) {
  form.addEventListener("submit", (e) => {
    const cpf = cpfInput?.value || "";

    if (!cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
      e.preventDefault();
      showAlert("CPF inválido! Use o formato 000.000.000-00", "erro");
      cpfInput.focus();
      return;
    }
  });
}

// ⚠️ Alerta central (mensagem rápida)
function showAlert(mensagem, tipo = "info") {
  const alertBox = document.createElement("div");
  alertBox.className = `alert ${tipo}`;
  alertBox.textContent = mensagem;

  document.body.appendChild(alertBox);

  // Animação de entrada
  setTimeout(() => {
    alertBox.classList.add("show");
  }, 50);

  // Saída automática
  setTimeout(() => {
    alertBox.classList.remove("show");
    setTimeout(() => alertBox.remove(), 300);
  }, 2500);
}
