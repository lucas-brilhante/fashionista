import React, { useEffect, Suspense, useCallback } from 'react';
import { Dialog } from 'components';
import { connect } from 'react-redux';
import { setSearch, fetchItens, showCart, reloadTotalPrice } from 'redux/index';
import styled from 'styled-components';
import { SearchDialog, CartDialog } from 'components';
import { Loading, Routes } from 'components';

const Main = ({ search_bar, show_cart, itens, setSearch, fetchItens, showCart, reloadTotalPrice }) => {

    useEffect(() => {
        fetchItens();
        reloadTotalPrice();
    }, [fetchItens, reloadTotalPrice])

    const closeSearchDialog = useCallback(() => {
        setSearch(false);
    }, [setSearch])

    const closeCartDialog = useCallback(() => {
        showCart(false);
    }, [showCart])

    if (itens.length > 0)
        return (
            <Suspense fallback={<Loading />}>
                <DummyContainer height={64} />
                <MainContent id="Main">
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

const mapStateToProps = state => ({
    search_bar: state.searchReducer.search_bar,
    show_cart: state.cartReducer.show_cart,
    itens: state.itemReducer
});

const mapDispatchToProps = dispatch => ({
    setSearch: (value) => dispatch(setSearch(value)),
    fetchItens: () => dispatch(fetchItens()),
    showCart: (value) => dispatch(showCart(value)),
    reloadTotalPrice: () => dispatch(reloadTotalPrice())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);