import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, ProductInfo } from 'pages';
import { Dialog } from 'components';
import { connect } from 'react-redux';
import { setSearch, fetchItens, showCart, reloadTotalPrice } from 'redux/index';
import styled from 'styled-components';
import { SearchDialog, CartDialog } from 'components';

const Main = ({ search_bar, show_cart, itens, setSearch, fetchItens, showCart, reloadTotalPrice }) => {

    useEffect(() => {
        fetchItens();
        reloadTotalPrice();
    }, [fetchItens, reloadTotalPrice])

    const closeSearchDialog = () => {
        setSearch(false);
    }

    const closeCartDialog = () => {
        showCart(false);
    }

    if (itens)
        return (
            <Fragment>
                <DummyContainer height={64} />
                <MainContent id="Main">
                    <Dialog active={search_bar} component={SearchDialog} closeDialog={closeSearchDialog} />
                    <Dialog active={show_cart} component={CartDialog} closeDialog={closeCartDialog} />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/product/:id" component={ProductInfo} />
                    </Switch>
                </MainContent>
            </Fragment>)
    else
        return null;

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