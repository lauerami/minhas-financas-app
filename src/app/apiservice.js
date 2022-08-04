import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'https://minhasfinancas-api-dtp.herokuapp.com'
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
  };
  
  export default httpMethods;