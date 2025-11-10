// === LOGIN.JS ===
// Script login sederhana untuk Tahfizh Report

function login() {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  // Daftar akun guru (bisa ditambah)
  const guruAccounts = ["guru", "ustadz", "ustadzah"];
  const passwordGuru = "123";

  // Validasi login guru
  if (guruAccounts.includes(username) && password === passwordGuru) {
    localStorage.setItem("userLogin", username);
    localStorage.setItem("role", "guru");
    window.location.href = "guru.html";
    return;
  }

  // Login orang tua / santri (contoh data sementara)
  const santriAccounts = ["ahmad", "zahra", "hanin", "faiz"]; // tambahkan nama santri sesuai data
  const passwordSantri = "123";

  if (santriAccounts.includes(username) && password === passwordSantri) {
    localStorage.setItem("userLogin", username);
    localStorage.setItem("role", "ortu");
    window.location.href = "ortu.html";
    return;
  }

  // Jika tidak cocok
  alert("❌ Username atau password salah!");
}
