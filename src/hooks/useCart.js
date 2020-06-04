import { useSelector } from 'react-redux';

const useCart = () => useSelector(state => state.cartReducer);

export default useCart;