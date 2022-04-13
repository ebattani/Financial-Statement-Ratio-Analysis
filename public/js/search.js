const searchInput = document.querySelector('#user-input');
const addButton = document.querySelector('#add-button');
const deleteButton = document.querySelector('#delete-button');
const companyButton = document.querySelector('#company-button');

let tickerList = [];
let companyInfo = [];

function getCompanyInfo(symbol) {
  const ticker = symbol;
  const keyAPI = `17460026230d940ebe74cf92231eb36e`;
  let companyURL = `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${keyAPI}`;

  fetch(companyURL)
    .then(response => response.json())
    .then(data => {
      console.log("Company Information");
      console.log(data);
      if (data.length > 0) {
        companyInfo.push(data);
      } else {
        console.log(`The company is not found!`);
      }
    });
  console.log(companyInfo);
  return;
};

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
  companyButton.addEventListener('click', getCompanyInfo('AAPL'));
}