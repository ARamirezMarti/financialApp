'use strict'
$(document).ready(function () {
    console.log("JQ Working")
    const sum =$("#sumBtn")
    const inc =$("#incBtn")
    const exp =$("#expBtn")
    
    inc.click(function (e) { 
        e.preventDefault();
        var incDiv= document.getElementById("incDiv");
        if(incDiv.style.visibility=="hidden"){
            incDiv.style.visibility="visible"
        }else{
            incDiv.style.visibility="hidden"
        }
    });
      
    exp.click(function (e) { 
        e.preventDefault();
        var expDiv = document.getElementById("expDiv");
        if(expDiv.style.visibility=="hidden"){
            expDiv.style.visibility="visible"
        }else{
            expDiv.style.visibility="hidden"
        }
    });







});