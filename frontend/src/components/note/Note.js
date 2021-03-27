import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import urls from "../../urls";
import AddNote from "./AddNote";
import NoteCard from "./NoteCard";

function Note() {
  const userKey = useSelector((state) => state.userKey);
  const [notes, setNotes] = useState([]);
  const [notesJSX, setNotesJSX] = useState();
  const [showModal, setShowModal] = useState(false);
  const [reRender, setReRender] = useState(false);
  const getNotesForUsers = async (userKey) => {
    await fetch(urls.get_user_note(userKey))
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
          onClick={() => setShowModal(true)}
        >
          Add Note
        </button>

        {showModal && (
          <AddNote setShowModal={setShowModal} setReRender={setReRender} />
        )}
      </div>
      <div className="container row d-flex justify-content-center align-items-center">
        {notesJSX}
      </div>
    </div>
  );
}

export default Note;
