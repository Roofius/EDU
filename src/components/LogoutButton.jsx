import { useAuth0 } from '@auth0/auth0-react'

export const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <button 
      onClick={() => logout({ returnTo: window.location.origin })}
      style={{ padding: '10px 20px', fontSize: '16px' }}
    >
      Выйти
    </button>
  )
}
