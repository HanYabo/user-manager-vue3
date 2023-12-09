import instance from '../utils/request.js'

export const getUserListAPI = (index, size, queryParams) => {
    return instance({
        method: 'POST',
        url: `/user/${index}/${size}`,
        data: queryParams
    })
}

export const addUserAPI = (user) => {
    return instance({
        method: 'POST',
        url: '/user',
        data: user
    })
}

export const deleteMoreAPI = (ids) => {
    return instance({
        method: 'DELETE',
        url: '/user',
        data: ids
    })
}

export const deleteUserAPI = (id) =>{
    return instance({
        url: `/user/${id}`,
        method: 'DELETE'
    })
}

export const getUserInfoAPI = (id) => {
    return instance({
        url: `/user/${id}`,
        method: 'POST'
    })
}

export const updateUserAPI = (user) => {
    return instance({
        url: '/user',
        method: 'PUT',
        data: user
    })
}