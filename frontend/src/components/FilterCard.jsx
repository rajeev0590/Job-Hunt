import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
];

const FilterCard = () => {
    const [selectedValues, setSelectedValues] = useState({
        Location: '',
        Industry: '',
    });
    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        setSelectedValues(prev => ({
            ...prev,
            [filterType]: value,
        }));
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValues));
    }, [selectedValues, dispatch]);

    return (
        <div className="w-full max-w-md bg-white p-4 rounded-md shadow-sm mx-auto sm:mx-0">
            <h1 className="font-bold text-xl mb-4">Filter Jobs</h1>
            <hr className="mb-4" />
            {filterData.map((data, index) => (
                <div key={index} className="mb-6">
                    <h2 className="font-semibold text-lg mb-3">{data.filterType}</h2>
                    <RadioGroup
                        value={selectedValues[data.filterType]}
                        onValueChange={(value) => changeHandler(data.filterType, value)}
                    >
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={itemId} className="flex items-center space-x-2 mb-3">
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId} className="cursor-pointer">
                                        {item}
                                    </Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
