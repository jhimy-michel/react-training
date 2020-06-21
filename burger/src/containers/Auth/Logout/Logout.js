import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../../store/actions";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}
const maptToDispatchToProps = (dispatch) => {
  return { onLogout: () => dispatch(logout()) };
};

export default connect(null, maptToDispatchToProps)(Logout);
