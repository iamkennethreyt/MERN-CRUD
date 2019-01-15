import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { registerUser } from "../actions/userActions";

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const newData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname
    };

    this.props.registerUser(newData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <form className="border border-light p-5" onSubmit={this.onSubmit}>
          <input
            type="text"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.firstname
            })}
            placeholder="First Name"
            name="firstname"
            value={this.state.firstname}
            onChange={this.onChange}
          />
          {errors.firstname && (
            <div className="invalid-feedback">{errors.firstname}</div>
          )}

          <input
            type="text"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.lastname
            })}
            placeholder="Last Name"
            name="lastname"
            value={this.state.lastname}
            onChange={this.onChange}
          />
          {errors.lastname && (
            <div className="invalid-feedback">{errors.lastname}</div>
          )}

          <button className="btn red accent-4 btn-block mt-4" type="submit">
            Save
          </button>
          <Link to="/" className="btn btn-outline-danger btn-block mt-2">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
