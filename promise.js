
let allData = [];
let worldStats = [];

let NewDeaths = null;
let TotalRecovered = null;
let TotalConfirmed = null;
let TotalDeaths = null;
let NewRecovered = null;

function world(){
   dataFromApi().then(()=>{
         console.log(worldStats);
         
           
    NewDeaths = worldStats.NewDeaths;
    TotalRecovered = worldStats.TotalRecovered;
    TotalConfirmed= worldStats.TotalConfirmed;
    TotalDeaths=  worldStats.TotalDeaths;
    NewRecovered =  worldStats.NewRecovered;
 
       var ctx = document.getElementById('chart').getContext('2d');
       var myChart = new Chart(ctx, {
   type: 'pie',
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
           text : 'COVID 19 TRACKING WORLDWIDE',
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
   })
}

async function dataFromApi(){
   
       
        let response = await fetch('//api.covid19api.com/summary');
        let data = await response.json();
         worldStats = data.Global;
        allData = data.Countries;
       

    }

function show_user_area(input) {
      
        
    // var chart = document.getElementById('chart').getContext('2d');
    //  chart.clear();
     
       
        let userCountry = getByInput(input);
        
        
        NewDeaths = userCountry.NewDeaths;
        TotalRecovered =  userCountry[0].TotalRecovered;
        TotalConfirmed= userCountry[0].TotalConfirmed;
        TotalDeaths=  userCountry[0].TotalDeaths;
        NewRecovered =  userCountry[0].NewRecovered;
        createChart(input);
    
   
 
    
}

function getByInput(userCountry){

    temp = allData.filter(each => each.Country.toLowerCase() == userCountry.toLowerCase())
    if(temp.length == 0){
        alert("OOPS NOT FOUND!");
        return;
    }
    
    return temp;
    
}












function createChart(input){
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
        text : `COVID 19 TRACKING ${input}`,
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

function search(){
    let input = document.querySelector('#country');
    let userCountry = input.value; 

    show_user_area(userCountry);
    
}