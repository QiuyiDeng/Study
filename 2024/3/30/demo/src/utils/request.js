import axios from 'axios'
const baseUrl = 'https://e4becbf9-e854-4de4-a82a-3243a72414bf.mock.pstmn.io/api'
const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + url, data, {
      headers: {
        'Content-Type': 'appliaction/json'
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export {
  post
}
