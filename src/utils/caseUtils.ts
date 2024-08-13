// utils/caseUtils.ts

export const snakeToCamel = (str: string): string => {
  return str.replace(/(_\w)/g, matches => matches[1].toUpperCase());
};

export const camelToSnake = (str: string): string => {
  return str.replace(/([A-Z])/g, matches => `_${matches[0].toLowerCase()}`);
};

export const keysToCamel = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => keysToCamel(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        result[snakeToCamel(key)] = keysToCamel(obj[key]);
        return result;
      },
      {} as any
    );
  }
  return obj;
};

export const keysToSnake = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => keysToSnake(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        result[camelToSnake(key)] = keysToSnake(obj[key]);
        return result;
      },
      {} as any
    );
  }
  return obj;
};

export const removeKeys = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const newObj = { ...obj };
  keys.forEach(key => {
    delete newObj[key];
  });
  return newObj as Omit<T, K>;
};