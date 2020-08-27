import { FETCH_ITEMS } from '../actions/types';

export default function itemsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload;

    default:
      return state;
  }
}
