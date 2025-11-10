// === GURU.JS === 
document.addEventListener("DOMContentLoaded", () => {
  const userLogin = localStorage.getItem("userLogin");
  const role = localStorage.getItem("role");

  // --- Cegah akses tanpa login ---
  if (!userLogin || role !== "guru") {
    window.location.href = "index.html";
    return;
  }

  // --- Tampilkan nama guru di pojok atas ---
  const namaEl = document.getElementById("namaGuru");
  if (namaEl) {
    const namaCapital = userLogin.charAt(0).toUpperCase() + userLogin.slice(1);
    namaEl.textContent = `👋 Selamat datang, Ustadz/Ustadzah ${namaCapital}`;
  }

  // --- Tampilkan data hafalan awal ---
  tampilkanData();

  // --- Event tombol menu di sidebar ---
  const btnInput = document.getElementById("btnInput");
  if (btnInput) btnInput.addEventListener("click", () => bukaPopup());

  const btnCancel = document.getElementById("btnCancel");
  if (btnCancel) btnCancel.addEventListener("click", () => tutupPopup());

  const formInput = document.getElementById("formInput");
  if (formInput) {
    formInput.addEventListener("submit", (e) => {
      e.preventDefault();
      simpanData();
    });
  }

  // --- Tombol Logout ---
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("userLogin");
      localStorage.removeItem("role");
      window.location.href = "index.html";
    });
  }
});

// === Fungsi menampilkan data ===
function tampilkanData() {
  const dataTersimpan = JSON.parse(localStorage.getItem("dataHafalan")) || [];
  const tbody = document.querySelector("#tabelHafalan tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (dataTersimpan.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#999;">Belum ada data hafalan</td></tr>`;
    return;
  }

  dataTersimpan.forEach((item, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.namaSantri}</td>
      <td>${item.surah}</td>
      <td>${item.ayat}</td>
      <td>${item.tanggal}</td>
      <td>${item.keterangan}</td>
      <td>
        <button class="btn-edit" onclick="editData(${i})">✏️</button>
        <button class="btn-delete" onclick="hapusData(${i})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// === Fungsi buka/tutup popup form ===
function bukaPopup() {
  const popup = document.getElementById("popupForm");
  if (popup) popup.classList.add("show");
}

function tutupPopup() {
  const popup = document.getElementById("popupForm");
  if (popup) popup.classList.remove("show");
  document.getElementById("formInput").reset();
}

// === Simpan Data ===
function simpanData() {
  const namaSantri = document.getElementById("namaSantri").value.trim();
  const surah = document.getElementById("surah").value.trim();
  const ayat = document.getElementById("ayat").value.trim();
  const tanggal = document.getElementById("tanggal").value;
  const keterangan = document.getElementById("keterangan").value.trim();

  if (!namaSantri || !surah || !ayat || !tanggal) {
    alert("Mohon lengkapi semua data!");
    return;
  }

  const dataBaru = { namaSantri, surah, ayat, tanggal, keterangan };
  const dataTersimpan = JSON.parse(localStorage.getItem("dataHafalan")) || [];
  dataTersimpan.push(dataBaru);
  localStorage.setItem("dataHafalan", JSON.stringify(dataTersimpan));

  tampilkanData();
  tutupPopup();
}

// === Edit Data ===
function editData(index) {
  const dataTersimpan = JSON.parse(localStorage.getItem("dataHafalan")) || [];
  const data = dataTersimpan[index];
  if (!data) return;

  bukaPopup();
  document.getElementById("namaSantri").value = data.namaSantri;
  document.getElementById("surah").value = data.surah;
  document.getElementById("ayat").value = data.ayat;
  document.getElementById("tanggal").value = data.tanggal;
  document.getElementById("keterangan").value = data.keterangan;

  // Ganti aksi tombol simpan
  const formInput = document.getElementById("formInput");
  formInput.onsubmit = function (e) {
    e.preventDefault();
    dataTersimpan[index] = {
      namaSantri: document.getElementById("namaSantri").value.trim(),
      surah: document.getElementById("surah").value.trim(),
      ayat: document.getElementById("ayat").value.trim(),
      tanggal: document.getElementById("tanggal").value,
      keterangan: document.getElementById("keterangan").value.trim(),
    };
    localStorage.setItem("dataHafalan", JSON.stringify(dataTersimpan));
    tampilkanData();
    tutupPopup();
    formInput.onsubmit = (ev) => { ev.preventDefault(); simpanData(); }; // Kembalikan default
  };
}

// === Hapus Data ===
function hapusData(index) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;
  const dataTersimpan = JSON.parse(localStorage.getItem("dataHafalan")) || [];
  dataTersimpan.splice(index, 1);
  localStorage.setItem("dataHafalan", JSON.stringify(dataTersimpan));
  tampilkanData();
}
