var col;
var br;
var sem;
function college(event){
    col=event.target.value
}
function branch(event){
    br=event.target.value;
}
function semester(event){
    sem=event.target.value;
}
var b=document.querySelector("#bt");
b.style.display="none";
if(col && br && sem){
    b.style.display="block";
}
b.addEventListener("click",_=>{
    fetch(``)
})