"use client"
import DashNav from './DashNav'
import withAuth from '@/utils/withAuth'

const layout = ({ children }) => {
    return (
        <div>
            <div className='flex '>
                <div className='w-[20vw]'>
                <DashNav />
                </div>
                
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default withAuth(layout, ['admin']);