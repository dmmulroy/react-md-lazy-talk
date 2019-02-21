import React from 'react';

import Loading from '../Loading';
const UserProfile = React.lazy(() => import('../Profile'));
const Repos = React.lazy(() => import('../Repos'));

const appStyles = {
  marginTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const searchStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  WebKitBorderRadius: '4px',
  MozBorderRadius: '4px',
  borderRadius: '4px',
  border: '1px solid #ececec',
  padding: '5px',
  backgroundColor: '#fefefe'
};

const iconStyles = {
  margin: '10px',
  fontSize: '78px'
};

class App extends React.Component {
  state = {
    searchValue: '',
    profile: {
      data: {},
      error: null,
      isFetching: false
    },
    repos: {
      data: [],
      error: null,
      isFetching: false
    }
  };

  onChange = e => this.setState({ searchValue: e.target.value });

  onSubmit = async e => {
    e.preventDefault();

    // Reset state
    this.setState({
      profile: {
        data: {},
        error: null,
        isFetching: true
      },
      repos: {
        data: [],
        error: null,
        isFetching: false
      }
    });

    const profileRes = await fetch(
      `https://api.github.com/users/${this.state.searchValue}`
    );

    if (profileRes.status === 200) {
      const profile = await profileRes.json();

      this.setState({
        profile: { data: profile, isFetching: false, error: null },
        repos: { isFetching: true }
      });

      const reposRes = await fetch(profile.repos_url);

      if (reposRes.status === 200) {
        const repos = await reposRes.json();

        this.setState({
          repos: { data: repos, isFetching: false, error: null }
        });
      }
    }
  };

  render() {
    const profileDataLoaded =
      !this.state.profile.isFetching &&
      !this.state.profile.error &&
      Object.entries(this.state.profile.data).length > 0;

    const reposDataLoaded =
      !this.state.repos.isFetching &&
      !this.state.repos.error &&
      this.state.repos.data.length > 0;

    return (
      <div style={appStyles}>
        <div style={searchStyles}>
          <i className="fab fa-github" style={iconStyles} />
          <form>
            <input
              type="text"
              placeholder="Search for a github user"
              onChange={this.onChange}
              value={this.state.value}
            />
            <br />
            <button
              style={{ width: '100%', marginBottom: '5px' }}
              onClick={this.onSubmit}
            >
              Search
            </button>
          </form>
        </div>
        <br />
        {profileDataLoaded && (
          <React.Suspense fallback={<Loading />}>
            <UserProfile
              avatarURL={this.state.profile.data.avatar_url}
              profileURL={this.state.profile.data.html_url}
              name={this.state.profile.data.name}
              bio={this.state.profile.data.bio}
            />
          </React.Suspense>
        )}
        <br />
        {reposDataLoaded && (
          <React.Suspense fallback={<Loading />}>
            <Repos data={this.state.repos.data} />
          </React.Suspense>
        )}
      </div>
    );
  }
}

export default App;
