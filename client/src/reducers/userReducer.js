import {
  GET_USER,
  GET_USERS,
  POST_USER,
  DELETE_USER,
  PUT_USER
} from "../actions/types";
const initialState = {
  users: [],
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case POST_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };

    case PUT_USER:
      return {
        ...state,
        users: [
          action.payload,
          ...state.users.filter(user => user._id !== action.payload)
        ]
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    default:
      return state;
  }
}
