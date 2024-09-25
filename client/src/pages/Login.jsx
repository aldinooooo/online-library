import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ()=>{
  const [ username, setUsername]=useState('')
  const [ password, setPassword]=useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/login',{
        username,password
      })
      localStorage.setItem('token',res.data.token)
      navigate('/')
    } catch (err) {
      console.error(err.response.data)
    }
  }

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
        <input type='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
export default Login