const logOutButton = document.getElementById("logOut");
const id = localStorage.getItem("id");

if (!id) {
  window.location.replace("./login.html");
}

logOutButton.addEventListener("click", logOut);

function logOut() {
  localStorage.removeItem("id");
  window.location.replace("./login.html");
}
