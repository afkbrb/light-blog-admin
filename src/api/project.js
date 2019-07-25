import request from '@/utils/request'
import qs from 'qs'

export function fetchProject(id) {
  return request({
    url: '/project/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchProjectList(page, size) {
  return request({
    url: '/project/list',
    params: { page, size }
  })
}

export function deleteProject(id) {
  return request({
    url: '/project/delete',
    method: 'post',
    params: { id }
  })
}

export function addProject(data) {
  return request({
    url: '/project/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateProject(data) {
  return request({
    url: '/project/update',
    method: 'post',
    data: qs.stringify(data)
  })
}
