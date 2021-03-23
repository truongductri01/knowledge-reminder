import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

function NoteCard(props) {
  const noteTitle = props.noteTitle;
  const noteId = props.id;

  // A list of objects representing questions with a new key-value pair of answers.
  const [questions, setQuestions] = useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [canRenderQ, setCanRenderQ] = useState(false);
  const [canRenderQ_A, setCanRenderQ_A] = useState(false);

  const newQ_A_Object = (
    question_id,
    question_title,
    categories,
    answer,
    answer_id
  ) => {
    return { question_id, question_title, answer, categories, answer_id };
  };

  const getQuestionsSet = async () => {
    await fetch(
      `http://127.0.0.1:8000/questions/get_questions_from_note?note_id=${noteId}`
    )
      .then((response) => response.json())
      .then((data) => {
        let questions_result = [];
        // let qAndAs_result = [];
        data.forEach((question) => {
          questions_result.push({
            id: question.id,
            question_title: question.question_title,
          });
        });
        setQuestions(questions_result);
        setCanRenderQ(true);
      });
  };

  const getAnswer = async (question_id) => {
    let answer_content = "";
    let answer_id = 0;
    await fetch(
      `http://127.0.0.1:8000/answers/get_answers_from_question?question_id=${question_id}`
    )
      .then((response) => response.json())
      .then((answer) => {
        answer_content = answer.answer_content;
        answer_id = answer.id;
      });

    return { answer_content, answer_id };
  };

  const constructQ_and_A = async () => {
    let finalObject = [];

    for (const question of questions) {
      const asyncResult = await getAnswer(question.id);
      const newObject = newQ_A_Object(
        question.id,
        question.question_title,
        question.categories,
        asyncResult.answer_content,
        asyncResult.answer_id
      );
      finalObject.push(newObject);
    }
    setQuestionsAndAnswers(finalObject);
    setCanRenderQ_A(true);
  };

  useEffect(() => {
    getQuestionsSet();
  }, [noteId]);

  useEffect(() => {
    if (canRenderQ) {
      constructQ_and_A();
    }
  }, [questions, canRenderQ]);

  if (canRenderQ_A) {
    console.log(`Q and A for ${noteTitle} >>>`, questionsAndAnswers);
  }

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
          {canRenderQ_A &&
            questionsAndAnswers.map((qAndA) => <QuestionCard {...qAndA} />)}
        </div>

        <a href="#" class="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default NoteCard;
