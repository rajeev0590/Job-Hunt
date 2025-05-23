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
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies || []);
  const navigate = useNavigate();

  useEffect(() => {
    if (!companies) return setFilteredCompanies([]);
    const filtered = companies.filter(company => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-full border-collapse border border-gray-200">
        <TableCaption className="text-sm text-gray-500 text-center">
          A list of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 px-3 py-2">Logo</TableHead>
            <TableHead className="whitespace-nowrap px-3 py-2">Name</TableHead>
            <TableHead className="whitespace-nowrap px-3 py-2">Date</TableHead>
            <TableHead className="text-right w-20 px-3 py-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map(company => (
              <TableRow key={company._id} className="hover:bg-gray-50">
                <TableCell className="p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={company.logo} alt={`${company.name} logo`} />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-gray-900 px-3 py-2 break-words max-w-xs">
                  {company.name}
                </TableCell>
                <TableCell className="text-gray-600 px-3 py-2 whitespace-nowrap">
                  {company.createdAt?.split("T")[0] || 'N/A'}
                </TableCell>
                <TableCell className="text-right pr-4 px-3 py-2">
                  <Popover>
                    <PopoverTrigger>
                      <button
                        aria-label={`Open actions for ${company.name}`}
                        className="p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-full cursor-pointer px-2 py-1 hover:bg-gray-100 rounded select-none"
                        role="button"
                        tabIndex={0}
                        onKeyPress={e => {
                          if (e.key === 'Enter') navigate(`/admin/companies/${company._id}`);
                        }}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
