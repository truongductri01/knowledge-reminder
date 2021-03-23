import React, { useEffect, useState } from "react";
import "./index.css";

function Homepage(props) {
  const user_key = props.userKey;
  const [notes, setNotes] = useState([]);
  console.log(user_key);
  const getNotesForUsers = async (user_key) => {
    await fetch(`note/view_user_notes?user_key=${user_key}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setNotes(data.notes);
      });
  };

  useEffect(() => {
    getNotesForUsers(user_key);
  }, [user_key]);

  console.log("Notes >>>", notes);

  return (
    <div className="container-fluid m-0 p-0 homepage">
      <h1>Testing</h1>
    </div>
  );
}

export default Homepage;
