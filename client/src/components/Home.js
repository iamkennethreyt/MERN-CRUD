import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../actions/userActions";
import { Link } from "react-router-dom";

class Home extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-between">
          <div>
            <h1>CREATE READ UPDATE DELETE</h1>
            <h4>
              using MongoDB, Express.js, React.js with Redux and Node.js (MERN)
            </h4>
          </div>
          <div>
            <Link to="/register" className="btn btn-outline-warning mr-1">
              ADD
            </Link>
          </div>
        </div>
        <ul className="list-group">
          {this.props.users.map((user, i) => {
            return (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {user.firstname + " " + user.lastname}
                <p>
                  <Link
                    to={`/edit/${user._id}`}
                    className="btn btn-sm btn-outline-primary mr-1"
                  >
                    edit
                  </Link>
                  <Link
                    to={`/profile/${user._id}`}
                    className="btn btn-sm btn-outline-secondary mr-1"
                  >
                    view
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger mr-1"
                    onClick={() => this.props.deleteUser(user._id)}
                  >
                    delete
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

Home.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(
  mapStateToProps,
  { getUsers, deleteUser }
)(Home);
