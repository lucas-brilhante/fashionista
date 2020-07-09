import React, { useEffect, Suspense, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setSearch, fetchItens, showCart, reloadTotalPrice } from 'store'
import styled from 'styled-components'
import { SearchDialog, CartDialog, Loading, Header } from 'components'
import Dialog from 'components/Dialog'
import { useSearch, useItens, useCart } from 'hooks'
import PropTypes from 'prop-types'

const Main = ({ children }) => {
  const dispatch = useDispatch()
  const { search_bar: searchBar } = useSearch()
  const itens = useItens()
  const { show_cart: showCart_ } = useCart()

  useEffect(() => {
    dispatch(fetchItens())
    dispatch(reloadTotalPrice())
  }, [dispatch])

  const closeSearchDialog = useCallback(() => {
    dispatch(setSearch(false))
  }, [dispatch])

  const closeCartDialog = useCallback(() => {
    dispatch(showCart(false))
  }, [dispatch])

  if (itens.length > 0)
    return (
      <>
        <Header />
        <Suspense fallback={<Loading />}>
          <DummyContainer height={64} />
          <MainContent>
            <Dialog
              active={searchBar}
              component={SearchDialog}
              closeDialog={closeSearchDialog}
            />
            <Dialog
              active={showCart_}
              component={CartDialog}
              closeDialog={closeCartDialog}
            />
            {children}
          </MainContent>
        </Suspense>
      </>
    )
  return <Loading />
}

const DummyContainer = styled.div`
  width: ${({ width }) => `${width}px` || 'auto'};
  height: ${({ height }) => `${height}px` || 'auto'};
`

const MainContent = styled.main`
  display: flex;
  position: relative;
`

Main.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Main
