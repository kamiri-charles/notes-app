import Cookies from 'js-cookie'

export const sign_in_user = (user, div, nav, setLoading) => {
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
                if (data.err) {
                    div.current.innerText = data.err;
                    setLoading(false);
                } else {
                    const evt = document.createEvent('StorageEvent');
                    evt.initStorageEvent('storage', false, false, 'user', '', JSON.stringify(data),null, window.localStorage);

                    localStorage.setItem('user', JSON.stringify(data))

                    window.dispatchEvent(evt);
                    setLoading(true);
                    nav('/')
                }
            })
        }) ()
    }
}