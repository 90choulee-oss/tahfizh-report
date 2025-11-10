// === GURU.JS ===
document.addEventListener("DOMContentLoaded", () => {
  const userLogin = localStorage.getItem("userLogin");
  const role = localStorage.getItem("role");

  if (!userLogin || role !== "guru") {
    window.location.href = "index.html";
    return;
  }

  const namaEl = document.getElementById("namaGuru");
  if (namaEl) {
    const namaCapital = userLogin.charAt(0).toUpperCase() + userLogin.slice(1);
    namaEl.textContent = `👋 Selamat datang, Ustadz/Ustadzah ${namaCapital}`;
  }

  tampilkanData();
});
