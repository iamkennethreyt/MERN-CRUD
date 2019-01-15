import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../actions/userActions";

class View extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    const { firstname, lastname } = this.props.user;
    const { error } = this.props.errors;
    return (
      <div className="container">
        <div className="d-flex justify-content-between">
          {error ? <h1>{error}</h1> : <h1>{firstname + " " + lastname}</h1>}
        </div>
      </div>
    );
  }
}

View.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.users.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUser }
)(View);
