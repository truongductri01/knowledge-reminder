import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import urls from "../../urls";
import AddNote from "./AddNote";
import DatePickerFilter from "./DatePickerFilter";
import NoteCard from "./NoteCard";

function Note() {
  const userKey = useSelector((state) => state.userKey);
  const [notes, setNotes] = useState([]);
  const [canRenderNotes, setCanRenderNotes] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date());
  const [isFiltering, setIsFiltering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sortUp, setSortUp] = useState(true); // start with the biggest elements

  // Fetch the api and get the notes of the user
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
          setCanRenderNotes(true);
        }
      });
  };

  // Fetch new notes set whenever the userKey change
  useEffect(() => {
    getNotesForUsers(userKey);
  }, [userKey]);

  // Render the Note based on filtering conditions
  const renderNotes = () => {
    if (canRenderNotes) {
      if (!isFiltering) {
        return notes.map((note) => {
          return (
            <NoteCard
              noteTitle={note.note_title}
              id={note.id}
              createdAt={note.created_at}
            />
          );
        });
      } else {
        const formatDate = filterDate.toISOString().substring(0, 10);
        console.log("format Date >>>", formatDate);
        return notes.map((note) => {
          if (note.created_at == formatDate) {
            return (
              <NoteCard
                noteTitle={note.note_title}
                id={note.id}
                createdAt={note.created_at}
              />
            );
          }
          return null;
        });
      }
    }
  };

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

        {showModal && <AddNote setShowModal={setShowModal} />}
      </div>
      <div className="container d-flex align-items-center justify-content-between">
        <div className="container d-flex align-items-center p-0">
          <DatePickerFilter
            filterDate={filterDate}
            setFilterDate={setFilterDate}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsFiltering(true)}
          >
            Filter
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => setIsFiltering(false)}
          >
            Clear
          </button>
        </div>
        <img
          src={
            sortUp
              ? "../../static/images/sort-up.svg"
              : "../../static/images/sort-down.svg"
          }
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSortUp(!sortUp);
            setNotes(notes.reverse());
          }}
        />
      </div>
      <div className="container row m-0 mb-2">{renderNotes()}</div>
    </div>
  );
}

export default Note;
