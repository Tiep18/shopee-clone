import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='bg-neutral-100 pb-12 pt-5'>
      <div className='container'>
        <div className='grid grid-cols-5 gap-4'>
          <div className='col-span-1'>
            <UserSideNav />
          </div>
          <div className='col-span-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
