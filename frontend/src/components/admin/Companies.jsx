import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {/* padding-top matches navbar height (e.g., 64px or 4rem) */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <Input
            className="w-full sm:max-w-xs"
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Filter companies by name"
          />
          <Button onClick={() => navigate('/admin/companies/create')} className="w-full sm:w-auto">
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </main>
    </div>
  );
};

export default Companies;
