let form = document.querySelector(".form");



form.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.querySelector("#email").value
    let pass=  document.querySelector("#pass").value
    
   console.log(email,pass)
})
