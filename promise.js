
let allData = [];
let worldStats = [];
let canvas = document.querySelector('#chart');
let countryList = [];

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
    
    createChart('world','pie');
 
   })
}




async function dataFromApi(){
   
       
        let response = await fetch('//api.covid19api.com/summary');
        let data = await response.json();
         worldStats = data.Global;
        allData = data.Countries;
       console.log(allData);
       

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
        createChart(input,'bar');
    
   
 
    
}

function getByInput(userCountry){

    temp = allData.filter(each => each.Country.toLowerCase() == userCountry.toLowerCase())
    if(temp.length == 0){
        alert("OOPS NOT FOUND!");
        return;
    }
    
    return temp;
    
}












function createChart(input, type){
   //canvas.remove();
   let container = document.querySelector('.container');
   container.innerHTML = `
           
   <canvas class="chart-container" style="position: relative; height:60vh; width:80vw" id="chart"></canvas>
   <div class="form-group">
   <label for="exampleFormControlSelect2">Select your Country</label>
   <select id = "options" class="form-control form-control-md">
  
</select>
<button class="btn btn-primary btn-small" onclick="search()" >Search</button>
  
 </div>


   `;

              
   let options = document.getElementById('options');
   for(let i = 0; i < allData.length; i++){
 
       
       let option = document.createElement('option');
       let text = document.createTextNode(allData[i].Country);
        option.appendChild(text);
        options.appendChild(option);
   }

   console.log(options.value);
  
   
   var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
type: type,
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
        text : `COVID 19 TRACKING ${input.toUpperCase()}`,
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
   // let input = document.querySelector('#country');
    let options = document.getElementById('options');
   let input = options.value;
  
    let userCountry = input;

    show_user_area(userCountry);
    
}