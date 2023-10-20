const mainBtn = document.getElementById("mainBtn");
const operationBtn = document.getElementById("operBtn");
const paymentBtn = document.getElementById("paymentBtn");
const logOutButton = document.getElementById("logOut");
const id = localStorage.getItem("id");
const username = localStorage.getItem("username");

if (!id) {
  window.location.replace("./login.html");
}

const mainPage = document.querySelector("div#content");
const operationPage = document.querySelector("div#wrapOperations");
const paymentPage = document.querySelector("div#wrapPayments");

mainBtn.addEventListener("click", showMainPage);
operationBtn.addEventListener("click", showOperationPage);
paymentBtn.addEventListener("click", showPaymentPage);

logOutButton.addEventListener("click", logOut);

function showMainPage() {
  mainPage.style.display = "grid";
  operationPage.style.display = "none";
  paymentPage.style.display = "none";
  showHello();
  displayAccountsInfo();
}

async function displayAccountsInfo() {
  console.log(id);
  const response = await fetch(`http://localhost:3000/bank/accounts/all/${id}`);

  const data = await response.json();
  if (response.ok) {
    const accounts = document.getElementById("accounts");
    const html = data.reduce(
      (acc, info) =>
        acc.concat(`<div class="account">${info.amount} ${info.type}</div>`),
      ""
    );
    accounts.innerHTML = html;
  } else {
    alert(data.error);
  }
}

function showOperationPage() {
  mainPage.style.display = "none";
  operationPage.style.display = "flex";
  paymentPage.style.display = "none";
}

function showPaymentPage() {
  mainPage.style.display = "none";
  operationPage.style.display = "none";
  paymentPage.style.display = "grid";
}

function logOut() {
  localStorage.removeItem("id");
  window.location.replace("./login.html");
}

function showHello() {
  const hello = document.getElementById("hello");
  hello.innerHTML = "Hello, " + localStorage.getItem("username");
}
