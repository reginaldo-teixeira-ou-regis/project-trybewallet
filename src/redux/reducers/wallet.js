import { WALLET } from '../actions';

const initialState = {
  email: '',
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case WALLET:
    return action.value;
  default:
    return state;
  }
}

export default walletReducer;
