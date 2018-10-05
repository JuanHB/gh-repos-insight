import Http from './Http';

class RepoService {

  instance;

  constructor() {
    if (this.instance) {
      return this.instance;
    }
    this.http = new Http();
    this.instance = this;
  }

  getUserRepos(user) {
    return this.http.get(`/users/${user}/repos`)
      .then(res => res.data);
  }

}

export default RepoService;