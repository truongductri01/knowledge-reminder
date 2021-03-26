import React, { useState } from "react";
import DatePickerForm from "./DatePickerForm";

function NoteForm(props) {
  const setNoteTitle = props.setNoteTitle;
  const [tempNotetitle, setTempNoteTitle] = useState("");
  const counter = props.counter;
  const setCounter = props.setCounter;
  const setQuestions = props.setQuestions;

  let date = props.date;
  const setDate = props.setDate;

  return (
    <form className="mb-4 ">
      <h5>Note</h5>
      <div class="form-group">
        <label for="exampleInputEmail1">Note Title</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Note Title"
          value={tempNotetitle}
          onChange={(e) => {
            setTempNoteTitle(e.target.value);
            setNoteTitle(e.target.value);
          }}
        />

        <DatePickerForm date={date} setDate={setDate} />

        <button
          className="btn btn-success float-right mt-2"
          onClick={(event) => {
            event.preventDefault();
            // Add new question with the id
            setQuestions((qSet) => {
              const newObject = qSet;
              newObject[counter] = { questionTitle: "", answerContent: "" };
              setCounter(counter + 1);
              return newObject;
            });
          }}
        >
          <strong>Add a Question</strong>
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
