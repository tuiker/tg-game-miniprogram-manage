import request from '@/utils/request'

/**
 *
 * @param {*} params
 * @returns 游戏列表
 */
export function GetpageByGame(params) {
  return request({
    url: '/pc/game/page',
    method: 'get',
    params
  })
}

/**
 *
 * @param {*} params
 * @returns 根据ID查 游戏详情
 */
export function GetGameById(id) {
  return request({
    url: '/pc/game/getVoById',
    method: 'get',
    params: { id }
  })
}

/**
 *
 * @param {*} params
 * @returns 添加游戏
 */

export function AddGame(params) {
  return request({
    url: '/pc/game/add',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 * @returns 根据ID查 修改游戏
 */
export function UpdateGameById(params) {
  return request({
    url: '/pc/game/update',
    method: 'post',
    data: params
  })
}

/**
 * 根据游戏ID删除游戏信息
 * @param {*} id 
 * @returns 
 */
export function DeleteById(id) {
  return request({
    url: '/pc/game/deleteById',
    method: 'delete',
    params: { id }
  })
}
