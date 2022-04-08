class Ratio {
  constructor(symbol, year, workingCapital, currentRatio, quickRatio) {
      this.symbol = symbol;
      this.year= year;
      this.workingCapital = workingCapital;
      this.currentRatio = currentRatio;
      this.quickRatio = quickRatio;
  }

  getTicker() {
      const ticker = this.ticker;
      return ticker;
  }

}

const keyAPI = `17460026230d940ebe74cf92231eb36e`;

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
let ratioResult = [];

function calculateRatio(symbol) {
  const ticker = symbol;
  let balanceSheetURL = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${ticker}?apikey=${keyAPI}&limit=120`;
  // let companyURL = `https://financialmodelingprep.com/api/v3/profile/${ticker}`;

  fetch(balanceSheetURL)
    .then(response => response.json())
    .then(data => {
      console.log("Balance Sheets");
      console.log(data);
      if (data.length > 0) {
        for (let i = 4; i >= 0; i--) {
          let workingCapital = data[i].totalCurrentAssets - data[i].totalCurrentLiabilities;
          let currentRatio = data[i].totalCurrentAssets / data[i].totalCurrentLiabilities;
          let quickRatio = (data[i].cashAndCashEquivalents + data[i].netReceivables) / data[i].totalCurrentLiabilities;
          let ratioObject = new Ratio(ticker, data[i].calendarYear, workingCapital, currentRatio, quickRatio);
          ratioResult.push(ratioObject);
        }  
      } else {
        console.log(`The company is not found!`);
      }
    });
    console.log(ratioResult);
    return;
};

// function companyInfo(symbol) {
//   const ticker = symbol;
//   let companyURL = `https://financialmodelingprep.com/api/v3/ratios-ttm/${ticker}?apikey=${keyAPI}&limit=120`;

//   fetch(companyURL)
//     .then(response => response.json())
//     .then(data => {
//       console.log("Company Information");
//       console.log(data);
//       if (data.length > 0) {
//         ratioResult.push(data);
//         console.log("in loop: " + ratioResult);
//       } else {
//         console.log(`The company is not found!`);
//       }
//     });
//     return;
// };

function init(){
  const ticker = "AAPL";
  calculateRatio(ticker);
  // companyInfo(ticker)
  console.log("after call: " + ratioResult);
}

init();