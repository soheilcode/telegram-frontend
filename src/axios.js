import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://telegram-rebuild-backend.herokuapp.com'
})
export default instance