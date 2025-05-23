import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create company. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Your Company Name</h1>
          <p className="text-gray-500 max-w-md">
            What would you like to give your company name? You can change this later.
          </p>
        </section>

        <form
          onSubmit={e => {
            e.preventDefault();
            registerNewCompany();
          }}
          className="space-y-6 max-w-md"
        >
          <div>
            <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="JobHunt, Microsoft etc."
              required
              className="mt-1"
            />
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" type="button" onClick={() => navigate('/admin/companies')}>
              Cancel
            </Button>
            <Button type="submit" disabled={!companyName.trim()}>
              Continue
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CompanyCreate;
