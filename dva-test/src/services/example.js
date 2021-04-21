import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function getProducts(params) {
  if (params) {
    return request("/api/products?id=" + params.id)
  }
  return request("/api/products")
}

export function getUser() {
  return request("/api/posts")
}

export function login(params) {
  return request('/api/login?id=' + params.id);
}

