import { fetchItems } from '../actions/items';
import api from '../../services/api';

export const fetchAllItems = () => (dispatch) => api.get('items')
  .then((response) => {
    dispatch(fetchItems(response.data));
  })
  .catch((error) => {
    throw error;
  });
