"use client"
import DashNav from './DashNav'
import withAuth from '@/utils/withAuth'

const layout = ({ children }) => {
    return (
        <div>
            <div className='flex '>
                <DashNav />
                <div className=''>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default withAuth(layout, ['admin']);