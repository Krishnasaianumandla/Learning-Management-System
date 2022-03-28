function progress(args){
    localStorage.setItem("selectedStudent",args);
    location.href="../learners_progress_page.html";
}

const name = localStorage.getItem("selectedStudent").split(",")[0];
// const tag = localStorage.getItem("selectedStudent").split(",")[1].trim();

document.addEventListener('DOMContentLoaded',()=>{
    // console.log('hi');
    async function Fetch(){
        const data = await fetch("../json/data.json");
        const students = await data.json();
        // console.log('this is Course');
        return students;
    }
    async function fetchCourse(){
        // console.log('entry to fetchCourse');
        const data1= await fetch("../json/courses.json");
        const courses= await data1.json();
        // console.log('this is fetchCourse',courses);
        return courses;
    
    }
    fetchCourse().then(course=>{
        var i=0; 
        for(const key in course){          
            i+=1;
            // console.log(i,'--------');
            // console.log('this is fetchCourse function',course);
            document.querySelector('#ThreeLevelTechnicalBox').innerHTML+=`
            <h4 data-bs-toggle="modal" data-bs-target="#exampleModal">${course[key].courseName}</h4>`;
            
            // console.log(document.querySelector('#ThreeLevelTechnicalBox').innerHTML);
        }
    });

    Fetch().then(res=>{
        for (const key in res) { 
                if(res[key].name === localStorage.getItem("selectedStudent")){
                    document.querySelector('#studentImage').innerHTML=`<img class="rounded-circle ms-4 me-2"
                style="width:60px;height:60px;" src="${res[key].image}">`;
                    document.querySelector('#studentName').innerHTML+=res[key].name+'\'s progress';
                    chartData(res[key]);
                    chartData2(res[key]);

            }
        }   
    });
    
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
        let bar2 = document.querySelector('.bar2');
        line2.addEventListener('click',()=>{
            result2.config.type="line";
            result2.update();
            });
        bar2.addEventListener('click',()=>{
        result2.config.type="bar";
        result2.update();
        });
        doughnut2.addEventListener('click',()=>{
        result2.config.type="doughnut";
        result2.update();
        });
    }
});

let learningpath = $.getJSON({ url: "../json/courses.json", async: false, });
learningpath = JSON.parse(learningpath.responseText);
console.log(learningpath);
// let dataArray = loadCharacters[0];

document.addEventListener('click',selected=>{
    let course=selected.target.textContent;
    document.querySelector('#exampleModalLabel').innerHTML=`${course}`;
    // console.log(learningpath);
    var i=0; 
        for(const key in learningpath){ 
            if(learningpath[key].courseName===course){                    
            accordion=document.querySelector('#accordionFlushExample');
            accordion.innerHTML=``;
            for(const c in learningpath[key].modules){
                i+=1;
                const module=learningpath[key]['modules'][c];
                console.log(module);
                accordion.innerHTML+=`
    <div class="accordion-item">
    <h2 class="accordion-header" id="flush-heading${i}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
            <i>${learningpath[key]['modules'][c]}<i class="bi bi-check-circle"></i></i>
      </button>
    </h2>
    <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
         <ol id="flush-collapse-ol${i}">
         </ol>
      </div>
    </div>
  </div>`;
                for(const task in learningpath[key].tasks[module]){
                    const v ='flush-collapse-ol'+i;
                    console.log(v);
                    console.log(learningpath[key].tasks[module][task],'==task==');
                    listElement=document.getElementById(v);
                    // listElement.innerHTML=``;
                    listElement.innerHTML+=`
                    <li style="padding:7px">${learningpath[key].tasks[module][task]}</li>
                    `;
                }
}
        }
    }
});



const ThreeLeveltechnicalBoxEl = document.querySelector('#ThreeLevelTechnicalBox');
const ThreeLevelSoftskillsBoxEl = document.querySelector('#ThreeLevelSoftskillsBox');


