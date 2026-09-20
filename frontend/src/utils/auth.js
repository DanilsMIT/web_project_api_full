export const BASE_URL = "https://api.aroundUSDanils.mooo.com";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error:${response.status}`);
}

//Registro
export const register = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(response);
};

//Login

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(response);
};

//Token
export const getToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};
