var n;
var b=document.querySelector("#display");
var t=document.querySelector("#changed");
b.style.display="none";
function change(event){
    n=event.target.value;
    fetch(`/check/${n}`,{
        method:"get",
        headers:{"content-type":"application/json"}
    }).then(res=>res.json()).then((result)=>{
        if(!result){
            t.innerHTML="Valid name";
            t.style.color="green";
            b.style.display="block"
        }
        else{
            t.innerHTML="Name already taken";
            t.style.color="red";
            b.style.display="none" 
        }
    })

}
b.addEventListener("click",_=>{
    fetch("/add",{
        method:"post",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            name:n
        })
    })

})