// import React, { useEffect } from 'react';
// import Navbar from '../shared/Navbar';
// import ApplicantsTable from './ApplicantsTable';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT } from '@/utils/constant';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAllApplicants } from '@/redux/applicationSlice';

// const Applicants = () => {
//   const params = useParams();
//   const dispatch = useDispatch();
//   const { applicants } = useSelector((store) => store.application);

//   useEffect(() => {
//     const fetchAllApplicants = async () => {
//       try {
//         const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
//           withCredentials: true,
//         });
//         dispatch(setAllApplicants(res.data.job));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchAllApplicants();
//   }, [params.id, dispatch]);

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Navbar />
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
//         <h1 className="font-bold text-xl my-5 sm:text-2xl truncate">
//           Applicants {applicants?.applications?.length || 0}
//         </h1>
//         <div className="overflow-x-auto">
//           <ApplicantsTable />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Applicants;


import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true,
        });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
        {/* pt-24 (6rem) padding-top added to avoid clipping with fixed navbar */}
        <h1 className="font-bold text-xl sm:text-2xl mb-6 truncate">
          Applicants {applicants?.applications?.length || 0}
        </h1>
        <div className="overflow-x-auto w-full">
          <ApplicantsTable />
        </div>
      </main>
    </div>
  );
};

export default Applicants;
