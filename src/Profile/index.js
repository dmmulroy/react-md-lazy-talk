import React from 'react';

const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  WebKitBorderRadius: '4px',
  MozBorderRadius: '4px',
  borderRadius: '4px',
  border: '1px solid #ececec',
  padding: '5px',
  backgroundColor: '#fefefe'
};

const Profile = ({ avatarURL, profileURL, name, bio }) => (
  <div style={styles}>
    <img
      style={{ padding: '5px' }}
      height="64px"
      width="64px"
      src={avatarURL}
      alt={name}
    />
    <h3 style={{ display: 'inline-block', margin: 0 }}>
      <a href={profileURL}>{name}</a>
    </h3>
    <p>{bio}</p>
  </div>
);

export default Profile;
