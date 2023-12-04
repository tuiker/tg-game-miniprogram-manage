import request from '@/utils/request'

/**
 *
 * @returns 数据加载
 */
export function GetAllStates(params) {
  return request({
    url: '/pc/data/getAllStates',
    method: 'get',
    params
  })
}

/**
 * 获取数据概况表格数据
 * @returns 
 */
export function GetDataProfilingTableData() {
  return request({
    url: '/pc/data/getDataProfilingTableData',
    method: 'get'
  })
}







