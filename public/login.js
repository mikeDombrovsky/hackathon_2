const form = document.getElementById("login");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const registerButton = document.getElementById("register_btn");

form.addEventListener("submit", login);
registerButton.addEventListener("click", register);

async function login(event) {
  event.preventDefault();
  const user = {
    username: inputUsername.value,
    password: inputPassword.value,
  };

  const response = await fetch("http://localhost:3000/bank/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("id", data.id);
    alert(data.message + localStorage.getItem("id"));
    window.location.replace("./index.html");
  } else {
    alert(data.error);
  }
}

async function register(event) {
  event.preventDefault();
  const user = {
    username: inputUsername.value,
    password: inputPassword.value,
  };
  const response = await fetch("http://localhost:3000/bank/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (response.ok) {
    alert(data.message);
    window.location.replace("./index.html");
  } else {
    alert(data.error);
  }
}
