import axios from 'axios'

const DEFAULT_API_URL = `http://${process.env.VUE_APP_API_URL}/api/`

/*
* Wrapper Plugin for making https calls to the API through Axios
* Reason for having this wrapper is so that we can add global interceptors or custom headers
* such as appending authentication token ,its verification, etc at only 1 point. 
*
*/

export default {
  install (Vue) {
    Vue.https = this
    Vue.prototype.$https = this
  },
  get (endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(DEFAULT_API_URL + endpoint)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  post (endpoint, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(DEFAULT_API_URL + endpoint, data)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            resolve(response.data)
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  put (endpoint, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(DEFAULT_API_URL + endpoint, data)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  delete (endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .delete(DEFAULT_API_URL + endpoint)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
