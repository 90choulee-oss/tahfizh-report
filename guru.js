// === GURU.JS ===
document.addEventListener("DOMContentLoaded", () => {
  const userLogin = localStorage.getItem("userLogin");
  const role = localStorage.getItem("role");

  if (!userLogin || role !== "guru") {
    window.location.href = "index.html";
    return;
  }

  // Tampilkan nama guru di header
  const namaEl = document.getElementById("namaGuru");
  if (namaEl) {
    const namaCapital = userLogin.charAt(0).toUpperCase() + userLogin.slice(1);
    namaEl.textContent = `👋 Selamat datang, Ustadz/Ustadzah ${namaCapital}`;
  }

  tampilkanData(); // Tampilkan data saat halaman dibuka
});

// Ambil data dari localStorage
function getData() {
  return JSON.parse(localStorage.getItem("dataHafalan") || "[]");
}

// Simpan data ke localStorage
function setData(data) {
  localStorage.setItem("dataHafalan", JSON.stringify(data));
}

// Tampilkan data ke tabel
function tampilkanData() {
  const tabelBody = document.getElementById("tabelData");
  const data = getData();
  tabelBody.innerHTML = "";

  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.namaSantri}</td>
      <td>${item.surah}</td>
      <td>${item.ayat}</td>
      <td>${item.tanggal}</td>
      <td>${item.nilai}</td>
      <td>
        <button class="btn-edit" onclick="editData(${index})">✏️</button>
        <button class="btn-delete" onclick="hapusData(${index})">🗑️</button>
      </td>
    `;
    tabelBody.appendChild(row);
  });
}

// Simpan data baru atau update data lama
function simpanData() {
  const nama = document.getElementById("namaSantri").value.trim();
  const surah = document.getElementById("surah").value.trim();
  const ayat = document.getElementById("ayat").value.trim();
  const tanggal = document.getElementById("tanggal").value;
  const nilai = document.getElementById("nilai").value.trim();

  if (!nama || !surah || !ayat || !tanggal || !nilai) {
    alert("Semua kolom harus diisi!");
    return;
  }

  let data = getData();
  const editIndex = localStorage.getItem("editIndex");

  if (editIndex !== null) {
    data[editIndex] = { namaSantri: nama, surah, ayat, tanggal, nilai };
    localStorage.removeItem("editIndex");
  } else {
    data.push({ namaSantri: nama, surah, ayat, tanggal, nilai });
  }

  setData(data);
  tampilkanData();
  closePopup();
  clearForm();
}

// Hapus data
function hapusData(index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    let data = getData();
    data.splice(index, 1);
    setData(data);
    tampilkanData();
  }
}

// Edit data
function editData(index) {
  const data = getData()[index];
  document.getElementById("namaSantri").value = data.namaSantri;
  document.getElementById("surah").value = data.surah;
  document.getElementById("ayat").value = data.ayat;
  document.getElementById("tanggal").value = data.tanggal;
  document.getElementById("nilai").value = data.nilai;
  localStorage.setItem("editIndex", index);
  document.getElementById("popupForm").style.display = "flex";
}

// Bersihkan form
function clearForm() {
  document.getElementById("namaSantri").value = "";
  document.getElementById("surah").value = "";
  document.getElementById("ayat").value = "";
  document.getElementById("tanggal").value = "";
  document.getElementById("nilai").value = "";
}

// Pencarian data santri
document.addEventListener("input", (e) => {
  if (e.target.id === "search") {
    const keyword = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("#tabelData tr");
    rows.forEach(row => {
      const nama = row.children[1].textContent.toLowerCase();
      row.style.display = nama.includes(keyword) ? "" : "none";
    });
  }
});
