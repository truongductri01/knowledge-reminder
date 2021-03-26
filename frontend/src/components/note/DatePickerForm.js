import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function DatePickerForm(props) {
  let date = props.date;
  const setDate = props.setDate;
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />
  );
}

export default DatePickerForm;
