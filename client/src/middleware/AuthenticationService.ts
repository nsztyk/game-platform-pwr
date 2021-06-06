import axios from 'axios';

// To change
const url = process.env.VUE_APP_ROOT_API + "/api/users";

interface User {
  username: string;
  password: string;
}

export const loginUser = (user: User) => {
  console.log(process.env);
  return axios.post(url + "/login", {
    user
  })
}

export const registerUser = (user: User) => {
  return axios.post(url + '/register', {
    user
  })
}

export const secret = (token: string) => {
  return axios.post(url + '/secret', {
    token
  })
}

export const statistics = (token: string) => {
  return axios.post(url + '/stats', {
    token
  })
}