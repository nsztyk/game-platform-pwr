import axios from 'axios';

const url = 'api/users';

interface User {
  username: string;
  password: string;
}

export const loginUser = (user: User) => {
  console.log("login");
  return axios.post(url + "/login", {
    user
  })
}

export const registerUser = (user: User) => {
  console.log("register");
  return axios.post(url + '/register', {
    user
  })
}

export const secret = (token: string) => {
  console.log("secret")
  return axios.post(url + '/secret', {
    token
  })
}
