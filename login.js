function login() {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  // Daftar akun guru
  const guruAccounts = ["guru", "ustadz", "ustadzah"];
  const passwordGuru = "123";

  // Login guru
  if (guruAccounts.includes(username) && password === passwordGuru) {
    localStorage.setItem("userLogin", username);
    localStorage.setItem("role", "guru");
    // beri sedikit jeda agar localStorage tersimpan
    setTimeout(() => {
      window.location.href = "guru.html";
    }, 200);
    return;
  }

  // Login ortu
  const santriAccounts = ["ahmad", "zahra", "hanin", "faiz"];
  const passwordSantri = "123";

  if (santriAccounts.includes(username) && password === passwordSantri) {
    localStorage.setItem("userLogin", username);
    localStorage.setItem("role", "ortu");
    setTimeout(() => {
      window.location.href = "ortu.html";
    }, 200);
    return;
  }

  alert("❌ Username atau password salah!");
}
