import React from 'react';

class Loading extends React.Component {
  state = {
    count: 0,
    dots: ['.', '..', '...']
  };

  loadingInterval = null;

  componentDidMount() {
    this.loadingInterval = setInterval(
      () => this.setState(({ count }) => ({ count: count + 1 })),
      250
    );
  }

  componentWillUnmount() {
    clearInterval(this.loadingInterval);
  }

  render() {
    return <div>{`Loading${this.state.dots[this.state.count % 3]}`}</div>;
  }
}

export default Loading;
