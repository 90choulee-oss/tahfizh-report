// === ORTU.JS ===
// Script untuk halaman Dashboard Orang Tua (ortu.html)

// Ambil data login dari localStorage
const userLogin = localStorage.getItem("userLogin");

// Jika belum login, arahkan kembali ke halaman login
if (!userLogin) {
  window.location.href = "index.html";
}

// Tampilkan sapaan nama santri di halaman
document.addEventListener("DOMContentLoaded", () => {
  const namaEl = document.getElementById("namaSantri");
  if (namaEl && userLogin) {
    const namaCapital =
      userLogin.charAt(0).toUpperCase() + userLogin.slice(1);
    namaEl.textContent = `🌿 Selamat datang, ${namaCapital}!`;
  }
});

// Fungsi untuk logout
function logout() {
  localStorage.removeItem("userLogin");
  window.location.href = "index.html";
}
