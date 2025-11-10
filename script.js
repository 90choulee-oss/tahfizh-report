// === Popup Control ===
function openPopup(editId = null) {
  const popup = document.getElementById('popupForm');
  popup.style.display = 'flex';
  popup.setAttribute('data-edit-id', editId || '');
}

function closePopup() {
  document.getElementById('popupForm').style.display = 'none';
  document.getElementById('hafalanForm').reset();
  document.getElementById('popupForm').removeAttribute('data-edit-id');
}

// === Logout ===
function logout() {
  window.location.href = "index.html";
}

// === Ganti Section ===
function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  const buttons = document.querySelectorAll('.menu-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// === LocalStorage Helpers ===
function getData() {
  return JSON.parse(localStorage.getItem('hafalanData')) || [];
}

function saveData(data) {
  localStorage.setItem('hafalanData', JSON.stringify(data));
}

// === Load Tabel ===
function loadTable() {
  const tbody = document.querySelector('#dashboard tbody');
  tbody.innerHTML = "";
  const records = getData();

  records.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.nama}</td>
      <td>${item.surah}</td>
      <td>${item.ayat}</td>
      <td>${item.tanggal}</td>
      <td>${item.keterangan || '-'}</td>
      <td>
        <button class="btn-edit" onclick="editData('${item.id}')">✏️</button>
        <button class="btn-delete" onclick="deleteData('${item.id}')">🗑️</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// === Simpan / Update Data ===
document.getElementById('hafalanForm').addEventListener('submit', function(e) {
  e.preventDefault();

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

  let records = getData();
  const editId = document.getElementById('popupForm').getAttribute('data-edit-id');

  if (editId) {
    // Update data lama
    records = records.map(r => r.id === editId ? { ...r, nama, surah, ayat, tanggal, keterangan } : r);
    alert("Data berhasil diperbarui!");
  } else {
    // Simpan data baru
    const newData = { id: Date.now().toString(), nama, surah, ayat, tanggal, keterangan };
    records.push(newData);
    alert("Data hafalan berhasil disimpan!");
  }

  saveData(records);
  loadTable();
  closePopup();
});

// === Edit Data ===
function editData(id) {
  const records = getData();
  const item = records.find(r => r.id === id);
  if (!item) return;

  const inputs = document.querySelectorAll('#hafalanForm input, #hafalanForm textarea');
  inputs[0].value = item.nama;
  inputs[1].value = item.surah;
  inputs[2].value = item.ayat;
  inputs[3].value = item.tanggal;
  inputs[4].value = item.keterangan;

  openPopup(id);
}

// === Hapus Data ===
function deleteData(id) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  const records = getData().filter(r => r.id !== id);
  saveData(records);
  loadTable();
}

// === Jalankan saat halaman dimuat ===
window.addEventListener('load', loadTable);
