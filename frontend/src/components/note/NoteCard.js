import React, { useEffect, useState } from "react";
import urls from "../../urls";
import QuestionCard from "./QuestionCard";

function NoteCard(props) {
  const noteTitle = props.noteTitle;
  const noteId = props.id;

  // A list of objects representing questions with a new key-value pair of answers.
  const [questions, setQuestions] = useState([]);
  const [canRenderQ, setCanRenderQ] = useState(false);

  const newQ_Object = (
    question_id,
    question_title,
    categories,
    answer_content
  ) => {
    return { question_id, question_title, answer_content, categories };
  };

  const getQuestions = async () => {
    await fetch(urls.get_note_questions(noteId))
      .then((response) => response.json())
      .then((data) => {
        let questions_result = [];
        // let qAndAs_result = [];
        data.forEach((question) => {
          questions_result.push(
            newQ_Object(
              question.id,
              question.question_title,
              question.categories,
              question.answer_content
            )
          );
        });
        setQuestions(questions_result);
        setCanRenderQ(true);
      });
  };

  useEffect(() => {
    getQuestions();
  }, [noteId]);

  return (
    <div
      class="card col ml-2 mr-2 mb-2"
      style={{
        minWidth: "300px",
        height: "400px",
        overflow: "auto",
        width: "40%",
      }}
    >
      <div class="card-body">
        <h5 class="card-title sticky-top bg-white mt-2 mb-2">{noteTitle}</h5>
        <div id="accordion">
          {canRenderQ &&
            questions.map((question) => <QuestionCard {...question} />)}
        </div>

        <a href="#" class="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default NoteCard;
