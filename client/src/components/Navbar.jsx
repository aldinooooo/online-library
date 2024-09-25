import {Link,useNavigate} from 'react-router-dom'

const Navbar = ()=>{
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    return(
        <nav>
            <Link to='/'>Home</Link>
            {!token && (
                <>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
                </>
            )}
            {token &&user.role ==='admin' && 
            <Link to='/dashboard'>Dashboard</Link>}
            {token && 
            <button onClick={handleLogout}> Logout </button>}
        </nav>
    )
}
export default Navbar