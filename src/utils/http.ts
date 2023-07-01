import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/contance/httpStatusCode'
import {
  getAccessTokenFromLS,
  getUserFromLS,
  removeAccessTokenAndUserToLS,
  setAccessTokenAndUserToLS
} from './auth'
import { AuthResponse } from 'src/types/auth.type'
import User from 'src/types/user.type'
import path from 'src/contance/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private user: User
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.user = getUserFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = this.accessToken
      }

      return config
    })

    this.instance.interceptors.response.use(
      (response) => {
        const url = response.config.url
        if (url === path.login || url === path.register) {
          const data = (response.data as AuthResponse).data
          this.accessToken = data.access_token
          this.user = data.user
          setAccessTokenAndUserToLS(this.accessToken, this.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          removeAccessTokenAndUserToLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
