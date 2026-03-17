export const Credentials = {
  standardUser: {
    username: "standard_user",
    password: "secret_sauce",
  },
  lockedOutUser: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
  problemUser: {
    username: "problem_user",
    password: "secret_sauce",
  },
  performanceGlitchUser: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
  errorUser: {
    username: "error_user",
    password: "secret_sauce",
  },
  invalid: {
    wrongPassword: "incorrect_password",
    usernameWithSpace: " standard_user",
    noPassword: "",
  },
} as const;
