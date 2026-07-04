const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector("#nav-menu");

menuButton.textContent = "☰";

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    if (navMenu.classList.contains("open")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }
});