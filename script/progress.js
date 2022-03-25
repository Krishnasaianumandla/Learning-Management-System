function progress(args){
    localStorage.setItem("selectedStudent",args);
    location.href="../learners_progress_page.html";
}

async function Fetch(){
    const data = await fetch("../json/data.json");
    const students = await data.json();
    return students;
}

function loadStudentDetails(){
    Fetch().then(res=>{
        for (const key in res) { 
               if(res[key].name === localStorage.getItem("selectedStudent")){
                   document.querySelector('#studentImage').innerHTML=`<img class="rounded-circle ms-4 me-2"
               style="width:60px;height:60px;" src="${res[key].image}">`;
                   document.querySelector('#studentName').innerHTML+=res[key].name+'\'s progress';
                   chartData(res[key]);
                   chartData2(res[key]);
                   CardDisplay(res[key]);
           }
        }   
    })
    }

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
            pointBackgroundColor:"#33539e",           
            }],                                
         }
     });
    let line = document.querySelector('.line');
    let doughnut = document.querySelector('.dougnut');
    let bar = document.querySelector('.bar');
    line.addEventListener('click',()=>{
    result.config.type="line";
    result.update();
    });
    bar.addEventListener('click',()=>{
        result.config.type="bar";
        result.update();
        });
    doughnut.addEventListener('click',()=>{
    result.config.type="doughnut";
    result.update();
    });
}

function chartData2(obj){
    var mychart2 = document.getElementById('myChart2').getContext('2d');
    const labels = obj.Softskills;
    const data = obj.softskillsMarks;
    let result2 = new Chart(mychart2,{
    type:'bar',
    data:{
        labels,
        datasets:[{
            label:"Student's progress",
            data,
            backgroundColor:["#58508d","#ff6361","#bc5090"
              ],
            pointBackgroundColor:"#33539e",           
            }],                                
         }
     });
    let line2 = document.querySelector('.line2');
    let doughnut2 = document.querySelector('.dougnut2');
    console.log(line2,'-------',doughnut2)
    line2.addEventListener('click',()=>{
    result2.config.type="line";
    result2.update();
    });
    doughnut2.addEventListener('click',()=>{
    result2.config.type="doughnut";
    result2.update();
    })
}

const stu = document.querySelector('#firstrow');
console.log(stu,"=======");
function CardDisplay(obj){
    console.log(obj);
stu.innerHTML+= `            
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

