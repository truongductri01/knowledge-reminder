function reducer(state, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, loggedIn: true, userKey: action.userKey };
    case "LOG_OUT":
      return { ...state, loggedIn: false, userKey: "" };
    default:
      return { ...state };
  }
}

export default reducer;
