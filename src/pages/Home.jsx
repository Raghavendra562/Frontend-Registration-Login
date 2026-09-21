import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getUser } from '../api.js'

export default function Home() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const [profile, setProfile] = useState(null)
  const [profileError, setProfileError] = useState('')

  useEffect(() => {
    document.title = 'Home | Registration'
    if (!username) return
    getUser(username)
      .then(setProfile)
      .catch(() => setProfileError('Unable to load profile details'))
  }, [username])

  function handleLogout() {
    localStorage.removeItem('username')
    navigate('/login', { replace: true })
  }

  if (!username) {
    return <Navigate to="/login" replace />
  }

  const displayName = profile ? profile.name : username
  const initial = (displayName && displayName.charAt(0).toUpperCase()) || 'U'

  return (
    <div className="container">
      <div className="card home-card">
        <div className="avatar">{initial}</div>
        <h2>Home</h2>
        <p className="welcome">Welcome, {displayName}</p>

        {profile ? (
          <div className="profile">
            <div className="profile-row">
              <span>Username</span>
              <strong>{profile.name}</strong>
            </div>
            <div className="profile-row">
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>
            <div className="profile-row">
              <span>Phone</span>
              <strong>{profile.phone}</strong>
            </div>
          </div>
        ) : (
          <p className="profile-note">{profileError || 'Loading profile…'}</p>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}