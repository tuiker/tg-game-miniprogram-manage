import request from '@/utils/request'

/**
 * 根据用户获取它的权限列表
 * @returns 菜单、按钮权限列表
 */
export function GetSysMenuList() {
  return request({
    url: '/pc/sysMenu/getList',
    method: 'get'
  })
}
