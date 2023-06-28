import axios, { type AxiosError } from 'axios'

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export const isUnprocessableEntityAxiosError = <T>(
  error: unknown
): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === 422
}
