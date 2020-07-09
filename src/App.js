import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from 'store'
import Routes from 'components/Routes'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
