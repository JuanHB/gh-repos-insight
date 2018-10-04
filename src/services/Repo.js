import Http from './Http';

class Repo {

  instance;

  constructor() {
    if (this.instance) {
      return this.instance;
    }

    this.http = new Http();

    this.instance = this;
  }

  getUserRepoList(user) {
    return this.http.get(`/users/${user}/repos`)
      .then(res => res.data);
  }

}

export default Repo;