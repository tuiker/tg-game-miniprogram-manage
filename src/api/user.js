import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/pc/user/userLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/pc/user/getMyUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/pc/user/loginOut',
    method: 'post'
  })
}
