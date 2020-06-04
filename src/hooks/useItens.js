import { useSelector } from 'react-redux';

const useItens = () => useSelector(state => state.itensReducer);

export default useItens;