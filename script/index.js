document.addEventListener("DOMContentLoaded", () => {
  // Verificar se o usuário está logado
  const usuario = JSON.parse(localStorage.getItem("userLogged"));

  const entrarBtn = document.getElementById("entrar-btn");
  const registrarBtn = document.getElementById("registrar-btn");
  const saudacao = document.getElementById("saudacao");
  const nomeUsuario = document.getElementById("nome-usuario");
  const logoutBtn = document.getElementById("logout-btn");

  if (usuario) {
      // Se o usuário estiver logado, mostrar saudação
      entrarBtn.style.display = "none";
      registrarBtn.style.display = "none";
      saudacao.style.display = "inline";
      nomeUsuario.textContent = usuario.name; 
      logoutBtn.style.display = "inline"; // e mostrar o botão de logout
  } else {
      // Se o usuário não estiver logado, mostrar os botões
      entrarBtn.style.display = "inline";
      registrarBtn.style.display = "inline";
      saudacao.style.display = "none";
      logoutBtn.style.display = "none"; // E esconder o botão de logout
  }
  //Bingos
  //Logout
  logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userLogged");
      window.location.reload();
  });
});

// Seletor de linguagem
const customSelect = document.querySelector('.custom-select');
const selectedOption = document.querySelector('.selected-option');
const optionsContainer = document.querySelector('.options');
const selectedFlag = document.getElementById('selected-flag');
const selectedText = document.getElementById('selected-text');

selectedOption.addEventListener('click', () => {
  optionsContainer.style.display = 
      optionsContainer.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', () => {
      const flagURL = option.getAttribute('data-img');
      const languageText = option.querySelector('span').textContent;

      selectedFlag.src = flagURL;
      selectedText.textContent = languageText;

      optionsContainer.style.display = 'none';
  });
});

document.addEventListener('click', (e) => {
  if (!customSelect.contains(e.target)) {
      optionsContainer.style.display = 'none';
  }
});