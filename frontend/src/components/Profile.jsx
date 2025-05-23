import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto my-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            {/* Avatar and Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  }
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className="font-semibold text-xl">
                  {user?.fullname || "Unnamed User"}
                </h1>
                <p className="text-gray-600">{user?.profile?.bio || "No bio added"}</p>
              </div>
            </div>

            {/* Edit Button */}
            <Button onClick={() => setOpen(true)} variant="outline">
              <Pen className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-2 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4" />
              <span>{user?.email || "Not provided"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact className="h-4 w-4" />
              <span>{user?.phoneNumber || "Not provided"}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="font-semibold text-md mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, i) => (
                  <Badge key={i}>{skill}</Badge>
                ))
              ) : (
                <span className="text-gray-500">NA</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-6">
            <Label className="text-md font-bold">Resume</Label>
            {isResume && user?.profile?.resume ? (
              <div>
                <a
                  href={user.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline block mt-1"
                >
                  {user?.profile?.resumeOriginalName || "View Resume"}
                </a>
              </div>
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          <h2 className="font-bold text-lg mb-4">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>

      {/* Profile Update Modal */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
