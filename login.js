
function updateLoginState(username) {
    const loginDiv = document.getElementById('login');
    loginDiv.innerHTML = `Hello ${username} <button onclick="window.location.href='/logout';">Logout</button>`;
}
  