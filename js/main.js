var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')
var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
var passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
var signUpArray = []

if (localStorage.getItem("users")){

    signUpArray = JSON.parse(localStorage.getItem("users"))
}

function signUp(){
if (isEmpty() == false) {
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
    return false
}

var signUp = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
}
if (isEmailExist()== false){
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
 } else if(isEmailValid()== true && isPasswordValid()==true ) {
    signUpArray.push(signUp)
    localStorage.setItem("users",JSON.stringify(signUpArray))
    document.getElementById('exist').innerHTML='<span class="text-success m-3">Success</span>';
    } else if (isEmailValid()== true && isPasswordValid()== false) {
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Try Another Password</span>'
    }
     else if (isEmailValid()== false && isPasswordValid()== true) {
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Try Another Email</span>'
    }
     else if ( isEmailValid()== false && isPasswordValid()== false) {
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Try Again</span>'
    }
    else {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">somthing wrong</span>'
    }
}


function isLoginEmpty(){
    if (signinPassword.value == "" || signinEmail.value == ""){
        return false
    } else {
        return true
    }
}

function check(i){
    if (signUpArray[i].email== signinEmail.value && signUpArray[i].password == signinPassword.value){
        return true
    } else {
        return false
    }
}


function isEmailValid(){
    if (emailRegex.test(signupEmail.value)){
        return true
    } else {
        return false
    }
}
function isPasswordValid(){
    if (passwordRegex.test(signupPassword.value)){
        return true
    } else {
        return false
    }
}








function login(){
    if (isLoginEmpty() == false){
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    for (var i = 0; i < signUpArray.length; i++ ){



        if (check(i)== true){
            localStorage.setItem("sUsername",signUpArray[i].name)
            location.replace('home.html')
        }
        else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }
       
    
}

var username = localStorage.getItem("sUsername")
if (username){
    document.getElementById('username').innerHTML="Welcome " + username
}


function isEmpty()
{
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
        }
        else {
            return true
     }
}

function isEmailExist() {
    for (var i =0;i<signUpArray.length; i++){
        if (signUpArray[i].email==signupEmail.value){
            return false
        }
    }
}

function logout(){
    localStorage.removeItem("sUsername")
}

