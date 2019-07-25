import request from '@/utils/request'
import qs from 'qs'

export function fetchTag(id) {
  return request({
    url: '/blog/tag/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTagList(page, size) {
  return request({
    url: '/blog/tag/list',
    params: { page, size }
  })
}

export function deleteTag(id) {
  return request({
    url: '/blog/tag/delete',
    method: 'post',
    params: { id }
  })
}

export function addTag(data) {
  return request({
    url: '/blog/tag/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateTag(data) {
  return request({
    url: '/blog/tag/update',
    method: 'post',
    data: qs.stringify(data)
  })
}
