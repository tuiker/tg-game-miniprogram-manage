import request from '@/utils/request'

/**
 *
 * @param {*} params
 * @returns 游戏语言
 */

export function GetLanguage() {
  return request({
    url: '/comm/numerical/listByLanguage',
    method: 'get',
  })
}

/**
 *
 * @param {*} params
 * @returns 全部游戏
 */
export function GetlistByGame(params) {
  return request({
    url: '/comm/numerical/listByGame',
    method: 'get',
    data: params
  })
}

/**
 *
 * @param {*} params
 * @returns 文件上传
 */
export function UploadImg(params) {
  return request({
    url: '/comm/fileUpload/uploadFile',
    method: 'post',
    data: params
  })
}










