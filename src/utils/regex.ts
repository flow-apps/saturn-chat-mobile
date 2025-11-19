export const passwordValidation =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const nicknameValidation = /^[a-zA-Z0-9_-]+$/;
