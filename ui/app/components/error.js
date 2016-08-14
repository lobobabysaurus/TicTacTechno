import React from 'react';


export default class Error extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: props.children || '' };
  }

  componentWillReceiveProps = (props) => {
    this.setState({ text: props.children || '' });
  }

  render() {
    return <small className='error-message'>{this.state.text}</small>;
  }

}
