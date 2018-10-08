import Http from './Http';

class RepoService {

  // holds the service singleton instance
  instance;

  constructor() {
    // singleton pattern for the RepoService
    if (this.instance) {
      return this.instance;
    }
    // creates the Http Service Singleton instance
    this.http = new Http();
    this.instance = this;
  }

  /**
   * Searches the given user repo list
   * @param query
   * @returns {Promise<T>}
   */
  searchReposByUser(query) {
    return this.http.get(`/users/${query}/repos`)
      .then(resp => {
        resp.slug = !resp.data.length
          ? 'no-public-repo'
          : 'response-ok';
        return resp;
      })
      .catch(err => {
        switch (err.response.status) {
          // in case of 404, returns an empty
          case 404:
            return { data: [], slug: 'user-not-found' };
          default:
            return err;
        }
      });
  }

  /**
   * Gets contributors by repo
   * @param userName
   * @param repoName
   * @returns {Promise<T>}
   */
  getRepoContributors({userName, repoName}){
    return this.http.get(`/repos/${userName}/${repoName}/contributors`)
      .then(resp => {
        resp.slug = 'response-ok';
        // in case of no contributors
        if(resp.status === 204){
          resp.data = [];
          resp.slug = 'no-contributors'
        }
        return resp;
      });
  }

}

export default RepoService;