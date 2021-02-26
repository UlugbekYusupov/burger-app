import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-b71be-default-rtdb.firebaseio.com/'
})

export default instance