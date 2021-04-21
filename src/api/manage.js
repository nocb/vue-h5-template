import request from '@/utils/request'
export function getAction(url,params) {
  return request({
    url,
    method: 'get',
    params
  })
}
export function postAction(url,data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function getDictltems(dict) {
  return request({
    url:`/sys/dict/getDictItems/${dict}`,
    method: 'get',
  })
}
