import User from 'src/types/user.type'

export const getAccessTokenFromLS = () => {
  const accessToken = localStorage.getItem('access_token') ?? ''
  return accessToken
}

export const getUserFromLS = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : undefined
}

export const setAccessTokenAndUserToLS = (accessToken: string, user: User) => {
  const userJson = JSON.stringify(user)
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('user', userJson)
}

export const removeAccessTokenAndUserToLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}
