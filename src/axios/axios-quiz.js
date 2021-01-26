import axios from 'axios'

export default axios.create({
    baseURL: 'https://rect-quiz-c70a7-default-rtdb.firebaseio.com/'
})