function progress(args){
console.log(args)
localStorage.setItem("selectedStudent",args);
location.href="../learners_progress_page.html";
}

async function Fetch(){
    const data = await fetch("../json/data.json");
    const students = await data.json();
    return students;
}

// console.log(firstRow);
function loadStudentDetails(){
Fetch().then(res=>{
       for(let i=0; i<res.length; i++){
           if(res[i].name === localStorage.getItem("selectedStudent")){
               chartData(res[i]);
               CardDisplay(res[i]);
               table(res[i]);             
           }
       }
})
}

//graphs code snipet
function chartData(obj){
    var mychart = document.getElementById('myChart').getContext('2d');
    const labels = obj.Technical;
    const data = obj.marks;
    var result = new Chart(mychart,{
    type:'bar',
    data:{
        labels,
        datasets:[{
            label:"Student's progress",
            data,
            backgroundColor:["#58508d","#ff6361","#bc5090"
        ],
            //borderColor:['white'], //used for bordercolor
            pointBackgroundColor:"#33539e",
            
            }],
    
    }
    });
    let line = document.querySelector('.line');
    let doughnut = document.querySelector('.dougnut');
    line.addEventListener('click',()=>{
    result.config.type="line";
    result.update();
    });
    doughnut.addEventListener('click',()=>{
    result.config.type="doughnut";
    result.update();
    })
}

//this code snippet used to display the person details in card formate
let firstRow = document.querySelector('#firstrow');
function CardDisplay(obj){
firstRow.innerHTML= `            
               <div class="card" style="background-color:black;color:white;width: 15rem;">
                   <img class="img-fluid rounder-start" src="${obj.image}" alt="Card image cap">
                   <div class="card-body" >
                     <p class="card-text"><strong>Name: </strong>${obj.name}</p>
                     <p class="card-text"><strong>TAG: </strong> ${obj.bio}</p>
                     <p class="card-text"><strong>Email: </strong> ${obj.email}</p>                  
                   </div>
                </div>
               `

}
//used to display the technical enrolled courses
const Technical = document.querySelector('#tableDescription')
function table(obj){
    for(let i=0; i<obj.Technical.length;i++ ){
    
          tableDescription.innerHTML+=`
          <tr>
          <td>${obj.Technical[i]}</td>
          <td>${obj.marks[i]}</td>
          <td>${obj.Remarks[i]}</td>
          <td>${obj.status[i]}</td>
          <td>${obj.Remarks[i]}</td>
          </tr>
          `
    }
}


