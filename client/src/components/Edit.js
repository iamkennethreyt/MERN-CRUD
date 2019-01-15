import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { EditUser, getUser } from "../actions/userActions";

class Edit extends Component {
  state = {
    firstname: "",
    lastname: "",
    _id: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.user) {
      const { firstname, lastname, _id } = nextProps.user;
      this.setState({ firstname, lastname, _id });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const newData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      _id: this.state._id
    };

    this.props.EditUser(newData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const { error } = this.props.errors;
    return (
      <div className="container">
        {error ? (
          <h1>{error}</h1>
        ) : (
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
        )}
      </div>
    );
  }
}

Edit.propTypes = {
  EditUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  user: state.users.user
});

export default connect(
  mapStateToProps,
  { EditUser, getUser }
)(Edit);
