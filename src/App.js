import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Signup from './pages/Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import StoreSignup from './pages/StoreSignup'
import UserRoute from './privateRoute/UserRoute'
import StoreLogin from './pages/StoreLogin'
import StoreRoute from './privateRoute/StoreRoute'
import StoreHome from './pages/StoreHome'
import Book from './pages/Book'
import UserDetails from './pages/UserDetails'
import MainHome from './pages/MainHome'

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<MainHome />} />
          <Route path='/login' element={<Login />} />
          <Route exact path='/home' element={<UserRoute />}>
            <Route exact path='/home' element={<Home />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route exact path='/store' element={<StoreRoute />}>
            <Route exact path='/store' element={<StoreHome />} />
          </Route>
          <Route path='/store/signup' element={<StoreSignup />} />
          <Route path='/store/login' element={<StoreLogin />} />
          <Route path='/store/accept' element={<UserDetails />} />
          <Route exact path='/search' element={<UserRoute />}>
            <Route exact path='/search' element={<Search />} />
          </Route>
          <Route exact path='/book' element={<UserRoute />}>
            <Route exact path='/book' element={<Book />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App