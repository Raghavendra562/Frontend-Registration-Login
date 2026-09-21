import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const onHome = location.pathname === '/home'

  function handleLogout() {
    localStorage.removeItem('username')
    navigate('/login', { replace: true })
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to={username ? '/home' : '/login'} className="brand">
          Registration
        </Link>
        {onHome && (
          <nav className="site-nav">
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}