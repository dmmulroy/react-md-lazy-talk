import React from 'react';

const listStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  WebKitBorderRadius: '4px',
  MozBorderRadius: '4px',
  borderRadius: '4px',
  border: '1px solid #ececec',
  padding: '10px',
  backgroundColor: '#fefefe'
};

const styles = {
  padding: '5px',
  borderBottom: '1px solid #ececec',
  width: '100%'
};

const Repo = ({ name, link, description, stars }) => (
  <div style={styles}>
    <strong style={{ fontSize: '22px' }}>
      <a href={link}>{name}</a>{' '}
    </strong>
    <span style={{ float: 'right' }}>
      {stars}
      <i className="fas fa-star" style={{ color: 'gold' }} />
    </span>
    <br />
    {description}
    <br />
  </div>
);

const Repos = ({ data }) => (
  <div style={listStyles}>
    {data.map(({ name, description, html_url, stargazers_count }) => (
      <Repo
        key={html_url}
        name={name}
        link={html_url}
        description={description}
        stars={stargazers_count}
      />
    ))}
  </div>
);

export default Repos;
