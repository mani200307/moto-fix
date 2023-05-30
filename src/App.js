import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Signup from './pages/Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import PrivateRoute from './privateRoute/PrivateRoute'

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path='/home' element={<PrivateRoute />}>
            <Route exact path='/home' element={<Home />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Login />} />
          <Route exact path='/search' element={<PrivateRoute />}>
            <Route exact path='/search' element={<Search />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App