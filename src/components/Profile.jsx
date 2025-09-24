import { useAuth0 } from '@auth0/auth0-react'

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!isAuthenticated) {
    return <div>Пожалуйста, войдите в систему</div>
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <img 
        src={user.picture} 
        alt={user.name} 
        style={{ borderRadius: '50%', width: '100px' }}
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}
