document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const nameInput = document.getElementById("name");
    const confirmPasswordInput = document.getElementById("confirm-password");
    //Deus abençoe o Const
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value; 
        const name = nameInput.value;

        if (password !== confirmPassword) {
            alert("As senhas não coincidem. Tente novamente.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find(user => user.email === email)) {
            alert("Este email já está registrado.");
            return;
        }

        users.push({ email, password, name });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registro realizado com sucesso!");
        window.location.href = "login.html"; // Redireciona para a página de login após o registro
    });
});