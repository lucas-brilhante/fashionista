import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {Header} from 'components';
import {Home, ProductInfo} from 'pages';
import { Provider } from 'react-redux';
import store from 'redux/store';
import {fetchItens} from 'redux/index';


const App = () => {
    store.dispatch(fetchItens());
    return (
        <Provider store={store}>
            <Fragment>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/product/:id" component={ProductInfo} />
                    </Switch>
                </BrowserRouter>
            </Fragment>
        </Provider>
    );
}

export default App;