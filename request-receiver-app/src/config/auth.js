

exports.updateToken = (next) => {
    const rfToken = localStorage.getItem('refresh_token');
    const id = localStorage.getItem('id');
    const data = {
        id: id,
        rfToken: rfToken
    }
    fetch('http://localhost:3000/user/updateToken', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    }).then((res) => {
        if (res.auth === false) {
            localStorage.setItem('x-access-token', res.access_token);
            next();
        } else {
            localStorage.setItem('auth', false);
        }
    })
}