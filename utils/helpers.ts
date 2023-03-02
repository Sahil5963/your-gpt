export const log = (...args: any[]) => {
  // return;
  return console.log(...args);
};
export const logErr = (...args: any[]) => {
  // return;
  return console.error(...args);
};

export const formatDateTime = (tm: number) => {
  return new Date(tm * 1000).toLocaleString();
};
