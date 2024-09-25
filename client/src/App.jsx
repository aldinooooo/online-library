import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
// import axios from 'axios'
// import {Toaster} from 'react-hot-toast'

// axios.defaults.baseURL= 'http://localhost:5000'
// axios.defaults.withCredentials = true //watch out for this

function App(){
  return(
    <Router>
      <Navbar/>
      {/* <Toaster position='bottom-right' toastOptions={{duration:2000}}/> */}
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='Dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}
  
export default App
