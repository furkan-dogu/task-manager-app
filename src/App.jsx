import { Provider } from 'react-redux'
import AppRouter from './router/AppRouter'
import store, { persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
      <Toaster 
        toastOptions={{
          className: '',
          style: {
            fontSize: '13px',
          },
        }}
      />
    </>
  )
}

export default App
