import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, ProductInfo } from 'pages';
import { Dialog } from 'components';
import { connect } from 'react-redux';
import { setSearch } from 'redux/index';
import styled from 'styled-components';
import {SearchDialog} from 'components';

const Main = ({ search_bar, setSearch }) => {

    const closeDialog = () => {
        setSearch(false);
    }

    return (
        <Fragment>
            <DummyContainer height={64}/>
            <MainContent>
                <Dialog active={search_bar} component={SearchDialog} closeDialog={closeDialog} />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/product/:id" component={ProductInfo} />
                </Switch>
            </MainContent>
        </Fragment>
    );
}

const DummyContainer = styled.div`
    width: ${({width}) => width+'px' || 'auto'};
    height: ${({height}) => height+'px' || 'auto'};
`;

const MainContent = styled.main`
    display: flex;
    
`;

const mapStateToProps = state => ({
    search_bar: state.searchReducer.search_bar
});

const mapDispatchToProps = dispatch => ({
    setSearch: (value) => dispatch(setSearch(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);