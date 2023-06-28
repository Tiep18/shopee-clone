import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { registerSchema } from 'src/utils/rules'
import { InferType } from 'yup'

type FormData = InferType<typeof registerSchema>
// interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  console.log(errors)

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
              <div className='text-3xl'>Đăng ký</div>
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
              <Input
                type='password'
                name='confirm_password'
                register={register}
                className='mt-3'
                message={errors.confirm_password?.message}
                placeholder='Confirm Password'
              />

              <button className='mt-4 w-full rounded bg-red-500 p-3 text-white hover:bg-red-700'>
                Đăng ký
              </button>
              <div className='mt-8 flex items-center justify-center'>
                <div className='text-gray-400'>Bạn đã có tài khoản?</div>
                <Link to={'/login'} className='text-orange ml-1'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
