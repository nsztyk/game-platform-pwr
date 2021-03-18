import axios from 'axios';

const url = 'http://localhost:5000/api/posts';

interface User {
  username: string;
  password: string;
}

export const getPosts = async () => {
  const res = await axios.get(url);
  const data = res.data;
  return data;
}

export const insertPost = (text: string) => {
  return axios.post(url, {
    text
  });
}

export const loginUser = (user: User) => {
  return axios.post(url, {
    user
  })
}
