const logIn = (userKey) => {
  return {
    type: "LOG_IN",
    userKey: userKey,
  };
};

export default logIn;
