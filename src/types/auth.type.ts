import User from './user.type'
import { SuccessResponseAPI } from './utils.type'

export type AuthResponse = SuccessResponseAPI<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>
