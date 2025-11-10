function login() {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  // Daftar contoh peserta tahfizh (bisa dikembangkan nanti)
  const peserta = ["ahmad", "zahra", "faiz", "hanin", "salma"];

  // Login guru
  if (username === "guru" && password === "123") {
    window.location.href = "guru.html";
  }
  // Login ortu (nama peserta)
  else if (peserta.includes(username) && password === "123") {
    // Simpan nama ke localStorage agar halaman ortu bisa tahu siapa yang login
    localStorage.setItem("userLogin", username);
    window.location.href = "ortu.html";
  }
  else {
    alert("Username atau password salah!");
  }
}
