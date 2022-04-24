var sub;
let c=document.querySelector("#c").innerHTML;
let s=document.querySelector("#s").innerHTML;
let b=document.querySelector("#b").innerHTML;
function doubt(event){
    sub=event.target.innerHtml;
    fetch(`/doubt?college=${c}&branch=${b}&semester=${s}&subject=${sub}`,{
        method:"get",
        headers:{"content-type":"application/json"}
    })
    
}

