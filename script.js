const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const logvar = document.getElementsByClassName('g-signin2')[0]
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
    console.log(profile)
    console.log("This should work")
    loggedin = true
    console.log('Name : ' + profile.getName())
    firebase.database().ref('/users/'+ profile.getName() + '_' + profile.getFamilyName()).set({
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