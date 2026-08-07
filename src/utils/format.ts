export const millisToTime = (millis: number) => {
  let seconds = millis / 1000;

  const hours = String(Math.trunc(seconds / 3600));
  seconds = seconds % 3600;

  const minutes = String(Math.trunc(seconds / 60));
  seconds = Math.trunc(seconds % 60);

  return `${minutes.padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const secondsToTime = (seconds: number) => {
  const minutes = Math.trunc(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};
