interface user {
  user?: string;
  password?: string;
}
var USER_DEV: user = {
  user: process.env.USER_DEV,
  password: process.env.PASSWORD_DEV,
};

var INCORRECT_USER_DEV: user = {
  user: process.env.INCORRECT_USER_DEV,
  password: process.env.INCORRECT_PASSWORD_DEV,
};

export const CREDENTIALS = {
  USER_DEV,
  INCORRECT_USER_DEV,
};
