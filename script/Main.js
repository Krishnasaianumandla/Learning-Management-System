//give the cliked student name and redirects to the progress.html page

function progress(args){
// console.log(args.split(",")[0])
localStorage.setItem("selectedStudent",args);
location.href="./progress.html";
}
// console.log(localStorage.getItem("selectedStudent").split(",")[1])
const name = localStorage.getItem("selectedStudent").split(",")[0]
const tag = localStorage.getItem("selectedStudent").split(",")[1].trim()
// console.log(name)
// console.log(tag)

//feteches data from the json file
//fetcehs the studetns without any glitches
async function Fetch(){
    const data = await fetch("./main.json"); //status
    // console.log(data);
    const students = await data.json();
    // console.log(students);
    return students;
}

//loads the studetns without any glitches
function loadStudentDetails(){
Fetch().then(res=>{
    for (const key in res) {    //higherorder forloop
       let temp = res[key];
       if(temp.name === name){
               chartData(temp);
               CardDisplay(temp);
           } 
    }
})
}

//graphs code snipet this function is used to display technical graph
//working perfecly without problems
function chartData(obj ){
    // console.log(obj.softskillsMarks)
    var mychart = document.getElementById('myChart').getContext('2d');
    let labels = obj.TechnicalLabels;
    let data = obj.TechnicalMarks;
    var result = new Chart(mychart,{
    type:'line',
    data:{
        labels,
        datasets:[{
            label:"Student's progress",
            data,
            backgroundColor:[
            '#233142',
            '#f95959',
            '#8ed2c9',
            '#ff894c',
            '#ff5722',
            '#363636',
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
                   <img class="card-img-top" src="${obj.Image}" alt="Card image cap">
                   <div class="card-body">
                     <p class="card-text"><strong>Name:</strong>${obj.name}</p>
                     <p class="card-text"><strong>Course/TAG:</strong> ${obj.Tag}</p>
                     <p class="card-text"><strong>Email:</strong> ${obj.Email}</p>                  
               `
}

//selecting constants from the document
const ThreeLeveltechnicalBoxEl = document.querySelector('#ThreeLevelTechnicalBox');
const ThreeLevelSoftskillsBoxEl = document.querySelector('#ThreeLevelSoftskillsBox');

//TECHNICAL
//TRYING TO RENDER ALL THE STATIC LEARNERS PATH IN THE PAGE OF THE RESPECTIVE USER
let loadCharacters = $.getJSON({ url: "./learningpath.json", async: false, });
loadCharacters = JSON.parse(loadCharacters.responseText);
let dataArray = loadCharacters[0][tag]
 
for(let i=0; i<dataArray.length; i++){
ThreeLeveltechnicalBoxEl.innerHTML+= `<h4 data-bs-toggle="modal" data-bs-target="#exampleModal" id="heading">${dataArray[i]}</h4>`
}


 //SOFTSKILLS
 //THIS IS USED FOR ITERATING SOFTKILLS CONTENT ON THE WEBSITE
 const skeys = Object.keys(loadCharacters[1])
 for(let i=0; i<skeys.length; i++){
    ThreeLevelSoftskillsBoxEl.innerHTML+=` <h4 data-bs-toggle="modal" data-bs-target="#exampleModal" id="sheading">${skeys[i]}</h4>`
 }

//DRY RULE IS VOILATING
//THIS IS SELECTEING THE H4 TAGS AND CAPTURING THE CLICK EVENTS AND BRINGING THE TEXTCONTENT FROM THE H4 TAGS
 const heading = document.querySelectorAll('#heading');
 for(let i=0; i<heading.length; i++){
     heading[i].addEventListener('click',()=>{
         console.log(heading[i].textContent);
        level2(heading[i].textContent)
     })
 }
 
 //CAPTURING THE CLICK EVENTS ON THE H4 TAG AND EXTRACTING THE TEXT FROM THE H4
 const sheading = document.querySelectorAll('#sheading');

 for(let i=0; i<sheading.length; i++){
     sheading[i].addEventListener('click',()=>{
        const userclick = sheading[i].textContent;
     })
 }

//helping functions for the project 
let coursesData= $.getJSON({url:'./courses.json', async:false});
coursesData = JSON.parse(coursesData.responseText);
function level2(args){
//loading courses.json file using jquery
for(let i=0; i<coursesData.length;i++){
    // console.log(coursesData[i]["courseName"])
    if(coursesData[i]["courseName"] === args){
        console.log(true)
        ThreeLeveltechnicalBoxEl.innerHTML+= `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${coursesData[i]["courseName"]}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                ${level2innerdata(coursesData[i]["modules"])}
                  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                       <ol>
                           <li>What is Java <i class="bi bi-dot" id="dot"></i></li>
                           <li>Advantages <span><i class="bi bi-dot" id="dot"></i></span></li>
                           <li>Disadvantages <span><i class="bi bi-dot" id="dot"></i></span></li>
                           <li>syntax <span><i class="bi bi-dot" id="dot"></i></span></li>
                           <li>jdk <span><i class="bi bi-dot" id="dot"></i></span></li>
                           <li>compiling process <span><i class="bi bi-dot" id="dot"></i></span></li>
                       </ol>
                    </div>
                  </div>
                </div>
                </div>
            `
            console.log(coursesData[i])
    }
}

}

function level2innerdata(args){
    for(let i=0; i<args.length; i++){
        ThreeLeveltechnicalBoxEl.innerHTML+=`
        <div class="modal-body">
            <div class="accordion accordion-flush" id="accordionFlushExample">          
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      ${args[i]}
                    </button>
                  </h2>`
    }
}

