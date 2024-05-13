export const getExactPath = (path: string, params?: { [key: string]: any }): string => {
  let exactPath = path;
  for (const key in params) {
    exactPath = exactPath.replace(`:${key}`, encodeURIComponent(params[key]));
  }
  return exactPath;
};
