//teste

document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const containers = document.querySelectorAll(".container");
  
    menuItems.forEach(item => {
      item.addEventListener("click", () => {
        menuItems.forEach(i => i.classList.remove("selected"));
  
        item.classList.add("selected");
  
        containers.forEach(container => {
          container.classList.remove("visible");
        });
  
        const targetId = item.getAttribute("data-target");
        const targetContainer = document.getElementById(targetId);
        if (targetContainer) {
          targetContainer.classList.add("visible");
        }
      });
    });
  });