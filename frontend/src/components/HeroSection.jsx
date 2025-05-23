import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex flex-col gap-5 my-20 max-w-4xl mx-auto">
       <span className="self-center px-4 py-2 rounded-full bg-gray-100 text-orange-600 font-medium inline-block">
  No. 1 Job Hunt Website
</span>


        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-lg text-[#6A38C2]-700 font-medium">
          Land your dream job in just a few clicks — explore top opportunities
          tailored for you!
        </p>
        <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full py-2 text-sm sm:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2] p-3"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
