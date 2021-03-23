import React, { useState } from "react";
import getCookie from "../../csrftoken";

function AddNote(props) {
  const userKey = props.userKey;
  const [noteTitle, setNoteTitle] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [answerContent, setAnswerContent] = useState("");

  const renderAddNote = () => {
    return (
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Note Title</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Note Title"
            value={noteTitle}
            onChange={(e) => {
              setNoteTitle(e.target.value);
            }}
          />
        </div>
        <hr />
      </form>
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
      }),
    };

    fetch(
      `http://127.0.0.1:8000/note/create_note?user_key=${userKey}`,
      requestOptions
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          alert("Errors");
        }
      })
      .then((data) => console.log(data));
  };

  return (
    <div
      class="modal fade"
      id="addNote"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
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
