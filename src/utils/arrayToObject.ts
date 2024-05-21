export const arrayToObject = <T, K extends keyof T>(propertyName: K, array: T[]): Record<T[K] & PropertyKey, T> => {
  return array.reduce(
    (acc, item) => {
      acc[item[propertyName] as T[K] & PropertyKey] = item;
      return acc;
    },
    {} as Record<T[K] & PropertyKey, T>,
  );
};
