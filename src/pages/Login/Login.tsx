import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { InferType } from 'yup'
import { useMutation } from '@tanstack/react-query'
import Input from 'src/components/Input'
import { loginShema } from 'src/utils/rules'
import { login } from 'src/apis/auth.api'
import { isUnprocessableEntityAxiosError } from 'src/utils/utils'
import { ResponseAPI } from 'src/types/utils.type'

type FormData = InferType<typeof loginShema>

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginShema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => console.log(data),
      onError: (error) => {
        if (isUnprocessableEntityAxiosError<ResponseAPI<FormData>>(error)) {
          const formData = error.response?.data.data
          if (formData) {
            Object.keys(formData).forEach((key) => {
              setError(key as keyof FormData, {
                message: formData[key as keyof FormData]
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-24'>
          <div className='lg:col-span-2 lg:col-start-4 '>
            <form
              noValidate
              onSubmit={onSubmit}
              className='border-sm flex flex-col justify-center rounded border bg-white px-4 py-8 shadow-md'
            >
              <div className=' text-3xl'>Đăng nhập</div>
              <Input
                type='email'
                name='email'
                register={register}
                className='mt-8'
                message={errors.email?.message}
                placeholder='Email'
              />
              <Input
                type='password'
                name='password'
                register={register}
                className='mt-3'
                message={errors.password?.message}
                placeholder='Password'
              />

              <button className='mt-4 w-full rounded bg-red-500 p-3 text-white hover:bg-red-700'>
                Đăng nhập
              </button>
              <div className='mt-8 flex items-center justify-center'>
                <div className='text-gray-400'>Bạn chưa có tài khoản?</div>
                <Link to={'/register'} className='text-orange ml-1'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
