import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

const httpClient = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

const httpMethods = {
    get(url) {
        return httpClient.get(url);
    },
  
    post(url, data) {
        return httpClient.post(url, data);
    },
  
    put(url, data) {
        return httpClient.put(url, data);
    },
  
    delete(url) {
        return httpClient.delete(url);
    },

    registrationToken(token) {
        if(token){
            httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
    },
  };
  
  export default httpMethods;