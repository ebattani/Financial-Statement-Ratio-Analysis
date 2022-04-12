function calculateRatio(symbol) {
  const ticker = symbol;
  const keyAPI = `17460026230d940ebe74cf92231eb36e`;

  let balanceSheetURL = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${ticker}?apikey=${keyAPI}&limit=120`;

  fetch(balanceSheetURL)
    .then(response => response.json())
    .then(data => {
      // console.log("Balance Sheets");
      // console.log(data);
      if (data.length > 0) {
        let ratioResult = [];
        for (let i = 4; i >= 0; i--) {
          let symbol = data[i].symbol;
          let calendarYear = data[i].calendarYear;
          let currentRatio = data[i].totalCurrentAssets / data[i].totalCurrentLiabilities;
          let quickRatio = (data[i].cashAndCashEquivalents + data[i].netReceivables) / data[i].totalCurrentLiabilities;
          let workingCapital = data[i].totalCurrentAssets - data[i].totalCurrentLiabilities;
          ratioResult.push({
            symbol: symbol,
            calendarYear: calendarYear,
            workingCapital: workingCapital,
            currentRatio: currentRatio,
            quickRatio: quickRatio
          });
          const response = fetch(`/api/ratios`, {
            method: 'POST',
            body: JSON.stringify({ symbol, calendarYear, currentRatio, quickRatio, workingCapital}),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        
          if (response.ok) {
            // document.location.replace('/ratio');
          } else {
            alert('Failed to find company');
          }
        }
        console.log(ratioResult);

      } else {
        console.log(`The company: ${ticker} is not found!`);
      }
    });
  return;
};

function createDataset() {
  let portfolioArray = ["AAPL", "AMZN", "GOOG"];
  for (let i = 0; i < portfolioArray.length; i++) {
    const company = portfolioArray[i];
    calculateRatio(company);
  }
}

function init() {

  createDataset();

}

init();

  // let incomeStatementURL = `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?limit=120&apikey=${keyAPI}`;
  // fetch(incomeStatementURL)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log("Income Statement");
  //     console.log(data);
  //   });

  // let cashFlowStatementURL = `https://financialmodelingprep.com/api/v3/cash-flow-statement/${ticker}?limit=120&apikey=${keyAPI}`;
  // fetch(cashFlowStatementURL)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log("Cash Flow Statement");
  //     console.log(data);
  //   });
