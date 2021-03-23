import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddNote from "./AddNote";
import NoteCard from "./NoteCard";

function Note(props) {
  const userKey = useSelector((state) => state.userKey);
  const [notes, setNotes] = useState([]);
  const [notesJSX, setNotesJSX] = useState();
  const getNotesForUsers = async (userKey) => {
    await fetch(
      `http://127.0.0.1:8000/note/view_user_notes?user_key=${userKey}`
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
              return <NoteCard noteTitle={note.note_title} id={note.id} />;
            })
          );
        }
      });
  };

  useEffect(() => {
    getNotesForUsers(userKey);
  }, [userKey]);
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

        <AddNote userKey={userKey} />
      </div>
      <div className="container row d-flex justify-content-center align-items-center">
        {notesJSX}
      </div>
    </div>
  );
}

export default Note;
