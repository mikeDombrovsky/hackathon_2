const form = document.getElementById("login");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
form.addEventListener("submit", login);

async function login(event) {
  event.preventDefault();
  const user = {
    username: inputUsername.value,
    password: inputPassword.value,
  };

  const response = await fetch("/bank/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  alert(data.message);
}
