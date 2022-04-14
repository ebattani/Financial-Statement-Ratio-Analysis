const searchInput = document.querySelector('#user-input');
const addButton = document.querySelector('#add-button');
const deleteButton = document.querySelector('#delete-button');
const companyButton = document.querySelector('#company-button');
const userInfo1 = document.querySelector('#user-info');

let tickerList = [];
let companyInfo = [];

function getCompanyInfo(symbol, portfolioId) {
  const ticker = symbol;
  
  const id = portfolioId;
  const keyAPI = `d819321c933c451db684ef4a2b41d62d`;
  let companyURL = `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${keyAPI}`;

  fetch(companyURL)
    .then(response => response.json())
    .then(data => {
      console.log("Company Information");
      console.log(data);
      if (data.length > 0) {
        // companyInfo.push(data);
        let element = "#company-name" + id;
        $(element).html(data[0].companyName);
        element = "#company-icon" + id;
        $(element).attr("src", data[0].image);
        element = "#company-web" + id;
        $(element).html(data[0].website);
        element = "#company-exchange" + id;
        $(element).html(data[0].exchangeShortName);
        element = "#company-industry" + id;
        $(element).html(data[0].industry);
        element = "#company-sector" + id;
        $(element).html(data[0].sector);
        element = "#company-ipo" + id;
        $(element).html(data[0].ipoDate);
        element = "#company-desc" + id;
        $(element).html(data[0].description);
      } else {
        console.log(`The company is not found!`);
      }
    });
  return;
};

function printCompanyInfo() {
  const id = userInfo1.getAttribute('data-id');
  fetch(`/api/portfolios/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          let company = data[index].company_symbol;
          let portfolio = data[index].id;
          getCompanyInfo(company, portfolio);
        }
      }
    });
}

const newSearch = async (event) => {
  event.preventDefault();

  const searchTicker = searchInput.value.trim();
  const ticker = searchTicker.toUpperCase();
  console.log(ticker);

  const response = await fetch(`/api/portfolios`, {
    method: 'POST',
    body: JSON.stringify({ ticker }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/ratio');
  } else {
    alert('Failed to find company');
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();

  let checkedValue = '';
  const inputElements = document.getElementsByClassName('single-check');
  for (let i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      checkedValue = inputElements[i].getAttribute('data-id');
      break;
    }
  }

  if (checkedValue > 0) {

    const response = await fetch(`/api/portfolios/${checkedValue}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/ratio');
    } else {
      alert('Failed to delete');
    }
  }
};

function onlyOne(checkbox) {
  let checkboxes = document.getElementsByName('portfolio-checkbox');
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false
  })
}

if (addButton) {
  addButton.addEventListener('click', newSearch);
}

if (deleteButton) {
  deleteButton.addEventListener('click', delButtonHandler);
}

if (companyButton) {
  companyButton.addEventListener('click', printCompanyInfo);
}