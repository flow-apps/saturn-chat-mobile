interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export async function signIn(): Promise<Response> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        token: "uys7gwys6wfsw6fswysgy",
        user: {
          name: "Exemplo",
          email: "exemplo@gmail.com",
        },
      });
    }, 2000);
  });
}
