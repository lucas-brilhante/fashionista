import React, { memo, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Main from 'components/Main'

const Home = lazy(() => import('pages/Home'))
const ProductInfo = lazy(() => import('pages/ProductInfo'))
const NotFound = lazy(() => import('pages/NotFound'))

// Handle Routes

const Routes = () => {
  return (
    <Main>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/product/:id'>
          <ProductInfo />
        </Route>
        <Route path='/not-found'>
          <NotFound />
        </Route>
        <Route path='*'>
          <Redirect to='/not-found' />
        </Route>
      </Switch>
    </Main>
  )
}

export default memo(Routes)
