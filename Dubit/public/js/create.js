var c=document.querySelector("#create");
c.addEventListener("click",_=>{
    fetch('/create-account',{
        method:"get",
        headers:{"content-type":"application/json"}
    })
});