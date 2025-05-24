import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 w-full max-w-full px-4 sm:px-6 lg:px-8 pt-6 pb-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">

          {/* Responsive container for search input and button */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">

            <Input
              className="flex-grow min-w-[200px] max-w-full sm:max-w-xs"
              placeholder="Filter by name, role"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              onClick={() => navigate('/admin/jobs/create')}
              className="w-full sm:w-auto whitespace-nowrap"
            >
              New Job
            </Button>

          </div>

          {/* Table wrapper - horizontal scroll on small screens */}
          <div className="overflow-x-auto w-full">
            <AdminJobsTable />
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminJobs;
