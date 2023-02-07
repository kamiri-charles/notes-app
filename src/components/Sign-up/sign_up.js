import Cookies from 'js-cookie'

export const sign_up_user = (user, div, nav) => {
    if (user.username === "") {
        div.current.innerText = "Please enter your username."
    } else if (user.password === "") {
        div.current.innerText = "Please enter your password."
    } else if (user.password !== user.password2) {
        div.current.innerText = "The passwords entered do not match.\nTry again."
    } else {
        (async () => {
            fetch('https://notes-app-api.azurewebsites.net/api/user/sign-up/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                body: JSON.stringify({
                    "username": user.username,
                    "password": user.password
                })
            })

            .then(res => res.json())
            .then(data => {
                if (data.signed_in) {
                    // fetch and save user data to local storage
                    fetch('/api/user/sign-up/')
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('user', JSON.stringify(data))
                        alert('Account created successfully.')
                        nav('/', {state: data})
                    })
                    .catch(err => div.current.innerText=err)
                }
            })

        }) ();
    }
}