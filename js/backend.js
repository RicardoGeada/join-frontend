
const URL = 'http://127.0.0.1:8000'

let headers = {
    'Content-Type': 'application/json',
    // 'Authorization' : 'Token c5ad500616bc2c992d2c9de60a9446e3249a6ad4'
}

async function get(key) {
    const url = `${URL}/api/${key}/`
    return fetch(url, { headers: headers , method:'GET'})
        .then(res => res.json())
}

async function post(key, body) {
    const url = `${URL}/api/${key}/`;
    return fetch(url, { headers: headers, method: 'POST', body: body })
        .then(res => res.json())
        .catch(error => console.log(error))
}

async function update(key, body) {
    const url = `${URL}/api/${key}/`
    return fetch(url, {headers:headers, method: 'PUT', body: body})
        .then(res => res.json())
        .catch(error => console.log(error))
}


// register
// login
// users
// contacts
// tasks
// subtasks