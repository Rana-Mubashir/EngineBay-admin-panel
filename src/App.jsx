import React from 'react'
import AddProductForm from './components/AddProductForm'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
