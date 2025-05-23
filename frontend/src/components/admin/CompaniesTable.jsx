import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter(company => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="text-sm text-gray-500">
          A list of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Logo</TableHead>
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Date</TableHead>
            <TableHead className="text-right w-20">Action</TableHead>
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
                <TableCell className="font-medium text-gray-900">{company.name}</TableCell>
                <TableCell className="text-gray-600">{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right pr-4">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                        role="button"
                        tabIndex={0}
                        onKeyPress={e => { if (e.key === 'Enter') navigate(`/admin/companies/${company._id}`); }}
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
