import Axios from 'axios'
import Cookies from 'js-cookie'

const BANK_API = 'http://0.0.0.0:8000'
const auth_token = Cookies.get('authToken')


Axios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    }, (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response.status === 401) {
        // logout()
        window.location.href = '/sign-in'
    } else {
        return Promise.reject(error);
    }
  }
)

export const GET = (url) => {
  return Axios.get(`${BANK_API}${url}`, {
    headers: {
      Authorization: `Token ${auth_token}`,
      Accept: 'application/json'
    }
  })
}


export const DELETE = (url) => {
  return Axios.delete(`${BANK_API}${url}`, {
    headers: {
      Authorization: `Token ${auth_token}`,
      Accept: 'application/json',
    }
  })
}

export const POST = (url, data, login) => {
  return Axios.post(`${BANK_API}${url}`, data, {
      headers: {
          Authorization: ` Token ${auth_token}`,
          Accept: 'application/json'
      }
  })
}

export const POST_USER = (url, data, login) => {
  return Axios.post(`${BANK_API}${url}`, data, {
      headers: {
          Accept: 'application/json'
      }
  })
}

export const PATCH = (url, data) => {
  return Axios.patch(`${BANK_API}${url}`, data, {
      headers: {
          Authorization: ` Token ${auth_token}`,
          Accept: 'application/json'
      }
  })
}