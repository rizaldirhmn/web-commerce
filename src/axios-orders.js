import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`
  // headers: {'X-Custom-Header': 'foobar'}
})

export default instance
