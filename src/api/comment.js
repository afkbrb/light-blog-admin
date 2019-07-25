import request from '@/utils/request'

export function fetchComment(id) {
  return request({
    url: '/comment/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchCommentList(page, size) {
  return request({
    url: '/comment/list',
    params: { page, size }
  })
}

export function fetchCommentListByBlogId(blogId, page, size) {
  return request({
    url: '/comment/list/blog',
    method: 'get',
    params: { page, size, blogId }
  })
}

export function deleteComment(id) {
  return request({
    url: '/comment/delete',
    method: 'post',
    params: { id }
  })
}
