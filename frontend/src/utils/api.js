class aroundUSAPI {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }
  //Headers
  get _headers() {
    const vipToken = localStorage.getItem("jwt");
    return {
      authorization: `Bearer ${vipToken}`,
      "Content-Type": "application/json",
    };
  }
  // Manejar respuesta
  async _checkResponse(response) {
    if (response.ok) {
      const res = await response.json();
      return res.data ? res.data : res;
    }
    return Promise.reject(`Error:${response.status}`);
  }

  // fetchs
  // usuario
  async getUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async updateUserInfo(data) {
    try {
      const response = await fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      });
      return this._checkResponse(response);
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserAvatar(data) {
    try {
      const response = await fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      });
      return this._checkResponse(response);
    } catch (error) {
      console.log(error);
    }
  }

  // Cards
  async getCards() {
    const response = await fetch(`${this._url}/cards/`, {
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async postCard(data) {
    const response = await fetch(`${this._url}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._checkResponse(response);
  }

  async cardToggleLike(id, isLiked) {
    const metodo = isLiked ? "PUT" : "DELETE";
    const response = await fetch(`${this._url}/cards/${id}/likes`, {
      method: metodo,
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async cardDelete(id) {
    const response = await fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(response);
  }
}

const API = new aroundUSAPI({
  baseUrl: "https://api.aroundUSDanils.mooo.com",
});

export default API;
