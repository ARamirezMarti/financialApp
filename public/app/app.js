'use strict'
$(document).ready(function () {
    console.log("JQ Working")
    const sum =$("#sumBtn")
    const inc =$("#incBtn")
    const exp =$("#expBtn")
    
    inc.click(function (e) { 
        e.preventDefault();
        var incDiv= document.getElementById("incDiv");
        if(incDiv.style.display=="none"){
            incDiv.style.display="inline"
            s
        }else{
            incDiv.style.display="none"
        }
    });
      
    exp.click(function (e) { 
        e.preventDefault();
        var expDiv = document.getElementById("expDiv");
        if(expDiv.style.display=="none"){
            expDiv.style.display="inline"
        }else{
            expDiv.style.display="none"
        }
    });







});