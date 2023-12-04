import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const RoutesKey = 'vue_admin_template_routes'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRoutes() {
  return JSON.parse(localStorage.getItem(RoutesKey))
}

export function setRoutes(routes) {
  localStorage.setItem(RoutesKey, JSON.stringify(routes))
}

export function removeRoutes() {
  return localStorage.removeItem(RoutesKey)
}