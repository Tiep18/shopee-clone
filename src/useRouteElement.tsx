import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import RegisterLayout from './Layouts/RegisterLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Profile from './pages/Profile'
import Register from './pages/Register'
import { useContext } from 'react'
import { AppContextProvider } from './contexts/AppContext'
import path from './contance/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './Layouts/CartLayout'

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContextProvider)
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContextProvider)
  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: path.products,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: path.product,
          element: (
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          )
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElement
}
