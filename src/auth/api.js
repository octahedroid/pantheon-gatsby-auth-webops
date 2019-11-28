
// connect to drupal api
export const isLoggedIn = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  let token = localStorage.getItem('drupal-oauth-token') !== null ? JSON.parse(localStorage.getItem('drupal-oauth-token')) : null;

  if (token === null) {
    return false;
  }

  // If we've got an active token, assume the user is logged in.
  if (token !== null && token.expirationDate > Math.floor(Date.now() / 1000)) {
    return token;
  } else {
    // If not, see if we can get a refresh token.
    getRefreshToken(token, '').then((token) => {
      if (token !== null) {
        return token;
      }

      return false;
    })
  }
};

export const handleDrupalLogin = async (username, password, scope) => {
  return fetchOauthToken(username, password, scope);
};

export const handleDrupalLogout = async () => {
  return localStorage.removeItem('drupal-oauth-token');
};

export const getOauthToken = async (username, password, scope) => {
  return fetchOauthToken(username, password, scope);
};

export const getRefreshToken = async (token, scope) => {
  return refreshOauthToken(token, scope);
};

const fetchOauthToken = async (username, password, scope) => {
  
  let formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', process.env.CLIENT_ID);
  formData.append('client_secret', process.env.CLIENT_SECRET);
  formData.append('scope', scope);
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(process.env.DRUPAL_AUTH, {
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
};

const refreshOauthToken = async (token, scope) => {
  if (token !== null) {
    let formData = new FormData();
    formData.append('grant_type', 'refresh_token');
    formData.append('client_id', process.env.CLIENT_ID);
    formData.append('client_secret', process.env.CLIENT_SECRET);
    formData.append('scope', scope);
    formData.append('refresh_token', token.refresh_token);

    const response = await fetch(process.env.DRUPAL_AUTH, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
      }),
      body: formData,
    });

    if (response.ok) {
      const json = await response.json();

      if (json.error) {
        //throw new Error(json.error.message);
      }

      return storeToken(json);
    }

    //throw new Error(response.status);
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
  
  const response = await fetch('https://dev-auth-webops.pantheonsite.io/oauth/debug?_format=json', {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${token.access_token}`,
      'Accept': 'application/json',
    }),
  });

  if (response.ok) {
    const json = await response.json();
    const userData = await fetchUserById(json.id, token)
    if (json.error) {
      throw new Error(json.error.message);
    }

    return userData;
  }
};


export const fetchUserById = async (id, token) => {
  
  const response = await fetch(`https://dev-auth-webops.pantheonsite.io/api/user/user?filter[drupal_internal__uid]=${id}`, {
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