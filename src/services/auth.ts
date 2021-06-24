import { AxiosResponse } from "axios";
import api from "./api";
import FormData from "form-data";

interface Response extends AxiosResponse {
  data: {
    token: string;
    user: object;
  };
}

export async function signIn(
  email: string,
  password: string
): Promise<Response> {
  const response = (await api.post("/auth", { email, password })) as Response;

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
