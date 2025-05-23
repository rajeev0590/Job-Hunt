import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.file) {
      formData.append('file', input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      description: singleCompany.description || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: null, // Reset file input, better UX
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-xl mx-auto p-4 sm:p-6 md:p-10">
        <form onSubmit={submitHandler} className="space-y-8">
          <header className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => navigate('/admin/companies')}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 font-semibold text-sm sm:text-base"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-bold">Company Setup</h1>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="mb-1 block">
                Company Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Company name"
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="description" className="mb-1 block">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                type="text"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Brief description"
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="website" className="mb-1 block">
                Website
              </Label>
              <Input
                id="website"
                name="website"
                type="text"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://example.com"
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="location" className="mb-1 block">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="City, Country"
                className="w-full"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="file" className="mb-1 block">
                Logo
              </Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? 'Please wait' : 'Update'}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default CompanySetup;
