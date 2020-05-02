

async function getLocation(callback){
    var lat = null;
    var long = null;
      
    setTimeout(()=>{
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position)=> {
                   lat = position.coords.latitude;
                   long = position.coords.longitude;
                    
                })
            }
        },10000);
    
    setTimeout(()=>{
        callback(lat);
    },20000)
    
}

let arr = [];

let NewDeaths = null;
let TotalRecovered = null;
let TotalConfirmed = null;
let TotalDeaths = null;
let NewRecovered = null;

async function getWhether(){
    let response = await fetch('http://api.covid19api.com/summary')
    let data = await response.json();
    console.log(data.Countries[100]);
    
     arr = data;
     NewDeaths = arr.Countries[100].NewDeaths;
     TotalRecovered =  arr.Countries[100].TotalRecovered;
     TotalConfirmed= data.Countries[100].TotalConfirmed;
     TotalDeaths=  data.Countries[100].TotalDeaths;
     NewRecovered =  data.Countries[100].NewRecovered;
     createChart();

    }


    function createChart(){
        var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['New Deaths', 'Recovered', 'Total Deaths', 'Total Confirmed', 'New Recovered'],
        datasets: [{
            
            data: [NewDeaths, TotalRecovered, TotalDeaths, TotalConfirmed, NewRecovered],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgb(0, 255, 128)',
                '#ff6384',
                '#ffcd56',
                'rgba(153, 102, 255, 0.2)',
              
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
               
            ],
            borderWidth: 1
        }]
    },
    options: {
        title : {
            display : true,
            text : 'COVID 19 TRACKING INDIA',
            fontSize : 25

        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    }



getWhether();