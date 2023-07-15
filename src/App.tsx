import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import useRouteElement from './useRouteElement'
import { useContext, useEffect } from 'react'
import { removeLSEventTarget } from './utils/auth'
import { AppContextProvider } from './contexts/AppContext'

function App() {
  const routeElement = useRouteElement()
  const { reset } = useContext(AppContextProvider)

  useEffect(() => {
    removeLSEventTarget.addEventListener('removeLS', reset)
    return () => {
      removeLSEventTarget.removeEventListener('removeLS', reset)
    }
  }, [reset])
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
