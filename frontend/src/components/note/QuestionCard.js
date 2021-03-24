import React from "react";

function QuestionCard(props) {
  console.log(props);
  return (
    <div class="card">
      <div class="card-header">
        <a
          class="card-link"
          data-toggle="collapse"
          href={`#question${props.question_id}`}
          aria-expanded="false"
          aria-controls={`question${props.question_id}`}
        >
          {props.question_title}
        </a>
      </div>
      <div
        id={`question${props.question_id}`}
        class="collapse multi-collapse"
        data-parent="#accordion"
      >
        <div class="card-body">{props.answer_content}</div>
      </div>
    </div>
  );
}

export default QuestionCard;
