function dataPull() {
  keyAPI = `17460026230d940ebe74cf92231eb36e`;

  let balanceSheetURL = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/AAPL?apikey=${keyAPI}&limit=120`;
  fetch(balanceSheetURL)
    .then(response => response.json())
    .then(data => {
      console.log("Balance Sheets");
      console.log(data);
    });

  let incomeStatementURL = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?limit=120&apikey=${keyAPI}`;
  fetch(incomeStatementURL)
    .then(response => response.json())
    .then(data => {
      console.log("Income Statement");
      console.log(data);
    });

  let cashFlowStatementURL = `https://financialmodelingprep.com/api/v3/cash-flow-statement/AAPL?limit=120&apikey=${keyAPI}`;
  fetch(cashFlowStatementURL)
    .then(response => response.json())
    .then(data => {
      console.log("Cash Flow Statement");
      console.log(data);
    });
};

function init() {
  dataPull();
}

init();