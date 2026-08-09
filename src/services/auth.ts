import { AxiosResponse } from "axios";
import api from "@services/api";
import FormData from "form-data";
import { UserData } from "@type/interfaces";

interface Response {
  token: string;
  user: UserData;
}

export async function signIn(email: string, password: string) {
  const response = await api.post<Response>("/auth", { email, password });

  if (response.status !== 200) {
    console.log(response.data);
  }

  return response;
}

export async function signUp(data: FormData) {
  const response = await api.post("/users", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}
