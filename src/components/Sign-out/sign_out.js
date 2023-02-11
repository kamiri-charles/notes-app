import Cookies from 'js-cookie'

export const sign_out_user = (user, div) => {
    (async () => {
        fetch(`https://notes-app-api.azurewebsites.net/api/user/sign-out/?username=${JSON.stringify(user)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        })

        .then(res => res.json())
        .then(data => {
            if (data.err) {
                div.current.innerText = "Error Signing out !\nLogin first";
            } else {
                const evt = document.createEvent('StorageEvent');
                evt.initStorageEvent('storage',
                                     false,
                                     false,
                                     'user',
                                     JSON.stringify({ username: true }),
                                     JSON.stringify({ username: false }),
                                     null,
                                     window.localStorage);

                window.dispatchEvent(evt);
            }
        })
    }) ()
}