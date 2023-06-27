import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='bg-orange'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32'>
          <div className='lg:col-span-2 lg:col-start-4 '>
            <form className='border-sm flex flex-col justify-center rounded border bg-white px-4 py-8 shadow-md'>
              <div className='text-3xl'>Đăng ký</div>
              <input
                type='email'
                placeholder='Email'
                className='border-sm outlite-none mt-8 w-full border border-gray-300 p-3 focus:shadow-sm'
              />
              <div className='mt-1 min-h-[1rem] text-red-400'>
                Email không hợp lệ
              </div>
              <input
                type='password'
                placeholder='Password'
                className='border-sm outlite-none mt-4 w-full border border-gray-300 p-3 focus:shadow-sm'
              />
              <div className='mt-1 min-h-[1rem] text-red-400'></div>
              <input
                type='password'
                placeholder='Confirm Password'
                className='border-sm outlite-none mt-4 w-full border border-gray-300 p-3 focus:shadow-sm'
              />
              <div className='mt-1 min-h-[1rem] text-red-400'></div>
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
