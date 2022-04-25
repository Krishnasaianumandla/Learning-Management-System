 //selecting all the dom items from document
 const searchfield = document.querySelector('#search');
 const filtersearch=document.querySelector('#filter');


 

 //feteches data from the json file.... and returns a promise using .then to read the promise
export  async function fetchdata(){
     const search = await fetch('./json/data.json');
     const data = await search.json();
     return data;
     
 }
 //displaying the contents to the dispaly (not filtering... static display)
 function display(){
     fetchdata().then(response=>{
    displayData(response)
          })
     }


 async function filtering(searchvalue){ 
     //when the searchfeild is empty we render all the cards from json file
     if(searchvalue.length === 0){
         display();
     }
     const search = await fetch('./json/data.json');
     const data = await search.json();
    let matches = data.filter(matchdata=>{
         const regx= new RegExp(`${searchvalue}`,'gi');
         return  matchdata.bio.match(regx);
     })
     displayData(matches);
     
 };

 async function searchBar(searchvalue){
      //when the searchfeild is empty we render all the cards from json file
      if(searchvalue.length === 0){
         display();
     }
     const search = await fetch('./json/data.json');
     const data = await search.json();
    let matches = data.filter(matchdata=>{
         const regx= new RegExp(`${searchvalue}`,'gi');
         return  matchdata.name.match(regx);
     })
     displayData(matches);
 }
     // helping funciton
   export  function displayData(args){
     let card = document.getElementById('students');
     card.innerHTML=''    
     for(let i=0; i<args.length; i++){         
         card.innerHTML+=`
         <div class="box" >
                <div class="imgbox">
                 <img src="${args[i].image}" alt="Card image cap">
                </div>
                <div class="card-body" >
                  <h4 class="card-text">${args[i].name}</h4>
                  <h6 class="card-text">${args[i].email}</h6>
                  <h6 class="card-text"> ${args[i].bio}</h6>
                  <a href="learners_progress_page.html" target="_blank" onclick="progress('${args[i].name}')" type="button" class="btn btn-primary">View details</a>              
                </div>
         </div>`
     }
    }

 searchfield.addEventListener('input',()=>{
     console.log(searchfield);
     searchBar(searchfield.value);
 }); 
 filtersearch.addEventListener('click',()=>{
     filtering(filtersearch.value);
 });
