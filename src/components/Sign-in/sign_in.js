import Cookies from 'js-cookie'

export const sign_in_user = (user, div, nav) => {
    if (user.username === "") {
        div.current.innerText = "Please enter your username."
    } else if (user.password === "") {
        div.current.innerText = "Please enter your password."
    } else {
        (async () => {
            fetch('https://notes-app-api.azurewebsites.net/api/user/sign-in/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                body: JSON.stringify(user)
            })

            .then(res => res.json())
            .then(data => {
                if (data.signed_in) {
                    // fetch and save user data to local storage
                    fetch('https://notes-app-api.azurewebsites.net/api/user/')
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('user', JSON.stringify(data))
                        nav('/', {state: data})
                    })
                    .catch(err => div.current.innerText=err)
                }
            })

        }) ();
    }
}