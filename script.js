const ADMIN_PASSWORD = 'Mishty.12';

function checkPass() {
  const input = document.getElementById('adminPass').value;
  if (input === ADMIN_PASSWORD) {
    document.getElementById('admin-lock').style.display = 'none';
    document.getElementById('mainSite').style.display = 'block';
  } else {
    alert('Wrong password! Try again.');
  }
}

// On page load, show lock screen
window.onload = () => {
  document.getElementById('admin-lock').style.display = 'flex';
  document.getElementById('mainSite').style.display = 'none';
};
