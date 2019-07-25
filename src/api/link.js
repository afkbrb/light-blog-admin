import request from '@/utils/request'
import qs from 'qs'

export function fetchLink(id) {
  return request({
    url: '/link/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchLinkList(page, size) {
  return request({
    url: '/link/list',
    params: { page, size }
  })
}

export function deleteLink(id) {
  return request({
    url: '/link/delete',
    method: 'post',
    params: { id }
  })
}

export function addLink(data) {
  return request({
    url: '/link/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateLink(data) {
  return request({
    url: '/link/update',
    method: 'post',
    data: qs.stringify(data)
  })
}
