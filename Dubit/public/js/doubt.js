var q;
var i;
function ques(event){
    q=event.target.innerHTML;
    q=q.split(' ').join('');
    fetch('/questions/:q',{
        method:"get",
        headers:{"content-type":"application/json"}
    })
}
