export const randomString = () => {
  return Math.random()
    .toString(36)
    .substr(2);
};
