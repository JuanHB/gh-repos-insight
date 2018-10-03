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

  get(url){
    const getUrl = this.constructor.buildUrl(url);
    return axios.get(getUrl);
  }

  static buildUrl(urlToBuild){
    return `${process.env.REACT_APP_API_URl}${urlToBuild}`;
  }

}
export default Http;
