ratioResult = [
  {
    symbol: '',
    calendarYear: 0,
    currentRatio: 0,
    quickRatio: 0,
    workingCapital: 0
  },
  {
    symbol: '',
    calendarYear: 2018,
    currentRatio: 0,
    quickRatio: 0,
    workingCapital: 0
  },
  {
    symbol: '',
    calendarYear: 2019,
    currentRatio: 0,
    quickRatio: 0,
    workingCapital: 0
  },
  {
    symbol: '',
    calendarYear: 2020,
    currentRatio: 0,
    quickRatio: 0,
    workingCapital: 0
  },
  {
    symbol: '',
    calendarYear: 2021,
    currentRatio: 0,
    quickRatio: 0,
    workingCapital: 0
  }
];

function calculateRatio(symbol) {
  const ticker = symbol;
  const keyAPI = `17460026230d940ebe74cf92231eb36e`;

  let balanceSheetURL = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${ticker}?apikey=${keyAPI}&limit=120`;

  fetch(balanceSheetURL)
    .then(response => response.json())
    .then(data => {
      console.log("Balance Sheets");
      console.log(data);
      if (data.length > 0) {
        let j = 0;
        for (let i = 4; i >= 0; i--) {
          ratioResult[j].symbol = data[i].symbol;
          ratioResult[j].calendarYear = data[i].calendarYear;
          ratioResult[j].workingCapital = data[i].totalCurrentAssets - data[i].totalCurrentLiabilities;
          ratioResult[j].currentRatio = data[i].totalCurrentAssets / data[i].totalCurrentLiabilities;
          ratioResult[j].quickRatio = (data[i].cashAndCashEquivalents + data[i].netReceivables) / data[i].totalCurrentLiabilities;
          j++;
        }  
        console.log(ratioResult);
      } else {
        console.log(`The company is not found!`);
      }
    });
    return;
};

function init(){
  const ticker = "AAPL";
  calculateRatio(ticker);
  // companyInfo(ticker)
  console.log("after call: " + ratioResult);
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
