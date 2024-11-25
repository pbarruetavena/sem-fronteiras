
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


// seletor de linguagem
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
