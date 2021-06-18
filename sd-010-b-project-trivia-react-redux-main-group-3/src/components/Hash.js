import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Hash extends Component {
  render() {
    const { getEmail } = this.props;
    const opa = md5(getEmail).toString();
    console.log(opa);
    return (
      <div>
        { getEmail }
      </div>
    );
  }
}

Hash.propTypes = {
  getEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.loginReducer.email,
});

export default connect(mapStateToProps)(Hash);
