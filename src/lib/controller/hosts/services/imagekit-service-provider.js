const axios = require('axios')
const ApiServiceProvider = require('../../api-service-provider')

const BASE_URL = 'https://api.imagekit.io/v1'

class ImagekitServiceProvider extends ApiServiceProvider {
  test(payload) {
    return axios.get('/files', {
      auth: {
        username: this.object.privateKey,
        password: ''
      },
      baseURL: BASE_URL
    })
  }
}

module.exports = ImagekitServiceProvider