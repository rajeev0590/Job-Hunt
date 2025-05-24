import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto w-full rounded border border-gray-200 shadow-sm">
      <Table className="min-w-full border-collapse">
        <TableCaption className="text-sm text-gray-500 py-2">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap px-4 py-3 text-left min-w-[160px] max-w-[240px]">Company Name</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-left min-w-[160px] max-w-[240px]">Role</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-left min-w-[130px]">Date</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-right min-w-[90px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id} className="even:bg-gray-50">
              <TableCell
                className="whitespace-nowrap px-4 py-2 max-w-[240px] truncate"
                title={job?.company?.name}
                style={{ maxWidth: '240px' }}
              >
                {job?.company?.name}
              </TableCell>
              <TableCell
                className="whitespace-nowrap px-4 py-2 max-w-[240px] truncate"
                title={job?.title}
                style={{ maxWidth: '240px' }}
              >
                {job?.title}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2 min-w-[130px]">
                {job?.createdAt?.split('T')[0]}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2 text-right min-w-[90px]">
                <Popover>
                  <PopoverTrigger>
                    <button
                      aria-label="Open job actions"
                      className="p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <MoreHorizontal />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-36" side="bottom" align="end">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-2 cursor-pointer px-3 py-2 mt-2 hover:bg-gray-100 rounded"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
