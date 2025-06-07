import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer, } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Buycredit from './pages/BuyCedit'
import Result from './pages/result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'

const App = () => {

  const {showLogin} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:-px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path = '/' element ={<Home/>}/>
        <Route path = '/Buy' element ={ <Buycredit/>}/>
        <Route path = '/Result' element ={ <Result/>}/>
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
