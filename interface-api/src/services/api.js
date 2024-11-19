//este arquivo auxilia na conexão

import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/user'
})

export default api