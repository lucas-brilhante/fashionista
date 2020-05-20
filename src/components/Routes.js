import React, { memo, lazy } from "react";
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const ProductInfo = lazy(() => import('pages/ProductInfo'));

const Routes = () => (
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/product/:id">
            <ProductInfo />
        </Route>
    </Switch>
);

export default memo(Routes);