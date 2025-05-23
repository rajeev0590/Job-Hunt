import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='w-full max-w-full h-auto min-h-64 p-4 sm:p-5 rounded-lg shadow-md bg-white border border-gray-100 cursor-pointer flex flex-col justify-between transition-all hover:shadow-lg'
        >
            <div className='mb-2'>
                <h1 className='font-semibold text-base sm:text-lg'>{job?.company?.name}</h1>
                <p className='text-xs sm:text-sm text-gray-500'>India</p>
            </div>

            <div className='flex-1 mb-2'>
                <h2 className='font-bold text-base sm:text-lg mb-1'>{job?.title}</h2>
                <p
                    className='text-xs sm:text-sm text-gray-600 overflow-hidden'
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {job?.description}
                </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-3'>
                <Badge className='text-blue-700 font-semibold text-xs sm:text-sm' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-semibold text-xs sm:text-sm' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='text-[#7209b7] font-semibold text-xs sm:text-sm' variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
