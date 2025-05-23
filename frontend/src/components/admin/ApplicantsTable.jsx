import React from 'react';
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
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="text-sm text-gray-500">
          A list of your recent applied users
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Full Name</TableHead>
            <TableHead className="whitespace-nowrap hidden sm:table-cell">Email</TableHead>
            <TableHead className="whitespace-nowrap hidden md:table-cell">Contact</TableHead>
            <TableHead className="whitespace-nowrap hidden lg:table-cell">Resume</TableHead>
            <TableHead className="whitespace-nowrap hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants.applications?.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50">
                <TableCell className="whitespace-nowrap">{item?.applicant?.fullname}</TableCell>
                <TableCell className="whitespace-nowrap hidden sm:table-cell">{item?.applicant?.email}</TableCell>
                <TableCell className="whitespace-nowrap hidden md:table-cell">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="whitespace-nowrap hidden lg:table-cell">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap hidden md:table-cell">
                  {item?.applicant?.createdAt?.split('T')[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
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

export default ApplicantsTable;
