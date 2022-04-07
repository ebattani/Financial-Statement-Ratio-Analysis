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


const calculateRatio = async (symbol, choice) => {
  const ticker = symbol;
  let ratioResult = [];
  let balanceSheetURL = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${ticker}?apikey=${keyAPI}&limit=120`;
  await fetch(balanceSheetURL)
    .then(response => response.json())
    .then(data => {
      console.log("Balance Sheets");
      console.log(data);
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          // companyResult[i].workingCapital = data[i].totalCurrentAssets - data[i].totalCurrentLiabilities;
          ratioResult.push(data[i].totalCurrentAssets / data[i].totalCurrentLiabilities);
          // companyResult[i].quickRatio = (data[i].cashAndCashEquivalents + data[i].netReceivables) / data[i].totalCurrentLiabilities;
        }  
        console.log("in loop: " + ratioResult);
      } else {
        console.log(`The company is not found!`);
      }
    });
    return ratioResult;
};

function init() {
  const ticker = "AAPL";
  const currentRatio = calculateRatio(ticker, "Current Ratio");
  console.log("after call: " + currentRatio);
}

init();