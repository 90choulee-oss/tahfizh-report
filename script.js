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
