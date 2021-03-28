import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerFilter(props) {
  let filterDate = props.filterDate;
  const setFilterDate = props.setFilterDate;
  return (
    <DatePicker
      dateFormat="MM/dd/yyyy"
      selected={filterDate}
      onChange={(date) => setFilterDate(date)}
    />
  );
}

export default DatePickerFilter;
