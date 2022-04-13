// Chart Object
const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

// Document Object
const dropDownMenu = document.querySelector('#ratio-choice');
const resultButton = document.querySelector('#result-button');
const userInfo = document.querySelector('#user-info');

// Global Options:
Chart.defaults.color = 'black';
Chart.defaults.font.size = 16;

// Chart Variables
let datasetArray = [];
let colorArray = ['red', 'blue', 'black', 'green', 'purple', 'orange', 'grey', 'yellow', 'pink', 'navy'];
let myIndex = 0;
let ratioChoice = 1;  // Default: Current Ratio
let ratioText = ['Current Ratio', 'Quick Ratio', 'Working Capital'];

let data = {
  labels: [2017, 2018, 2019, 2020, 2021],
  datasets: datasetArray
};

// Notice the scaleLabel at the same level as Ticks
let options = {
  responsive: true,
  scales: {
    yAxes: {
      ticks: {
        beginAtZero: false
      },
      scaleLabel: {
        display: true,
        labelString: 'Current Ratio',
        fontSize: 20
      }
    }
  }
};

// Chart declaration:
let myChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
});

function calculateRatio(symbol) {
  const ticker = symbol;
  // const keyAPI = `17460026230d940ebe74cf92231eb36e`; // nara
  const keyAPI = `0e0111a172272a2fcfd42016bb1d29cf`; // ethan
  // const keyAPI = '2c582395bb4c1edbb8f89db296b46aeb' // brandon

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
          case "1": { // Current Ratio
            for (let i = 0; i < ratioResult.length; i++) {
              const element = ratioResult[i].currentRatio;
              businessData.push(element);
            }
            break;
          }
          case "2": { // Quick Ratio
            for (let i = 0; i < ratioResult.length; i++) {
              const element = ratioResult[i].quickRatio;
              businessData.push(element);
            }
            break;
          }
          case "3": { // Working Capital
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
  return;
  myChart.update();
};

function createDataset() {
  // datasetArray = [];
  const id = userInfo.getAttribute('data-id');
  let checkChoice = dropDownMenu.value;
  if (checkChoice) {
    ratioChoice = checkChoice;
  }
  console.log(ratioChoice);
  fetch(`/api/portfolios/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.length > 0) {
        myIndex = 0;
        for (let index = 0; index < data.length; index++) {
          let company = data[index].company_symbol;
          calculateRatio(company);
          myChart.update();
        }
      } else {
        console.log(`No data found!`);
      };
      myChart.update();
    });
}

createDataset();
myChart.update();

if (resultButton) {
  resultButton.addEventListener('click', createDataset);
  myChart.update();
}

function changeSelect() {
  const checkChoice = dropDownMenu.value;
  switch (checkChoice) {
    case "1":
      document.getElementById("ratio-text").innerHTML = "The current ratio is a liquidity ratio that measures a companys ability to pay short-term obligations or those due within one year. It tells investors and analysts how a company can maximize the current assets on its balance sheet to satisfy its current debt and other payables. A current ratio that is in line with the industry average or slightly higher is generally considered acceptable. A current ratio that is lower than the industry average may indicate a higher risk of distress or default. Similarly, if a company has a very high current ratio compared with its peer group, it indicates that management may not be using its assets efficiently.";
      break;
    case "2":
      document.getElementById("ratio-text").innerHTML = "The quick ratio is an indicator of a company’s short-term liquidity position and measures a company’s ability to meet its short-term obligations with its most liquid assets. Since it indicates the company’s ability to instantly use its near-cash assets (assets that can be converted quickly to cash) to pay down its current liabilities, it is also called the acid test ratio. An acid test is a slang term for a quick test designed to produce instant results.";
      break;
    case "3":
      document.getElementById("ratio-text").innerHTML = "Working capital, also called net working capital (NWC), represents the difference between a company’s current assets and current liabilities.Positive NWC indicates that a company can fund its current operations and invest in future activities and growth. NWC that is in line with or higher than the industry average for a company of comparable size is generally considered acceptable. Low NWC may indicate a risk of distress or default.";
      break;
    default:
      document.getElementById("ratio-text").innerHTML = "The current ratio is a liquidity ratio that measures a companys ability to pay short-term obligations or those due within one year. It tells investors and analysts how a company can maximize the current assets on its balance sheet to satisfy its current debt and other payables. A current ratio that is in line with the industry average or slightly higher is generally considered acceptable. A current ratio that is lower than the industry average may indicate a higher risk of distress or default. Similarly, if a company has a very high current ratio compared with its peer group, it indicates that management may not be using its assets efficiently.";
      break;
  }
}

