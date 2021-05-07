const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const logintoggle = document.getElementsByClassName('logintext')[0]
const logvar = document.getElementsByClassName('g-signin2')[0]
const logintext = document.querySelector('div.logintext')
var user = 'your profile'
var loggedin = false


toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

function flipToggle(x){
    x.classList.toggle("change");
}

function onSignIn(googleUser) {
    if (loggedin === true){
        signOut()
    }else{
        signIn(googleUser)
    }
    toggle_signin()
}

function toggle_signin(){
    // logvar.classList.toggle('flip')
}

function signIn(googleUser){
    user = googleUser.getBasicProfile()
    loggedin = true
    //testdetails(profile)
    firebase.database().ref('/users/'+ user.getName().split(' ')[0] + '_' + user.getFamilyName()).set({
        "givenName" : user.getGivenName(),
        "familyName" : user.getFamilyName(),
        "Image" : user.getImageUrl(),
        "Email" : user.getEmail()
    });
    logintext.textContent = 'as ~' + user.getName().split(' ')[0] + (user.getFamilyName()).toLowerCase()
    logintoggle.classList.toggle('turn')
}

function signOut() {
    gapi.auth2.getAuthInstance().signOut().then(function() {
    //   console.log('user signed out')
    })
    loggedin = false
    // console.log(`status : `+loggedin)
    logintoggle.classList.toggle('turn')
}

function testdetails(profile){
 
    console.log(profile)
    console.log("This should work")   
    console.log('Name : ' + profile.getName())
    console.log(firebase.database())
}

function showusername(){
    if(loggedin === true){
        logintext.textContent = 'as ~' + user.getName().split(' ')[0] + (user.getFamilyName()).toLowerCase()
        logintoggle.classList.toggle('turn')
    }
}


class Feedback{
    Feedback(element){
        this.feedback = element.value;
        this.email = user.getEmail();
        this.imageurl = user.getImageUrl();
    }
    json(){
        return {
            "feedback" : this.feedback,
            "email" : this.email,
            "image" : this.image
        }
    }
}

function savefeedback(){
    if(loggedin){
        let element = document.getElementById('feedback')
        let obj = new Feedback(element)
        firebase.database().ref('/feedbacks/'+ user.getName().split(' ')[0] + '_' + user.getFamilyName()).set(obj.json);
        alert('Thanks for your feedback.')
    }else
    alert('Please login first to send your feedback.')
}

window.onload = showusername;