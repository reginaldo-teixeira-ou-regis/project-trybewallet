import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER:
    return action.payload;
  default:
    return state;
  }
}

export default userReducer;
