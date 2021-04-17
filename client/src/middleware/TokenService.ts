
import { secret } from "./AuthenticationService"
import { decode } from 'jsonwebtoken'

let token = ""

interface TokenDecoded {
  id: string;
  username: string;
  iat: number;
}

export const getToken = () => token
export const getUsername = () => {
  const decodedToken = decode(token) as TokenDecoded
  return decodedToken.username
}
export const setToken = (incToken: string) => {
  token = incToken
}

export const removeToken = () => {
  token = ""
}

export const isTokenAuthorized = async () => {
  const res = await secret(getToken())
  console.log(res);
  console.log(res.data.status === "ok");
  return res.data.status === "ok"
}
