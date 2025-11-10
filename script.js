function login() {
  const role = document.getElementById('role').value;

  if (role === 'guru') {
    window.location.href = 'guru.html';
  } else {
    window.location.href = 'ortu.html';
  }
}

function logout() {
  window.location.href = 'index.html';
}
// ====== FITUR INPUT / UPDATE DATA ======

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("hafalanForm");
  const tableBody = document.querySelector("#dataTable tbody");
  let data = JSON.parse(localStorage.getItem("hafalanData")) || [];

  function renderTable() {
    tableBody.innerHTML = "";
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.nama}</td>
        <td>${item.surah}</td>
        <td>${item.ayat}</td>
        <td>${item.progress}%</td>
        <td>${item.keterangan}</td>
        <td>
          <button onclick="editData(${index})" class="btn-small">✏️</button>
          <button onclick="hapusData(${index})" class="btn-small red">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const surah = document.getElementById("surah").value;
    const ayat = document.getElementById("ayat").value;
    const progress = document.getElementById("progress").value;
    const keterangan = document.getElementById("keterangan").value;

    const existingIndex = data.findIndex(item => item.nama === nama && item.surah === surah);
    if (existingIndex >= 0) {
      data[existingIndex] = { nama, surah, ayat, progress, keterangan };
    } else {
      data.push({ nama, surah, ayat, progress, keterangan });
    }

    localStorage.setItem("hafalanData", JSON.stringify(data));
    form.reset();
    renderTable();
  });

  window.editData = (index) => {
    const item = data[index];
    document.getElementById("nama").value = item.nama;
    document.getElementById("surah").value = item.surah;
    document.getElementById("ayat").value = item.ayat;
    document.getElementById("progress").value = item.progress;
    document.getElementById("keterangan").value = item.keterangan;
  };

  window.hapusData = (index) => {
    data.splice(index, 1);
    localStorage.setItem("hafalanData", JSON.stringify(data));
    renderTable();
  };

  renderTable();
});
function openPopup() {
  document.getElementById('popupForm').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popupForm').style.display = 'none';
}

function logout() {
  window.location.href = "index.html";
}

