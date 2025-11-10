// === Popup Control ===
function openPopup() {
  document.getElementById('popupForm').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popupForm').style.display = 'none';
}

// === Logout ===
function logout() {
  window.location.href = "index.html";
}

// === Ganti Section (Dasbor / Daftar Hadir) ===
function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  const buttons = document.querySelectorAll('.menu-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// === Fungsi Simpan ke LocalStorage ===
function saveToLocalStorage(data) {
  let records = JSON.parse(localStorage.getItem('hafalanData')) || [];
  records.push(data);
  localStorage.setItem('hafalanData', JSON.stringify(records));
}

// === Fungsi Load dari LocalStorage ===
function loadFromLocalStorage() {
  const records = JSON.parse(localStorage.getItem('hafalanData')) || [];
  const tbody = document.querySelector('#dashboard tbody');
  tbody.innerHTML = "";

  records.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.nama}</td>
      <td>${item.surah}</td>
      <td>${item.ayat}</td>
      <td>${item.tanggal}</td>
      <td>${item.keterangan || '-'}</td>
    `;
    tbody.appendChild(row);
  });
}

// === Event Form Submit ===
document.getElementById('hafalanForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Ambil nilai dari form
  const inputs = this.querySelectorAll('input, textarea');
  const nama = inputs[0].value.trim();
  const surah = inputs[1].value.trim();
  const ayat = inputs[2].value.trim();
  const tanggal = inputs[3].value;
  const keterangan = inputs[4].value.trim();

  if (!nama || !surah || !ayat || !tanggal) {
    alert("Mohon lengkapi semua data sebelum menyimpan!");
    return;
  }

  const newData = { nama, surah, ayat, tanggal, keterangan };

  // Simpan ke LocalStorage
  saveToLocalStorage(newData);

  // Tampilkan di tabel
  const tbody = document.querySelector('#dashboard tbody');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${nama}</td>
    <td>${surah}</td>
    <td>${ayat}</td>
    <td>${tanggal}</td>
    <td>${keterangan || '-'}</td>
  `;
  tbody.appendChild(newRow);

  // Reset form dan tutup popup
  this.reset();
  closePopup();

  alert("Data hafalan berhasil disimpan!");
});

// === Jalankan saat halaman dimuat ===
window.addEventListener('load', loadFromLocalStorage);
