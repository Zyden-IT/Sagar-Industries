// components/common/DateRangePickerSelect.jsx
import React, { useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme css

const DateRangePickerSelect = ({
  value,
  isOpen,
  onToggle,
  onSelect,
  changeIsOpenFalse,
}) => {
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        changeIsOpenFalse();
        console.log("clicked outside");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [changeIsOpenFalse]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB"); // DD/MM/YYYY

  return (
    <div className="relative" onClick={onToggle}>
      <div className="cursor-pointer">
        {formatDate(value[0].startDate)} - {formatDate(value[0].endDate)}
      </div>

      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute z-10 bg-card border border-border rounded-xl shadow-card top-[100%] left-1/2 translate-x-[-50%]"
        >
          <DateRange
            ranges={value}
            onChange={(item) => onSelect([item.selection])}
            moveRangeOnFirstSelection={false}
            rangeColors={["#FF6B1A"]}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePickerSelect;
