import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async newObject => {

    const response = await axios.put(baseUrl + '/' + newObject.id, newObject)
    return response.data
}

const remove = async delObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(baseUrl + '/' + delObject.id, config)
    return response.data
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll, setToken, create, update, remove }