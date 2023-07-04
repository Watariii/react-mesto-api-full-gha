const base_url = "https://auth.nomoreparties.co";

function register({ email, password }) {

  return fetch(`${base_url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`,
    }),
  }).then(checkStatus());
}
function authorize({ email, password }) {
    return fetch(`${base_url}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
        }),
      }).then(checkStatus());
}

//получение токена и email
function getUsersMe(token) {
    return fetch(`${base_url}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        }
      
      }).then(checkStatus());
}

function checkStatus() {
  return (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

export { base_url, register, authorize, getUsersMe};
