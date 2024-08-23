const URL = "http://127.0.0.1:8000";

function setHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
}

async function getAPI(key) {
  const headers = setHeaders();
  const url = `${URL}/api/${key}/`;
  return fetch(url, { headers: headers, method: "GET" }).then((res) =>
    res.json()
  );
}

async function postAPI(key, body) {
  const headers = setHeaders();
  const url = `${URL}/api/${key}/`;
  return fetch(url, { headers: headers, method: "POST", body: body })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

async function updateAPI(key, body) {
  const headers = setHeaders();
  const url = `${URL}/api/${key}/`;
  return fetch(url, { headers: headers, method: "PUT", body: body })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}


async function deleteAPI(key) {
  const headers = setHeaders();
  const url = `${URL}/api/${key}/`;
  return fetch(url, { headers: headers, method: "DELETE"})
    .then((res) => res)
    .catch((error) => console.log(error));
}

async function getCurrentUser() {
  const loggedInUserID = localStorage.getItem('loggedInUserID')
  if (loggedInUserID) currentUser = await getAPI(`users/${loggedInUserID}`);
}

