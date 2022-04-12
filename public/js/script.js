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
  console.log("after call: " + ratioResult[0].symbol);
}

init();

var ratioVal = 0;
var ratioData1 = [];
var ratioData2 = [];
var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');
let data1 = [];

function changeSelect() {
  if (document.getElementById("ratioChoice").value == "1") {
 
      document.getElementById("ratioText").innerHTML = "The current ratio is a liquidity ratio that measures a companys ability to pay short-term obligations or those due within one year. It tells investors and analysts how a company can maximize the current assets on its balance sheet to satisfy its current debt and other payables. A current ratio that is in line with the industry average or slightly higher is generally considered acceptable. A current ratio that is lower than the industry average may indicate a higher risk of distress or default. Similarly, if a company has a very high current ratio compared with its peer group, it indicates that management may not be using its assets efficiently.";
      

      
  } else if (document.getElementById("ratioChoice").value == "2") {

      document.getElementById("ratioText").innerHTML = "Working capital, also known as net working capital (NWC), is the difference between a company’s current assets—such as cash, accounts receivable/customers’ unpaid bills, and inventories of raw materials and finished goods—and its current liabilities, such as accounts payable and debts. NWC is a measure of a company’s liquidity, operational efficiency, and short-term financial health. If a company has substantial positive NWC, then it should have the potential to invest and grow. If a company’s current assets do not exceed its current liabilities, then it may have trouble growing or paying back creditors. It might even go bankrupt.";
  }
    
    else if (document.getElementById("ratioChoice").value == "3") {
      
      document.getElementById("ratioText").innerHTML = "The quick ratio is an indicator of a company’s short-term liquidity position and measures a company’s ability to meet its short-term obligations with its most liquid assets. Since it indicates the company’s ability to instantly use its near-cash assets (assets that can be converted quickly to cash) to pay down its current liabilities, it is also called the acid test ratio. An acid test is a slang term for a quick test designed to produce instant results.";

  }
  
}


// if(ratioVal == 1){
//   for (let i = 0; i < 5; i++) {
//     ratioData1.push(ratioResult[i].currentRatio);
//     console.log(ratioData1);
    
//   }
// }
// else if(ratioVal == 2){
//   for (let i = 0; i < 5; i++) {
//     ratioData1.push(ratioResult[i].workingCapital);
//     console.log(ratioData1);
// }
// }

// else if(ratioVal == 3){
//   for (let i = 0; i < 5; i++) {
//     ratioData1.push(ratioResult[i].quickRatio);
//     console.log(ratioData1);
// }
// }



function changeVal(){


if (document.getElementById("ratioChoice").value == "1"){


  for (let i = 0; i < 5; i++) {
    
    ratioData2.push(ratioResult[i].currentRatio);
  
  }

  console.log(ratioData2);

}
else if(document.getElementById("ratioChoice").value == "2"){


  for (let i = 0; i < 5; i++) {
   
    ratioData2.push(ratioResult[i].workingCapital);

}

console.log(ratioData2);

}

else if(document.getElementById("ratioChoice").value == "3"){

  for (let i = 0; i < 5; i++) {
    
    ratioData2.push(ratioResult[i].quickRatio);

}

console.log(ratioData2);

}


}


console.log(toString(ratioData2));



// Global Options:
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

var data = {

  labels: [2017, 2018, 2019, 2020, 2021],

  datasets: [{

      label: 'APPL',

      fill: false,

      lineTension: 0.1,

      backgroundColor: "red",

      borderColor: "red", // The main line color

      borderCapStyle: 'butt',

      borderDash: [5, 15], 

      borderDashOffset: 0.0,

      pointBorderColor: "black",

      pointBackgroundColor: "white",

      pointBorderWidth: 1,

      pointHoverRadius: 8,

      pointHoverBackgroundColor: "red",

      pointHoverBorderColor: "black",

      pointHoverBorderWidth: 2,

      pointRadius: 4,

      pointHitRadius: 10,

      data: ratioData2,

      spanGaps: true,

    }, {

      label: ratioResult[0].symbol,

      fill: false,

      lineTension: 0.1,

      backgroundColor: "blue",

      borderColor: "blue",

      borderCapStyle: 'butt',

      borderDash: [],

      borderDashOffset: 0.0,

      pointBorderColor: "black",

      pointBackgroundColor: "white",

      pointBorderWidth: 1,

      pointHoverRadius: 8,

      pointHoverBackgroundColor: "blue",

      pointHoverBorderColor: "black",

      pointHoverBorderWidth: 2,

      pointRadius: 4,

      pointHitRadius: 10,

      data: ratioData2,

      spanGaps: true,
    }

  ]
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


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}