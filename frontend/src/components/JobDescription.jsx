import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // Determine if the user already applied initially
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true); // Update local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...(singleJob?.applications || []), { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // Real-time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to apply for the job");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl">{singleJob?.title || "Loading..."}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              {singleJob?.position} Positions
            </Badge>
            <Badge variant="ghost" className="text-[#F83002] font-bold">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-[#7209b7] font-bold">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? undefined : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-white ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <section className="border-b-2 border-gray-300 mt-8 pb-4">
        <h2 className="font-semibold text-xl">Job Description</h2>
      </section>

      <div className="mt-6 space-y-3 text-gray-800">
        <p>
          <span className="font-bold">Role:</span> {singleJob?.title || "-"}
        </p>
        <p>
          <span className="font-bold">Location:</span> {singleJob?.location || "-"}
        </p>
        <p>
          <span className="font-bold">Description:</span> {singleJob?.description || "-"}
        </p>
        <p>
          <span className="font-bold">Experience:</span>{" "}
          {singleJob?.experience === undefined || singleJob?.experience === 0
            ? "Fresher"
            : `${singleJob.experience} yrs`}
        </p>
        <p>
          <span className="font-bold">Salary:</span> {singleJob?.salary}LPA
        </p>
        <p>
          <span className="font-bold">Total Applicants:</span>{" "}
          {singleJob?.applications?.length || 0}
        </p>
        <p>
          <span className="font-bold">Posted Date:</span>{" "}
          {singleJob?.createdAt
            ? new Date(singleJob.createdAt).toLocaleDateString()
            : "-"}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
