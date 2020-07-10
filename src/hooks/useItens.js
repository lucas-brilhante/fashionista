import { useSelector } from 'react-redux'

// Get itensReducer from redux

const useItens = () => useSelector((state) => state.itensReducer)

export default useItens
