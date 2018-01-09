import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://' + window.location.hostname + ':3000/',
  withCredentials: true
})

export const isAuthenticated = async () => {
  try {
    await http.head('access/validatetoken')
    return true
  }
  catch (e) {
    console.log(e)
  }
  return false
}

export const getUserInfo = async () => {
  try {
    let response = await http.get('access/userinfo')
    console.log(response.data)
    return response.data
  }
  catch (e) {
    console.log(e)
  }
  return false
}
