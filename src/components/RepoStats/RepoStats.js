import React from 'react';
import propTypes from 'prop-types';
import RepoService from 'src/services/RepoService';
import { Bar } from 'react-chartjs-2';
import { generateRgbaColor } from "src/utils/Color";
import './RepoStats.scss';

class RepoStats extends React.Component {

  state = {
    title: 'Select a repo',
    contributors: [],
    chartData: {
      labels: [],
      datasets: []
    }
  };

  componentDidUpdate(prevProps) {
    const repo = this.props.repo;
    const prevRepo = prevProps.repo;

    if (repo && (!prevRepo || repo.id !== prevRepo.id)) {
      this._fetchRepoContributors();
    }
  }

  render() {
    const { contributors, chartData, title } = this.state;
    const { repo } = this.props;
    return contributors.length
      ? (
        <section className='container-fluid text-center RepoStats__bar-chart'>
          <h3>{ repo.full_name }</h3>
          <Bar
            data={ chartData }
            height={ 300 }
            options={ { maintainAspectRatio: false } }
          />
        </section>
      ) : (
        <section className='container-fluid text-center RepoStats__bar-chart'>
          <h3>{title}</h3>
        </section>
      );
  }

  _repoService = new RepoService();

  _fetchRepoContributors = () => {
    const { name, owner } = this.props.repo;
    // gets the repo contributors list
    this._repoService.getRepoContributors({
      repoName: name,
      userName: owner.login,
    })
      .then(({ data: contributors, slug }) => {

        if(slug === 'response-ok'){
          // feeds thee state with the returned data
          // and parse the data to be applied on the bar chart
          this.setState({ contributors });
          this._parseDataFromContributors();
        } else if(slug === 'no-contributors'){
          this.setState({ contributors: [], title: 'Repo has no contributors' });
        }

      });
  };

  _parseDataFromContributors = () => {
    const { contributors, chartData } = this.state;
    // creating a copy of the current chartData on the state,
    // to update its structure
    const newChartData = { ...chartData };

    if (contributors.length) {
      // this code is a bit messy I know, but I have to set a new array
      // for each data set with individual configuration for each color...
      const
        data = [],
        labels = [],
        borderColor = [],
        backgroundColor = [],
        hoverBorderColor = [],
        hoverBackgroundColor = [];
      // creates the data necessary
      // to show the bar chart
      contributors.forEach((user) => {
        const baseColor = generateRgbaColor();
        labels.push(user.login);
        data.push(user.contributions);
        borderColor.push(`rgba(${baseColor},1)`);
        backgroundColor.push(`rgba(${baseColor},0.2)`);
        hoverBorderColor.push(`rgba(${baseColor},1)`);
        hoverBackgroundColor.push(`rgba(${baseColor},0.4)`);
      });
      // feeds the new data set object with all generated data arrays
      newChartData.labels = labels;
      // we only have one data set here, the contributions for each user to the repo
      newChartData.datasets = [{
        borderWidth: 1, label: 'Contributions',
        data, borderColor, backgroundColor, hoverBorderColor, hoverBackgroundColor,
      }];
      this.setState({ chartData: newChartData });
    }
  };
}

RepoStats.propTypes = {
  repo: propTypes.object
};

export default RepoStats;