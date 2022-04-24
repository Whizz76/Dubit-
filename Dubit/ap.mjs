import fetch from 'node-fetch';
fetch("https://api.wazirx.com/api/v2/tickers").then((response)=>response.json()).then((result)=>{
  const res=Object.fromEntries(Object.entries(result).slice(0,11));
  console.log(res);
}).catch(err=>console.error(err));
const express=require('express');
const app=express();
app.listen(7800,()=>{
    console.log("Server listening to 7800");
})