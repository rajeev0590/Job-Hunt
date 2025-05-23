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
    <div className="overflow-x-auto">
      <Table className="min-w-full border border-gray-200">
        <TableCaption className="text-sm text-gray-500">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap px-4 py-2 text-left">Company Name</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-2 text-left">Role</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-2 text-left">Date</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-2 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id} className="even:bg-gray-50">
              <TableCell className="whitespace-nowrap px-4 py-2">{job?.company?.name}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">{job?.title}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {job?.createdAt.split('T')[0]}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2 text-right">
                <Popover>
                  <PopoverTrigger>
                    <button aria-label="Open job actions" className="p-1 rounded hover:bg-gray-200">
                      <MoreHorizontal />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-36">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-2 cursor-pointer px-2 py-1 mt-2 hover:bg-gray-100 rounded"
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
