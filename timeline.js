let global = [];

async function getTimeLine(){
    let response = await fetch('https://pomber.github.io/covid19/timeseries.json');
    let data = await response.json();
    global = data;
    console.log(data);
     createOptions();
    
}

function createOptions(){
    let options = document.getElementById('options');
    let keys = Object.keys(global);
    for(let i = 0; i < keys.length; i++){
       let option = document.createElement('option');
       let text = document.createTextNode(keys[i]);
        option.appendChild(text);
        options.appendChild(option);
    }

    createChart('India');
    
}




function createChart(input){
   let currentCountryData = global.India;
   let confirmed = [];
   let dates = [];
   currentCountryData.forEach((d)=>{
        dates.push(new Date(d.date).getDay());
       confirmed.push(d.confirmed);
       
   })

lastTenDaysDate = dates.slice(dates.length-7,dates.length);
lastTenDaysConfirmed = confirmed.slice(confirmed.length-7,confirmed.length);
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   
for(let i = 0; i < days.length; i++){
    lastTenDaysDate[i] = days[lastTenDaysDate[i]];
}
   
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

              

 
   
   var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
type: 'line',
data: {
    labels: lastTenDaysDate,
    datasets: [{
        
        data: lastTenDaysConfirmed,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
           
          //  '#ff6384',
            //'#ffcd56',
           // 'rgba(153, 102, 255, 0.2)',
          
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
           
        ],
        borderWidth: 2
    }]
},
options: {
    title : {
        display : true,
        text : `This Week Confirmed Cases Of ${input.toUpperCase()}`,
        fontSize : 25

    },
    
}
});
}


