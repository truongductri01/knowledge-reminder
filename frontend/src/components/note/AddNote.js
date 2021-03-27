import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getCookie from "../../csrftoken";
import urls from "../../urls";
import NoteForm from "./NoteForm";
import QuestionForm from "./QuestionForm";
import * as moment from "moment";

function AddNote(props) {
  const userKey = useSelector((state) => state.userKey);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteId, setNoteId] = useState(0);
  const [date, setDate] = useState(new Date());
  const [counter, setCounter] = useState(0);
  const [questions, setQuestions] = useState({}); // set of questions' objects

  const renderAddNote = () => {
    return (
      <NoteForm
        setNoteTitle={setNoteTitle}
        date={date}
        setDate={setDate}
        counter={counter}
        setCounter={setCounter}
        setQuestions={setQuestions}
      />
    );
  };

  useEffect(() => {
    return props.setReRender(true);
  }, []);

  const handleSubmit = () => {
    const formattedDate =
      date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    console.log("Formatted date >>>", formattedDate);
    console.log("moment date >>>", moment(date).format("yyyy-mm-dd"));
    const requestOptions = {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie(),
      },
      body: JSON.stringify({
        note_title: noteTitle,
        created_at: date.toISOString(),
      }),
    };

    fetch(urls.create_note(userKey), requestOptions)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          alert("Errors");
        }
      })
      .then((data) => {
        setNoteId(data.pk);
        handleSubmitQuestions(data.pk);

        // Close the modal if the request success
        $("#addNote").modal("hide");
        props.setShowModal(false);
      });
  };

  const handleSubmitQuestions = (noteId) => {
    const promises = [];
    for (const key of Object.keys(questions)) {
      const question = questions[Number(key)];
      const questionTitle = question.questionTitle;
      const answerContent = question.answerContent;

      const requestOptions = {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie(),
        },
        body: JSON.stringify({
          question_title: questionTitle,
          answer_content: answerContent,
        }),
      };

      promises.push(
        fetch(
          `http://127.0.0.1:8000/questions/create_question?note_id=${noteId}`,
          requestOptions
        )
      );
    }
    // const requestOptions

    Promise.all(promises)
      .then(() => {
        console.log("finish fetching");
      })
      .catch(() => {
        console.log("error when fetching");
      });
  };

  console.log("date >>>", date.toISOString());

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
        <div
          class="modal-content"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
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
          <div class="modal-body">
            {renderAddNote()}
            {Object.keys(questions).map((id) => (
              <QuestionForm
                questionId={Number(id)}
                questions={questions}
                setQuestions={setQuestions}
              />
            ))}
          </div>

          {/* Buttons */}
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                props.setShowModal(false);
              }}
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
