const BASE_URL = "http://127.0.0.1:8000/";

const urls = {
  check_log_in: BASE_URL + "api/user_logged_in",
  log_in: BASE_URL + "api/log_in",
  sign_up: BASE_URL + "api/sign_up",
  log_out: BASE_URL + "api/log_out",
  get_user_note: (userKey) =>
    BASE_URL + "note/view_user_notes?user_key=" + userKey,
  get_note_questions: (noteId) =>
    BASE_URL + "questions/get_questions_from_note?note_id=" + noteId,
  create_note: (userKey) => BASE_URL + "note/create_note?user_key=" + userKey,
  create_question: (noteId) =>
    BASE_URL + "questions/create_question?note_id=" + noteId,
};

export default urls;
