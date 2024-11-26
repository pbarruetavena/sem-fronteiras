document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");

    // Validação de email com Regex
    emailInput.addEventListener("input", () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value)) {
            emailError.style.display = "none";
        } else if (emailInput.value === "") {
            emailError.style.display = "none"; 
        } else {
            emailError.style.display = "block";
            emailError.textContent = "Por favor, insira um email válido.";
        }
    });

    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const email = emailInput.value;
        const password = passwordInput.value;

        if (!password) {
            alert("A senha não pode estar vazia.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Simular login e salvar estado no localStorage
            localStorage.setItem("userLogged", JSON.stringify(user));

            alert("Login realizado com sucesso!");
            window.location.href = "index.html"; // Redirecionar após login
        } else {
            alert("Email ou senha incorretos.");
        }
    });
});