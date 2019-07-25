import request from '@/utils/request'
import qs from 'qs'

export function fetchBlog(id) {
  return request({
    url: '/blog/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchBlogList(page, size) {
  return request({
    url: '/blog/list',
    params: { page, size }
  })
}

export function fetchBlogListByTagId(tagId, page, size) {
  return request({
    url: '/blog/list/tag',
    params: { tagId, page, size }
  })
}

export function deleteBlog(id) {
  return request({
    url: '/blog/delete',
    method: 'post',
    params: { id }
  })
}

export function addBlog(data) {
  return request({
    url: '/blog/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateBlog(data) {
  return request({
    url: '/blog/update',
    method: 'post',
    data: qs.stringify(data)
  })
}

