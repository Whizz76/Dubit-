var n=document.getElementById("lo");
var str;
function add(event){
    
    str=event.target.value;
    
}
let bt=document.getElementById("sub");
function check(){
    if(str!=null){
        
            fetch(`/login/${str}`,{
                method:"get",
                headers:{"content-type":"application/json"}
            })
        
    
    }

}

