const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const logvar = document.getElementsByClassName('g-signin2')[0]
var loggedin = false
var x

const database = firebase.database();

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
}

function signIn(googleUser){
    x = googleUser.getBasicProfile()
    console.log(googleUser.getBasicProfile())
    loggedin = true
    const profile = googleUser.getBasicProfile()
    console.log("test")
    database.ref('/users/' + profile.getName() + ' as ' + profile.getId()).set({
        "givenName" : profile.getGivenName(),
        "familyName" : profile.getFamilyName(),
        "Image" : profile.getImageUrl(),
        "Email" : profile.getEmail()
    })
    console.log(`status : `+loggedin)
}

function signOut() {
    gapi.auth2.getAuthInstance().signOut().then(function() {
      console.log('user signed out')
    })
    loggedin = false
    console.log(`status : `+loggedin)
}