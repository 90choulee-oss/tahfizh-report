document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Contoh login sederhana
    if (username === "guru" && password === "123") {
      window.location.href = "guru.html";
    } else if (username === "ortu" && password === "123") {
      window.location.href = "ortu.html";
    } else {
      alert("Username atau password salah!");
    }
  });
});
