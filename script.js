const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const logintoggle = document.getElementsByClassName('logintext')[0]
const logvar = document.getElementsByClassName('g-signin2')[0]
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
    var profile = googleUser.getBasicProfile()
    user = profile
    loggedin = true
    //testdetails(profile)
    firebase.database().ref('/users/'+ profile.getName().split(' ') + '_' + profile.getFamilyName()).set({
        "givenName" : profile.getGivenName(),
        "familyName" : profile.getFamilyName(),
        "Image" : profile.getImageUrl(),
        "Email" : profile.getEmail()
    });
    console.log(`status : `+loggedin)
}

function signOut() {
    gapi.auth2.getAuthInstance().signOut().then(function() {
      console.log('user signed out')
    })
    loggedin = false
    console.log(`status : `+loggedin)
}

function testdetails(profile){
 
    console.log(profile)
    console.log("This should work")   
    console.log('Name : ' + profile.getName())
    console.log(firebase.database())
}

function showusername(){
    logintoggle.classList.toggle('active')
    console.log('Haanji')
}

window.onload = showusername;