import React, { useEffect, useState } from "react";
import AddNote from "./AddNote";
import NoteCard from "./NoteCard";

function Note(props) {
  const user_key = props.userKey;
  const [notes, setNotes] = useState([]);
  const [notesJSX, setNotesJSX] = useState();
  const getNotesForUsers = async (user_key) => {
    await fetch(
      `http://127.0.0.1:8000/note/view_user_notes?user_key=${user_key}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setNotes(data.notes);
          setNotesJSX(
            data.notes.map((note) => {
              console.log(note.note_title);
              return <NoteCard noteTitle={note.note_title} id={note.id} />;
            })
          );
        }
      });
  };

  useEffect(() => {
    getNotesForUsers(user_key);
  }, [user_key]);
  return (
    <div className="note container">
      <div className="container d-flex align-items-center justify-content-between">
        <h1>Your Notes</h1>
        <button
          className="btn btn-primary float-right"
          data-toggle="modal"
          data-target="#addNote"
        >
          Add Note
        </button>

        <AddNote userKey={user_key} />
      </div>
      <div className="container row d-flex justify-content-center align-items-center">
        {notesJSX}
      </div>
    </div>
  );
}

export default Note;
