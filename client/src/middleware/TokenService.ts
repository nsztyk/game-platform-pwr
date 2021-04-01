
import { secret } from "./AuthenticationService"

let token = ""

export const getToken = () => token
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
