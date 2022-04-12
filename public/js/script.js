var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');

// Global Options:
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;


let datasetArray = [];
let colorArray = ["red", "blue", "black", "green", "purple", "orange", "grey", "yellow", "pink", "navy"];
let myIndex = 0;

let data = {

  labels: [2017, 2018, 2019, 2020, 2021],

  datasets: datasetArray
};

// Notice the scaleLabel at the same level as Ticks
var options = {
  scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                     display: true,
                     labelString: 'Current Ratio',
                     fontSize: 20 
                  }
            }]            
        }  
};

// Chart declaration:
var myBarChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
});

function calculateRatio(symbol) {
  const ticker = symbol;
  // const keyAPI = `17460026230d940ebe74cf92231eb36e`; // nara
  // const keyAPI = `0e0111a172272a2fcfd42016bb1d29cf`; // ethan
  const keyAPI = `2c582395bb4c1edbb8f89db296b46aeb`; // brandon

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
          let workingCapital = data[i].totalCurrentAssets - data[i].totalCurrentLiabilities;
          let currentRatio = data[i].totalCurrentAssets / data[i].totalCurrentLiabilities;
          let quickRatio = (data[i].cashAndCashEquivalents + data[i].netReceivables) / data[i].totalCurrentLiabilities;
          ratioResult.push({
            symbol: symbol, 
            calendarYear: calendarYear, 
            workingCapital: workingCapital, 
            currentRatio: currentRatio, 
            quickRatio: quickRatio})
        }  
        console.log(ratioResult);
        ratioChoice = "Current Ratio";
        let businessData = [];
        switch (ratioChoice) {
          case "Current Ratio":{
            for (let i = 0; i < ratioResult.length; i++) {
              const element = ratioResult[i].currentRatio;
              businessData.push(element);
            }
            // console.log(businessData);
            break;
          }
          default:
            break;
        }    
        // Collecting chart dataset
        datasetArray.push({
          label: ticker,
          fill: false,
          lineTension: 0.1,
          backgroundColor: colorArray[myIndex],
          borderColor: colorArray[myIndex],
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          pointBorderColor: "black",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: colorArray[myIndex],
          pointHoverBorderColor: "black",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: businessData,
          spanGaps: true,
        });
        console.log(datasetArray);
        myIndex++;
      } else {
        console.log(`The company: ${ticker} is not found!`);
      }
    });
    return;
};

function createDataset() {
  let portfolioArray = ["AAPL", "AMZN", "GOOG"];
  myIndex = 0;
  for (let i = 0; i < portfolioArray.length; i++) {
    const company = portfolioArray[i];
    calculateRatio(company);
  }  
}

function init(){

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
