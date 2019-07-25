import request from '@/utils/request'
import qs from 'qs'

export function fetchCarousel(id) {
  return request({
    url: '/carousel/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchCarouselList(page, size) {
  return request({
    url: '/carousel/list',
    params: { page, size }
  })
}

export function deleteCarousel(id) {
  return request({
    url: '/carousel/delete',
    method: 'post',
    params: { id }
  })
}

export function addCarousel(data) {
  return request({
    url: '/carousel/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateCarousel(data) {
  return request({
    url: '/carousel/update',
    method: 'post',
    data: qs.stringify(data)
  })
}
