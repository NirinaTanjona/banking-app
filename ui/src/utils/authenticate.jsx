import Cookies from 'js-cookie'

export const isAuth = () => {
  const authTokenCookies = Cookies.get('authToken')
  if (!authTokenCookies) {
    return false
  }
  return true
}

export const isAuthorized = () => {
  const authorizationCookies = Cookies.get('is_staff')
  const _isAuthorized = (authorizationCookies === 'true')
  return _isAuthorized
}

export const getToken = () => {
  return Cookies.get('authToken')
}

export const getAuthorization = () => {
  return Cookies.get('is_staff')
}

export const setAuth = (token) => {
  console.log(token)
  Cookies.set('authToken', token, {secure: true})

  const authTokenCookies = Cookies.get('authToken')

  console.log('after')
  console.log(authTokenCookies)

  return authTokenCookies
}

export const setAuthorization = (is_staff) => {
  console.log("Authorized: ", is_staff)
  Cookies.set('is_staff', is_staff)

  const authorizationCookies = Cookies.get('is_staff')

  console.log("Authorized: ", authorizationCookies)

  return authorizationCookies
}

export const logout = () => {
  Cookies.remove('authToken')
  Cookies.remove('is_staff')
}

const authFunctions = {
  isAuthorized,
  isAuth,
  logout,
  setAuth,
  getToken,
  setAuthorization,
  getAuthorization,
}

export default authFunctions