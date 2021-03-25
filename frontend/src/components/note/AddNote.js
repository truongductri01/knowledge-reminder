import React, { useState } from "react";
import { useSelector } from "react-redux";
import getCookie from "../../csrftoken";
import NoteForm from "./NoteForm";

function AddNote() {
  const userKey = useSelector((state) => state.userKey);
  const [noteTitle, setNoteTitle] = useState("");
  const [requestOk, setRequestOk] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const [date, setDate] = useState(new Date());

  const renderAddNote = () => {
    return (
      <NoteForm setNoteTitle={setNoteTitle} date={date} setDate={setDate} />
    );
  };

  const handleSubmit = () => {
    const requestOptions = {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie(),
      },
      body: JSON.stringify({
        note_title: noteTitle,
        created_at: date,
      }),
    };

    fetch(
      `http://127.0.0.1:8000/note/create_note?user_key=${userKey}`,
      requestOptions
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          setRequestOk(true);
          return response.json();
        } else {
          alert("Errors");
        }
      })
      .then((data) => {
        setNoteId(data.pk);
      });
  };

  console.log("Note id >>>", noteId);
  console.log("Note Title >>>", noteTitle);
  console.log("Date >>>", date);
  return (
    <div
      class="modal fade"
      id="addNote"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
        style={{ zIndex: "10000" }}
      >
        <div class="modal-content">
          {/* Header */}
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Add a New Note
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* Body */}
          <div class="modal-body">{renderAddNote()}</div>

          {/* Buttons */}
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
