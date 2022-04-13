const canvas = document.getElementById("myChart");
const ctx = canvas.getContext('2d');
const dropDownMenu = document.querySelector('#ratio-choice');
const resultButton = document.querySelector('#result-button');

// Global Options:
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;


let datasetArray = [];
let colorArray = ["red", "blue", "black", "green", "purple", "orange", "grey", "yellow", "pink", "navy"];
let myIndex = 0;
let ratioChoice = "Current Choice";

let data = {

  labels: [2017, 2018, 2019, 2020, 2021],

  datasets: datasetArray
};

// Notice the scaleLabel at the same level as Ticks
let options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
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
let myChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
});

function calculateRatio(symbol, ratioChoice) {
  const ticker = symbol;
  // const keyAPI = `17460026230d940ebe74cf92231eb36e`; // nara
  const keyAPI = `0e0111a172272a2fcfd42016bb1d29cf`; // ethan
  // const keyAPI = `2c582395bb4c1edbb8f89db296b46aeb`; // brandon
  let checkChoice = dropDownMenu.value;
  if (checkChoice) {
    ratioChoice = checkChoice;
  }

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
            quickRatio: quickRatio
          })
        }
        console.log(ratioResult);
        // ratioChoice = "Current Ratio";
        let businessData = [];
        switch (ratioChoice) {
          case "Current Ratio": {
            for (let i = 0; i < ratioResult.length; i++) {
              const element = ratioResult[i].currentRatio;
              businessData.push(element);
            }
            break;
          }
          case "Quick Ratio": {
            for (let i = 0; i < ratioResult.length; i++) {
              const element = ratioResult[i].quickRatio;
              businessData.push(element);
            }
            break;
          }
          case "Working Capital": {
            for (let i = 0; i < ratioResult.length; i++) {
              const element = ratioResult[i].workingCapital;
              businessData.push(element);
            }
            break;
          }
          default: {
            for (let i = 0; i < ratioResult.length; i++) {
              const element = ratioResult[i].currentRatio;
              businessData.push(element);
            }
            break;
          }
          // console.log(businessData);     
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
    let myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
  return;
};

function createDataset() {
  fetch('/api/portfolios')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.length > 0) {
        myIndex = 0;
        for (let index = 0; index < data.length; index++) {
          let company = data[index].company_symbol;
          calculateRatio(company);
        } 
      } else {
          console.log(`No data found!`);
      };
    });
};

if (resultButton) {
  resultButton.addEventListener('click', createDataset);
}
