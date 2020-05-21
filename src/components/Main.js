import React, { useEffect, Suspense, useCallback } from 'react';
import { Dialog } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch, fetchItens, showCart, reloadTotalPrice } from 'redux/index';
import styled from 'styled-components';
import { SearchDialog, CartDialog } from 'components';
import { Loading, Routes } from 'components';

const Main = () => {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const { search_bar } = selector.searchReducer;
    const { show_cart } = selector.cartReducer;
    const itens = selector.itemReducer

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
            <Suspense fallback={<Loading />}>
                <DummyContainer height={64} />
                <MainContent>
                    <Dialog active={search_bar} component={SearchDialog} closeDialog={closeSearchDialog} />
                    <Dialog active={show_cart} component={CartDialog} closeDialog={closeCartDialog} />
                    <Routes />
                </MainContent>
            </Suspense>
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