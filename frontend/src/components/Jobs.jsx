// import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar'
// import FilterCard from './FilterCard'
// import Job from './Job';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';

// const Jobs = () => {
//     const { allJobs, searchedQuery } = useSelector(store => store.job);
//     const [filterJobs, setFilterJobs] = useState(allJobs);

//     useEffect(() => {
//         if (searchedQuery) {
//             const filteredJobs = allJobs.filter((job) => {
//                 return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//             })
//             setFilterJobs(filteredJobs)
//         } else {
//             setFilterJobs(allJobs)
//         }
//     }, [allJobs, searchedQuery]);

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8'>
//                 <div className='flex flex-col md:flex-row gap-5'>
//                     {/* Sidebar FilterCard */}
//                     <div className='w-full md:w-1/4 lg:w-1/5'>
//                         <FilterCard />
//                     </div>

//                     {/* Jobs Listing */}
//                     <div className='flex-1 pb-5'>
//                         {filterJobs.length === 0 ? (
//                             <div className="flex items-center justify-center h-[80vh]">
//                                 <span className="text-gray-600 text-lg font-medium">Job not found</span>
//                             </div>
//                         ) : (
//                             <div className='h-[80vh] overflow-y-auto'>
//                                 <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//                                     {filterJobs.map((job) => (
//                                         <motion.div
//                                             initial={{ opacity: 0, x: 100 }}
//                                             animate={{ opacity: 1, x: 0 }}
//                                             exit={{ opacity: 0, x: -100 }}
//                                             transition={{ duration: 0.3 }}
//                                             key={job?._id}
//                                         >
//                                             <Job job={job} />
//                                         </motion.div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Jobs


import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery?.Location || searchedQuery?.Industry) {
            const filtered = allJobs.filter((job) => {
                const locationMatch =
                    searchedQuery.Location === '' ||
                    (job.location &&
                        job.location.toLowerCase().includes(searchedQuery.Location.toLowerCase()));

                const industryMatch =
                    searchedQuery.Industry === '' ||
                    (job.industry &&
                        job.industry.toLowerCase().includes(searchedQuery.Industry.toLowerCase()));

                return locationMatch && industryMatch;
            });
            setFilterJobs(filtered);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col md:flex-row gap-5'>
                    {/* Sidebar FilterCard */}
                    <div className='w-full md:w-1/4 lg:w-1/5'>
                        <FilterCard />
                    </div>

                    {/* Jobs Listing */}
                    <div className='flex-1 pb-5'>
                        {filterJobs.length === 0 ? (
                            <div className="flex items-center justify-center h-[80vh]">
                                <span className="text-gray-600 text-lg font-medium">Job not found</span>
                            </div>
                        ) : (
                            <div className='h-[80vh] overflow-y-auto'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
