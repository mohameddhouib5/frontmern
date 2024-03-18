import Api from "../Axios/Api";
const USER_API = "users";
export const signup = async (user) => {
  console.log(user);
  return await Api.post(USER_API + "/register", user);
};
export const signin = async (user) => {
  return await Api.post(USER_API + "/login", user);
};
