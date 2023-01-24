/**
 * Team 2
 * CSC 648
 * Description: provides frontend functionality for login/ register
 */
function login_execute() {
    const username = document.getElementById('user-input').value;
    const password = document.getElementById('pass-input').value;

    const login_info = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }


    fetch('/api/login', login_info).then((response) => {
        if (response.status == 200) {
            window.location.href = "/User-Profile";
        }
        else {
            alert("Invalid username or password, please try again");
            window.location.reload();
        }
    }
    )
        .catch((err) => console.log(err));


}


function getUser() {
    fetch('/api/users/current').then((response) => {


    }
    )
        .catch((err) => console.log(err));
}

function registerUser() {
    const username = document.getElementById('email-input-new').value;
    const password = String(document.getElementById('pass-input-new').value);
    const passwordcnfrm = String(document.getElementById('pass-input-confirm').value);

    if (!document.getElementById('tos-input-confirm').checked) {
        alert("TOS must be checked");
    } 
    else if (!password.localeCompare(passwordcnfrm) == 0) {
        alert("Password and Confirm Password Do Not Match")
    }
    else {
        const user_info = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                "email": username,
                "password": password
            })
        }
        fetch('/api/users', user_info)
            .then((response) => {
                if (response.status == 200) {
                    alert("Registration Sucess")
                    window.location.href = '/login'
                }
                else{
                    window.location.reload();
                    response.json().then((data) => {
                        window.location.reload();
                        alert(data.message)
                    })
                }
                
            })
            .catch((err) => console.log(err));
    }
}

function profile_display() {
    var login = document.getElementById('nav-login');
    var logout = document.getElementById('nav-logout');
    fetch('/api/users/current')
        .then((response) => {

            if (response.status == 204) {
                logout.style.display = 'none';
            } else {
                login.style.display = 'none';
            }

        });


}

function logout_frontend() {

    fetch('/api/login/logout', {
        method: 'POST'
    })
        .then((response) => {
            if (response.status == 200) {
                window.location.href = '/';
            }
        })
        .catch((err) => console.log(err));


}

function login_redirect() {

    fetch('/User-Profile')
        .then((response) => {
            if (response.status == 401) {
                alert("Must be logged in");
                window.location.href = "/login"
            }
            else {

                window.location.href = "/User-Profile"
            }
        })

}

function changePassword() {
    passCurrent = document.getElementById('pass-current').value;
    passNew = document.getElementById('pass-new').value;
    passNewConfirm = document.getElementById('pass-new-coferm').value;
    if(passNew.length <= 0){
        alert("New Password CAN'T BE EMPTY");
        window.location.reload();
    }
    else if (passNew.localeCompare(passNewConfirm) != 0) {
        alert("New Password and Confirm Password DO NOT MATCH");
        window.location.reload();
    } else if (passCurrent.localeCompare(passNew) == 0) {
        alert("New Password can't be same as Old Password");
        window.location.reload();
    }
    else if(passNew.length < 6){
        alert("New Password can't be less than 6");
        window.location.reload();
    }
    else if(passNew.length < 6){
        alert("New Password can't be less than 12");
        window.location.reload();
    }
     else {

        fetch('/api/users/changepassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "old_password": passCurrent,
                "new_password": passNew
            })

        })
            .then((response) => {
                if (response.status == 200) {
                    alert("Password Updated")
                    window.location.href = '/User-Profile'
                }
                else {
                    window.location.reload();
                    response.json().then((data) => {
                        window.location.reload();
                        alert(data.message)
                    })
                }
            })
            .catch((err) => console.log(err));
    }
}

function changeEmail() {
    emailNew = document.getElementById("email-new").value;
    passCurrent = document.getElementById("pass-current").value;


    fetch('/api/users/changeemail', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "new_email": emailNew,
            "password": passCurrent
        })

    })
        .then((response) => {
            if (response.status == 200) {
                alert("Email Updated")
                window.location.href = '/User-Profile'
            }
            else {
                window.location.reload();
                response.json().then((data) => {
                    window.location.reload();
                    alert(data.message)
                })
            }
            
        })
        .catch((err) => console.log(err));

}

