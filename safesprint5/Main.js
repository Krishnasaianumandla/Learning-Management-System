//give the cliked student name and redirects to the progress.html page
function progress(args){
    // console.log(args)
localStorage.setItem("selectedStudent",args);
location.href="./progress.html";
}
//feteches data from the json file
async function Fetch(){
    const data = await fetch("./student-progress.json");
    const students = await data.json();
    return students;
}

// console.log(firstRow);
function loadStudentDetails(){
Fetch().then(res=>{
    // console.log(res);
    for (const key in res) {    //higherorder forloop
        // console.log(res[key])
       let temp = res[key];
       for(let i=0; i<temp.length; i++){
           if(temp[i].name === localStorage.getItem("selectedStudent")){
               chartData(temp[i]);
               CardDisplay(temp[i]);
            //    courseDisplay(temp[i]);
            //    softskillsFunction(temp[i])
               SoftSkillsProgress(temp[i])
              

           }
       }
    }

})
}

//graphs code snipet this function is used to display technical graph
function chartData(obj ){
    // console.log(obj.softskillsMarks)
    var mychart = document.getElementById('myChart').getContext('2d');
    let labels = obj.Technical;
    let data = obj.marks;
    console.log(data)
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
//used to display softskills graph
function SoftSkillsProgress(obj){
    console.log(obj)
    var mychart = document.getElementById('smyChart').getContext('2d');
    let labels = obj.Softskills;
    let data = obj.softskillsMarks;
    console.log(labels, data)
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
let bar = document.querySelector('.sbar');
let doughnut = document.querySelector('.sdougnut');

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



/*
 */
