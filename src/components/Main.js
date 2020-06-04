import React, { useEffect, Suspense, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch, fetchItens, showCart, reloadTotalPrice } from 'store';
import styled from 'styled-components';
import { SearchDialog, CartDialog, Dialog, Loading, Header } from 'components';

const Main = ({ children }) => {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const { search_bar } = selector.searchReducer;
    const { show_cart } = selector.cartReducer;
    const itens = selector.itensReducer

    useEffect(() => {
        dispatch(fetchItens());
        dispatch(reloadTotalPrice());
    }, [dispatch])

    const closeSearchDialog = useCallback(() => {
        dispatch(setSearch(false));
    }, [dispatch])

    const closeCartDialog = useCallback(() => {
        dispatch(showCart(false));
    }, [dispatch])

    if (itens.length > 0)
        return (
            <Fragment>
                <Header />
                <Suspense fallback={<Loading />}>
                    <DummyContainer height={64} />
                    <MainContent>
                        <Dialog active={search_bar} component={SearchDialog} closeDialog={closeSearchDialog} />
                        <Dialog active={show_cart} component={CartDialog} closeDialog={closeCartDialog} />
                        {children}
                    </MainContent>
                </Suspense>
            </Fragment>
        )
    else
        return <Loading />

}

const DummyContainer = styled.div`
    width: ${({ width }) => width + 'px' || 'auto'};
    height: ${({ height }) => height + 'px' || 'auto'};
`;

const MainContent = styled.main`
    display: flex;
    position: relative;
`;

export default Main;