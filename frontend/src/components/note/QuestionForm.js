import React, { useState } from "react";

function QuestionForm(props) {
  const id = props.questionId;
  const questions = props.questions;
  const setQuestions = props.setQuestions;
  console.log(props);
  // const noteId = props.noteId;
  const handleQuestionTitleChange = (e) => {
    questions[id].questionTitle = e.target.value;
  };

  const handleAnswerContentChange = (e) => {
    questions[id].answerContent = e.target.value;
  };

  const deleteQuestionForm = () => {
    delete questions[id];
    setQuestions(questions);
  };
  return (
    <form>
      {/* header */}
      <div className="container-fluid d-flex align-items-center justify-content-between p-0">
        <h5>Question</h5>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={deleteQuestionForm}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      {/* Body */}
      <div class="form-group">
        <label>Question Title</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Note Title"
          onChange={handleQuestionTitleChange}
        />

        {/* Answer Content */}
        <label>Answer Content</label>
        <input
          type="textarea"
          class="form-control"
          placeholder="Enter Note Title"
          onChange={handleAnswerContentChange}
        />
      </div>
      <hr />
    </form>
  );
}

export default QuestionForm;
