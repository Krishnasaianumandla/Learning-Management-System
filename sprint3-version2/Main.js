function progress(args){
    console.log(args)
localStorage.setItem("selectedStudent",args);
location.href="./progress.html";
}

async function Fetch(){
    const data = await fetch("./student-progress.json");
    const students = await data.json();
    return students;
}

// console.log(firstRow);
function loadStudentDetails(){
Fetch().then(res=>{
    // console.log(res);
    for (const key in res) {
       let temp = res[key];
       for(let i=0; i<temp.length; i++){
           if(temp[i].name === localStorage.getItem("selectedStudent")){
               chartData(temp[i]);
               CardDisplay(temp[i]);
               technical(temp[i]);
               softskillsFunction(temp[i])
              

           }
       }
    }

})
}

//graphs code snipet
function chartData(obj){
    console.log(obj.Technical)
    var mychart = document.getElementById('myChart').getContext('2d');
    const labels = obj.Technical;
    const data = obj.marks;
    var result = new Chart(mychart,{
    type:'line',
    data:{
        labels,
        datasets:[{
            label:"Student's progress",
            data,
            backgroundColor:[
            'rgba(225,99,132,0.2)',
        ],
            //borderColor:['white'], //used for bordercolor
            pointBackgroundColor:"#33539e",
            
            }],
    
    }
    });
    let bar = document.querySelector('.bar');
let doughnut = document.querySelector('.dougnut');
bar.addEventListener('click',()=>{
const updatedGrapgh = "bar";
result.config.type=updatedGrapgh;
result.update();
});
doughnut.addEventListener('click',()=>{
const updatedGrapgh = "doughnut";
result.config.type=updatedGrapgh;
result.update();
})
}

//this code snippet used to display the person details in card formate
let firstRow = document.querySelector('#firstrow');
function CardDisplay(obj){
firstRow.innerHTML= `
               
               <div class="card" style="width: 18rem;">
                   <img class="card-img-top" src="${obj.image}" alt="Card image cap">
                   <div class="card-body">
                     <p class="card-text"><strong>Name:</strong>${obj.name}</p>
                     <p class="card-text"><strong>Course/TAG:</strong> ${obj.Tag}</p>
                     <p class="card-text"><strong>Email:</strong> ${obj.Eamil}</p>                  
                   
               `

}
//used to display the technical enrolled courses
const Technical = document.querySelector('#Technical')
function technical(obj){
    for(let i=0; i<obj.Technical.length;i++ ){
       Technical.innerHTML+= `
       <div class="col-sm-3 pt-4" >
        <div class="card border-success mb-3" style="max-width: 18rem; height:13rem; overflow:scroll;">
            <div class="card-header"><strong>${obj.Technical[i]}</strong></div>
            <div class="card-body text-primary">
              <h5 class="card-title">Remarks</h5>
              <p class="card-text">${obj.Remarks[i]}</p>
              <!-- <p class="card-text"><Strong>Didn't met DRY rule</Strong></p> -->
            </div>
          </div>
          </div>`
    }
}

//used to display the softskills enrolled courses
let softSkills = document.querySelector('#softskills');
function softskillsFunction(obj){
    console.log(obj.Softskills)
for(let i=0; i<obj.softskillsRemarks.length; i++){
softSkills.innerHTML+=`
<div class="col-sm-3 pt-4" >
<div class="card border-success mb-3" style="max-width: 18rem; height:13rem; overflow:scroll;">
<div class="card-header"><strong>${obj.Softskills[i]}t</strong></div>
<div class="card-body text-primary">
  <h5 class="card-title">Remarks</h5>
  <p class="card-text"> ${obj.softskillsRemarks[i]}</p>
  </div>
</div>
</div>
`
}
}
