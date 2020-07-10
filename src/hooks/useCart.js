import { useSelector } from 'react-redux'

// Get cartRefucer from redux

const useCart = () => useSelector((state) => state.cartReducer)

export default useCart
