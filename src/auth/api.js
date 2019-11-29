
export const isLoggedIn = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  let token = localStorage.getItem('drupal-oauth-token') !== null ? JSON.parse(localStorage.getItem('drupal-oauth-token')) : null;

  if (token === null) {
    return false;
  }

  if (token !== null && token.expirationDate > Math.floor(Date.now() / 1000)) {
    return token;
  } else {
    getRefreshToken(token, '').then((token) => {
      if (token !== null) {
        return token;
      }

      return false;
    })
  }
};

export const handleDrupalLogin = async (username, password) => {
  return fetchOauthToken(username, password);
};

export const handleDrupalLogout = async () => {
  return localStorage.removeItem('drupal-oauth-token');
};

export const getOauthToken = async (username, password) => {
  return fetchOauthToken(username, password);
};

export const getRefreshToken = async (token) => {
  return refreshOauthToken(token);
};

const fetchOauthToken = async (username, password) => {
  
  let formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', process.env.CLIENT_ID);
  formData.append('client_secret', process.env.CLIENT_SECRET);
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(`${process.env.DRUPAL_URL}/oauth/token`, {
    method: 'post',
    headers: new Headers({
      'Accept': 'application/json',
    }),
    body: formData,
  });
  
  if (response.ok) {
    const json = await response.json();
    return storeToken(json);
  }

  if (!response.ok) {
    const json = await response.json();
    return json
  }
};

const refreshOauthToken = async (token) => {
  if (token !== null) {
    let formData = new FormData();
    formData.append('grant_type', 'refresh_token');
    formData.append('client_id', process.env.CLIENT_ID);
    formData.append('client_secret', process.env.CLIENT_SECRET);
    formData.append('refresh_token', token.refresh_token);

    const response = await fetch(`${process.env.DRUPAL_URL}/oauth/token`, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
      }),
      body: formData,
    });

    if (response.ok) {
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      return storeToken(json);
    }

  }
};

const storeToken = (json) => {
  let token = Object.assign({}, json);
  token.date = Math.floor(Date.now() / 1000);
  token.expirationDate = token.date + token.expires_in;
  localStorage.setItem('drupal-oauth-token', JSON.stringify(token));
  return token;
}

export const fetchUserInfo = async (token) => {
  const response = await fetch(`${process.env.DRUPAL_URL}/oauth/me`, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${token.access_token}`,
      'Accept': 'application/json',
    }),
  });
  if (response.ok) {
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error.message);
    }

    return json
  }
};

export const fetchPrivateContent = async (id, type, token) => {
  
  const response = await fetch(`${process.env.DRUPAL_URL}/api/node/${type}/${id}`, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${token.access_token}`,
      'Accept': 'application/json',
    }),
  });

  if (response.ok) {
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error.message);
    }

    return json;
  }
};


export const updateUserProfile = async (token, userId, payload) => {
  
  const response = await fetch(`${process.env.DRUPAL_URL}/api/user/user/${userId}`, {
    method: 'PATCH',
    headers: new Headers({
      'Authorization': `Bearer ${token.access_token}`,
      'Content-Type':'application/vnd.api+json',
      'Accept':'application/vnd.api+json'
    }),
    body: `{
      "data": {
        "type": "user--user",
        "id" :  "${userId}",
        "attributes": {
          "field_display_name": "${payload}"
        }               
      }
    }
    `
  });

  if (response.ok) {
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error.message);
    }

    return json;
  }
};