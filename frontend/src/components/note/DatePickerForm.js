import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function DatePickerForm(props) {
  let date = props.date;
  const setDate = props.setDate;
  return (
    <DatePicker
      dateFormat="MM/dd/yyyy"
      selected={date}
      onChange={(date) => setDate(date)}
    />
  );
}

export default DatePickerForm;
