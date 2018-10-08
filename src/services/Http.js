import axios from 'axios';

class Http {

  instance;

  constructor(){
    // singleton pattern for Http Service
    if(this.instance){
      return this.instance
    }
    this.instance = this;
  }

  /**
   * Performs an HTTP GET request with the given url
   * @param url
   * @returns {AxiosPromise}
   */
  get(url){
    const getUrl = this.constructor.buildUrl(url);
    return axios.get(getUrl);
  }

  /**
   * Creates the final version of an API endpoint
   * @param urlToBuild
   * @returns {string}
   */
  static buildUrl(urlToBuild){
    return `${process.env.REACT_APP_API_URl}${urlToBuild}`;
  }

}
export default Http;
