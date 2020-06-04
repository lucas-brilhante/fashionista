import { useSelector } from 'react-redux';

const useSearch = () => useSelector(state => state.searchReducer);

export default useSearch;