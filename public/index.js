const mainBtn = document.getElementById("mainBtn");
const operationBtn = document.getElementById("operBtn");
const paymentBtn = document.getElementById("paymentBtn");
const logOutButton = document.getElementById("logOut");
const profile_id = localStorage.getItem("id");
const username = localStorage.getItem("username");

//main aside add account button
const addAccountButton = document.getElementById("addAccount");

if (!profile_id) {
  window.location.replace("./login.html");
}

// showCurrenciesRates();
showHello();
displayAccountsInfo();
displayLastOperations();

const mainPage = document.querySelector("div#content");
const operationPage = document.querySelector("div#wrapOperations");
const paymentPage = document.querySelector("section#wrapPayments");

mainBtn.addEventListener("click", showMainPage);
operationBtn.addEventListener("click", showOperationPage);
paymentBtn.addEventListener("click", showPaymentPage);

logOutButton.addEventListener("click", logOut);

addAccountButton.addEventListener("click", addNewAccount);

function showCurrenciesRates() {
  const apiKey = "3a33894bd1da657ce1562949";
  setInterval(async () => {
    const responseUSD = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/ILS`
    );
    const responseEUR = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/EUR/ILS`
    );
    const dataUSD = await responseUSD.json();
    const convertRateUSD = dataUSD.conversion_rate.toFixed(2);
    const dataEUR = await responseEUR.json();
    const convertRateEUR = dataEUR.conversion_rate.toFixed(2);
    console.log(convertRateUSD, convertRateEUR);
    const exchangeRate = document.getElementById("exchangeRate");
    exchangeRate.innerHTML = `<span>USD/ILS: ${convertRateUSD}</span> <span>EUR/ILS: ${convertRateEUR}</span>`;
  }, 60000);
}

function showMainPage() {
  mainPage.style.display = "grid";
  operationPage.style.display = "none";
  paymentPage.style.display = "none";

  mainBtn.classList.add("activeButton");
  operationBtn.classList.remove("activeButton");
  paymentBtn.classList.remove("activeButton");
  showHello();
  displayAccountsInfo();
  displayLastOperations();
}

function showOperationPage() {
  mainPage.style.display = "none";
  operationPage.style.display = "flex";
  paymentPage.style.display = "none";

  operationBtn.classList.add("activeButton");
  mainBtn.classList.remove("activeButton");
  paymentBtn.classList.remove("activeButton");
  showOperationsMain();
}

function showPaymentPage() {
  mainPage.style.display = "none";
  operationPage.style.display = "none";
  paymentPage.style.display = "grid";

  paymentBtn.classList.add("activeButton");
  mainBtn.classList.remove("activeButton");
  operationBtn.classList.remove("activeButton");
  showBetweenAccountsPayment();
}

async function displayAccountsInfo() {
  showSpinner();
  console.log(profile_id);
  const response = await fetch(
    `http://localhost:3000/bank/accounts/all/${profile_id}`
  );

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
  hideSpinner();
}

async function displayLastOperations() {
  const lastOperations = document.getElementById("lastOperations");
  showOperations(5, lastOperations);
}

function logOut() {
  localStorage.removeItem("id");
  window.location.replace("./login.html");
}

function showHello() {
  const hello = document.getElementById("hello");
  hello.innerHTML = "Hello, " + localStorage.getItem("username");
}

async function addNewAccount() {
  showSpinner();
  const select = document.querySelector("select#currency");
  const response = await fetch("http://localhost:3000/bank/accounts/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profile_id, type: select.value, amount: 0 }),
  });
  const resp = await response.json();
  console.log(resp);
  console.log(response);
  displayAccountsInfo();
  hideSpinner();
}

async function showOperationsMain() {
  const divDisplayOperations = document.querySelector("div#displayOperations");
  showOperations(25, divDisplayOperations);
}

async function showOperations(limit, htmlElement) {
  showSpinner();
  const response = await fetch(
    `http://localhost:3000/bank/operations/all/${profile_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit }),
    }
  );
  const data = await response.json();
  hideSpinner();
  const html = data.reduce(
    (acc, info) => {
      if (info.username_to === username) {
        console.log(info);
        return acc.concat(`
          <div class="operation">
            <span class="date">${info.date.slice(0, 10)}</span>
            <span class="amount" style="color:green">${info.amount} ${info.type}</span>
            <span class="description">from ${info.username_from}</span>
          </div>`);
      } else {
        return acc.concat(`
         <div class="operation">
            <span class="date">${info.date.slice(0, 10)}</span>
            <span class="amount" style="color:red">${info.amount} ${info.type}</span>
            <span class="description">to ${info.username_to}</span>
          </div>`);
      }

    }, "");
  htmlElement.innerHTML = html;
}

async function showBetweenAccountsPayment() {
  showSpinner();

  const response = await fetch(
    `http://localhost:3000/bank/accounts/all/${profile_id}`
  );

  const data = await response.json();
  
  if (response.ok) {
    const paymentSection = document.querySelector('section#payment');
    const options = data.reduce(
      (acc, info) =>
        acc.concat(`<option value="${info.account_id}${info.type}">${info.account_id} - ${info.type} - ${info.amount}</option>`),
      ""
    );
    paymentSection.innerHTML = `
      <div class="wrapperPayment">
        <div id="betweenAccounts">
          <h5>Between accounts</h5>
          <form id="transferMoney" onsubmit="sendBetweenAccounts(event)">
            <label for="accountFrom">Where is the money debited from?</label>
            <select id="from">
              ${options}
            </select>
            <label for="accountTo">Where is the money deposited?</label>
            <select id="to">
              ${options}
            </select>
            <label for="amountMoney">Enter amount money:</label>
            <input type="number" placeholder="Type amount of money" name="amount" required/>
            <input type="submit" value="Send">
          </form>
        </div>
      </div>`
    hideSpinner();
  } else {
    alert(data.error);
  }
}

async function sendBetweenAccounts(event){
  showSpinner();
  event.preventDefault();

  const account_id_from = event.target.from.value.slice(0, 1);
  const account_id_to = event.target.to.value.slice(0, 1);
  const type = event.target.from.value.slice(1);
  const amount = event.target.amount.value;

  console.log(event.target);

  const response2 = await fetch(
    `http://localhost:3000/bank/operations/add/${profile_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        account_id_from, 
        account_id_to, 
        type, 
        amount, 
        username_from:username, 
        username_to:username
       }),
    }
  );
  const data2 = await response2.json();
  alert(JSON.stringify(data2))
  hideSpinner();
}

function showSpinner() {
  const spinner = document.getElementById("wrapperSpinner");
  spinner.style.display = "flex";
}

function hideSpinner() {
  const spinner = document.getElementById("wrapperSpinner");
  spinner.style.display = "none";
}
