import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { Header, Main } from 'components';


const App = () => {
    return (
        <Provider store={store}>
            <Fragment>
                <BrowserRouter>
                    <Header />
                    <Main />
                </BrowserRouter>
            </Fragment>
        </Provider>
    );
}

export default App;