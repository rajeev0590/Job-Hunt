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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-64"
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Filter companies by name"
          />
          <Button onClick={() => navigate('/admin/companies/create')} className="whitespace-nowrap">
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </main>
    </div>
  );
};

export default Companies;
