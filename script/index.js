function loadMenuItems() {
    const menuItems = document.querySelectorAll(".menu-item");
    const containers = document.querySelectorAll(".container");

    const activateMenuItem = (menuItem) => {
        menuItems.forEach(i => i.classList.remove("selected"));

        menuItem.classList.add("selected");

        containers.forEach(container => container.classList.remove("visible"));

        const targetId = menuItem.getAttribute("data-target");
        const targetContainer = document.getElementById(targetId);
        if (targetContainer) {
            targetContainer.classList.add("visible");
        }
    };

    const firstMenuItem = menuItems[0];
    if (firstMenuItem) {
        activateMenuItem(firstMenuItem);
    }

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            activateMenuItem(item);
        });
    });
}

function loadAuth() {
    // Verificar se o usuário está logado
    const usuario = JSON.parse(localStorage.getItem("userLogged"));

    const nomeUsuario = document.getElementById("nome-usuario");
    const logoutBtn = document.getElementById("logout-btn");

    const notAuthUser = document.getElementById("not-auth-user");
    const authUser = document.getElementById("auth-user");

    if (usuario) {
        // Se o usuário estiver logado, mostrar saudação
        notAuthUser.style.display = "none";
        authUser.style.display = "flex";
        nomeUsuario.textContent = usuario.name;
    } else {
        // Se o usuário não estiver logado, mostrar os botões
        notAuthUser.style.display = "flex";
        authUser.style.display = "none";
    }
    //Bingos
    //Logout
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("userLogged");
        window.location.reload();
    });
}

// passar o slide de container
document.addEventListener("DOMContentLoaded", () => {
    loadMenuItems();
    loadAuth();
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
        const langCode = option.getAttribute('data-value');
        console.log(`translating to ${langCode}`);
        selectedFlag.src = flagURL;
        selectedText.textContent = languageText;

        optionsContainer.style.display = 'none';

        translatePage(langCode);
    });
});

document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
        optionsContainer.style.display = 'none';
    }
});

// Initialize Google Translate Element
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        includedLanguages: 'en,pt,fr,ar',
        autoDisplay: true,
    }, 'google_translate_element');
}

function translatePage(langCode, iterations = 1) {
    const googleSelect = document.querySelector("#google_translate_element select");
    googleSelect.value = langCode;
    googleSelect.dispatchEvent(new Event('change'));
    if (googleSelect.value !== langCode && iterations <= 10) translatePage(langCode);
}

function waitForGoogleTranslate() {
    const googleSelect = document.querySelector("#google_translate_element select");

    if (googleSelect.value) updateCustomSelect(googleSelect);
    else setTimeout(waitForGoogleTranslate, 100);
}

// Start polling when the window is loaded
window.onload = () => {
    waitForGoogleTranslate();
};

function updateCustomSelect(googleSelect) {
    const currentLang = googleSelect.value;
    const option = document.querySelector(`.option[data-value="${currentLang}"]`);

    if (option) {
        const flagURL = option.getAttribute('data-img');
        const languageText = option.querySelector('span').textContent;

        selectedFlag.src = flagURL;
        selectedText.textContent = languageText;
    }
}

// Depoimentos Carrossel
const wrapper = document.querySelector('.depoimentos-wrapper');
const depoimentos = document.querySelectorAll('.depoimento');
let index = 0;

document.querySelector('.seta-esquerda').addEventListener('click', () => {
    index = (index > 0) ? index - 1 : depoimentos.length - 1;
    updateCarousel();
});

document.querySelector('.seta-direita').addEventListener('click', () => {
    index = (index < depoimentos.length - 1) ? index + 1 : 0;
    updateCarousel();
});

function updateCarousel() {
    const width = wrapper.offsetWidth;
    wrapper.style.transform = `translateX(-${index * width}px)`;
}
