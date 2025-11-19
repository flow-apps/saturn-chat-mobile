export const randomHex = (size: number) => {
  const hexes = "012345678abcdef".split("");
  let hash = "";

  for (let i = 0; i <= size; i++) {
    const randomByte = Math.floor(Math.random() * hexes.length);

    hash += hexes[randomByte];
  }

  return hash;
};
