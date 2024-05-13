interface AnyObject {
  [key: string]: any;
}

export const arrayToObject = <T extends AnyObject, K extends keyof T>(propertyName: K, array: T[]): Record<T[K], T> => {
  return array.reduce(
    (acc, item) => {
      acc[item[propertyName]] = item;
      return acc;
    },
    {} as Record<T[K], T>,
  );
};
