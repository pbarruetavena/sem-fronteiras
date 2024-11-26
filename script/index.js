
// passar o slide de container
document.addEventListener("DOMContentLoaded", () => {
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