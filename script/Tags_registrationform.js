const tagContainer = document.querySelector('.tag-con2');
const input = document.querySelector('.tag-con2 input');

let tags = [];

function createTag(label) {
const div = document.createElement('div');
div.setAttribute('class', 'tag');
const span = document.createElement('span');
span.innerHTML = label;
const closeIcon = document.createElement('i');
closeIcon.innerHTML = 'close';
closeIcon.setAttribute('class', 'material-icons');
closeIcon.setAttribute('data-item', label);
div.appendChild(span);
div.appendChild(closeIcon);
return div;
}

function clearTags() {
document.querySelectorAll('.tag').forEach(tag => {
tag.parentElement.removeChild(tag);
});
}

function addTags() {
clearTags();
tags.slice().reverse().forEach(tag => {
tagContainer.prepend(createTag(tag));
});
}

input.addEventListener('keyup', (e) => {
if (e.key === 'Enter') {
e.target.value.split(',').forEach(tag => {
tags.push(tag);
});

addTags();
input.value = '';
}
});
document.addEventListener('click', (e) => {
console.log(e.target.tagName);
if (e.target.tagName === 'I') {
const tagLabel = e.target.getAttribute('data-item');
const index = tags.indexOf(tagLabel);
tags = [...tags.slice(0, index), ...tags.slice(index+1)];
addTags();
}
})

input.focus();


function add_more_field(){
   
    html='<div class="row"  id="remove">\
    <div class="col-sm-6 ">\
        <label for="Position"><span style="font-family: "Gill Sans";">Position</span></label>\
        <input type="text1" name="position1" id="position" class="form-control">\
    </div>\
    <div class="col-sm-6 ">\
        <label for="Organization"><span style="font-family: "Gill Sans";">Organization</span></label>\
        <input type="text1" name="organization1"   id="Organization" class="form-control">\
    </div>\
    <div class="col-sm-6 py-3">\
        <label for="From"><span style="font-family: "Gill Sans";">From:</span></label>\
        <input type="date" name="from1" id="From" class="form-control">\
    </div><div class="col-sm-6 py-3">\
        <label for="From"><span style="font-family:"Gill Sans";">To:</span> </label>\
        <input type="date" name="to1" id="To" class="form-control">\
    </div>\
</div>'

var form = document.getElementById("form3")
form.innerHTML+=html;

}
function remove_field(){

    document.getElementById("remove").remove();
    
}



