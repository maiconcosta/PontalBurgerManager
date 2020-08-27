import { FETCH_ITEMS } from './types';

export const fetchItems = (items) => ({
  type: FETCH_ITEMS,
  payload: items,
});
