
var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');

// Global Options:
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

var data = {

  labels: [2017, 2018, 2019, 2020, 2021],

  datasets: [{

      label: "Business 1",

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

      data: [65, 59, 80, 81, 56],

      spanGaps: true,

    }, {

      label: "Business 2",

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

      data: [10, 20, 60, 95, 64],

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