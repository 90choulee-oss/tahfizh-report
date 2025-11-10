document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.getElementById("btnInput");
  const btnClosePopup = document.getElementById("closePopup");
  const btnSimpan = document.getElementById("btnSimpan");
  const popup = document.getElementById("popupInput");
  const form = document.getElementById("formInput");
  const tableBody = document.querySelector("#tabelHafalan tbody");

  let editingIndex = null;
  let dataHafalan = JSON.parse(localStorage.getItem("dataHafalan")) || [];

  function renderTable() {
    tableBody.innerHTML = "";
    dataHafalan.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.tanggal}</td>
        <td>${item.surah}</td>
        <td>${item.ayat}</td>
        <td>${item.keterangan}</td>
        <td>
          <button class="btn-edit" data-index="${index}">✏️</button>
          <button class="btn-hapus" data-index="${index}">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Hubungkan event tombol Edit dan Hapus
    document.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        editingIndex = idx;
        const data = dataHafalan[idx];
        form.tanggal.value = data.tanggal;
        form.surah.value = data.surah;
        form.ayat.value = data.ayat;
        form.keterangan.value = data.keterangan;
        popup.classList.add("show");
      });
    });

    document.querySelectorAll(".btn-hapus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        if (confirm("Yakin ingin menghapus data ini?")) {
          dataHafalan.splice(idx, 1);
          localStorage.setItem("dataHafalan", JSON.stringify(dataHafalan));
          renderTable();
        }
      });
    });
  }

  // Tampilkan popup input baru
  btnInput.addEventListener("click", () => {
    editingIndex = null;
    form.reset();
    popup.classList.add("show");
  });

  // Tutup popup
  btnClosePopup.addEventListener("click", () => popup.classList.remove("show"));

  // Simpan data
  btnSimpan.addEventListener("click", () => {
    const newData = {
      tanggal: form.tanggal.value,
      surah: form.surah.value,
      ayat: form.ayat.value,
      keterangan: form.keterangan.value,
    };

    if (editingIndex !== null) {
      dataHafalan[editingIndex] = newData;
    } else {
      dataHafalan.push(newData);
    }

    localStorage.setItem("dataHafalan", JSON.stringify(dataHafalan));
    renderTable();
    popup.classList.remove("show");
    form.reset();
  });

  renderTable();
});
