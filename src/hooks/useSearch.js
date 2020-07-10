import { useSelector } from 'react-redux'

// Get searchReducer from redux

const useSearch = () => useSelector((state) => state.searchReducer)

export default useSearch
