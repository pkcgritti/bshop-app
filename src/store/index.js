import Vue from 'vue'
import Vuex from 'vuex'
import { http } from '../utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    appInitialized: false,
    isAuthenticated: false,
    user: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      token: '',
      role: ''
    },
    socket: {
      isConnected: false,
      message: '',
      broadcast: ''
    }
  },

  getters: {
    currentUser: state => state.user
  },

  mutations: {
    setCurrentUser (state, newUser) {
      state.user = newUser
    },

    SOCKET_CONNECT (state) {
      state.socket.isConnected = true
    },

    SOCKET_DISCONNECT (state) {
      state.socket.isConnected = false
    },

    SOCKET_MESSAGE (state, data) {
      state.socket.message = data
      console.log(data)
    }
  },

  actions: {
    validateToken: (store) => new Promise((resolve, reject) => {
      http.head('/access/validatetoken')
        .then(response => {
          store.state.isAuthenticated = true
          resolve(true)
        })
        .catch(err => {
          store.state.isAuthenticated = false
          reject(err)
        })
    }),

    retrieveUserInformation: (store) => new Promise((resolve, reject) => {
      http.get('/access/userinfo')
        .then(response => {
          store.commit('setCurrentUser', response.data)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    }),

    login: (store, payload) => new Promise((resolve, reject) => {
      http.post('/access/login', payload)
        .then(response => {
          store.dispatch('retrieveUserInformation')
          store.state.isAuthenticated = true
          resolve()
        })
        .catch(err => {
          reject(err.response)
        })
    }),

    signup: (store, payload) => new Promise((resolve, reject) => {
      http.post('/access/signup', payload)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err.response)
        })
    })
  }
})

export default store
