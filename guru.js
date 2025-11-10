// === GURU.JS ===
// Script untuk halaman Dashboard Guru (guru.html)

// Ambil data login dari localStorage
const userLogin = localStorage.getItem("userLogin");

// Jika belum login, arahkan ke halaman login
if (!userLogin) {
  window.location.href = "index.html";
}

// === Tampilkan sapaan nama guru ===
document.addEventListener("DOMContentLoaded", () => {
  const namaEl = document.getElementById("namaGuru");
  if (namaEl && userLogin) {
    const namaCapital =
      userLogin.charAt(0).toUpperCase() + userLogin.slice(1);
    namaEl.textContent = `👋 Selamat datang, Ustadz/Ustadzah ${namaCapital}`;
  }

  // Tampilkan data tabel ketika halaman dimuat
  tampilkanData();
});

// === Fungsi Logout ===
function logout() {
  localStorage.removeItem("userLogin");
  window.location.href = "index.html";
}

/* =========================================================
   BAGIAN POPUP INPUT / UPDATE DATA
   ========================================================= */

const popupForm = document.getElementById("popupForm");
const formInput = document.getElementById("formInput");
const btnInput = document.getElementById("btnInput");
const btnClose = document.getElementById("btnClose");

// Tampilkan popup form input
if (btnInput) {
  btnInput.addEventListener("click", () => {
    popupForm.classList.add("show");
    document.body.style.overflow = "hidden";
  });
}

// Tutup popup form input
if (btnClose) {
  btnClose.addEventListener("click", () => {
    popupForm.classList.remove("show");
    document.body.style.overflow = "auto";
    formInput.reset();
  });
}

// Fungsi simpan data
if (formInput) {
  formInput.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      nama: document.getElementById("nama").value.trim(),
      surah: document.getElementById("surah").value.trim(),
      ayat: document.getElementById("ayat").value.trim(),
      keterangan: document.getElementById("keterangan").value.trim(),
      tanggal: new Date().toLocaleDateString("id-ID"),
    };

    let dataHafalan = JSON.parse(localStorage.getItem("dataHafalan")) || [];
    dataHafalan.push(data);
    localStorage.setItem("dataHafalan", JSON.stringify(dataHafalan));

    alert("✅ Data hafalan berhasil disimpan!");
    popupForm.classList.remove("show");
    document.body.style.overflow = "auto";
    formInput.reset();

    tampilkanData(); // refresh tabel otomatis
  });
}

/* =========================================================
   FUNGSI TAMPILKAN DATA DI TABEL
   ========================================================= */

function tampilkanData() {
  const tabelBody = document.querySelector("#tabelHafalan tbody");
  if (!tabelBody) return;

  // Hapus isi tabel dulu
  tabelBody.innerHTML = "";

  const dataHafalan = JSON.parse(localStorage.getItem("dataHafalan")) || [];

  if (dataHafalan.length === 0) {
    tabelBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;">Belum ada data hafalan.</td>
      </tr>`;
    return;
  }

  dataHafalan.forEach((d, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${d.nama}</td>
      <td>${d.surah}</td>
      <td>${d.ayat}</td>
      <td>${d.keterangan}</td>
      <td>${d.tanggal}</td>
    `;
    tabelBody.appendChild(row);
  });
}
