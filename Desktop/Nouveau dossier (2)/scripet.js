let name =document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let button = document.getElementById("butt")
let tote =document.getElementById("tote")
let jens = document.getElementById("jens")
let 
button.onclick = function(){
    if(name.value.length >0 && email.value.length > 0 && password.value.length>=8){
        if (jens.value=="man"){
            tote.innerText="ms wolcam"
        }
        else {
            tote.innerText="madam wolcam"
        }
        if()
    }
    else{
        tote.innerText="good laprochan foi"
    }

}

