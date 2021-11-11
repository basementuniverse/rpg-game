import { ContentItemLoader } from './Content';

export const JSONLoader: ContentItemLoader = async <T extends Record<string, any>>(
  urlOrData: any
): Promise<T> => {
  if (typeof urlOrData === 'string') {
    return new Promise<T>((resolve, reject) => {
      window.fetch(urlOrData, {
        method: 'GET',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          resolve(json);
        })
        .catch(() => {
          reject(`Error loading json "${urlOrData}"`);
        });
    });
  }
  return urlOrData as T;
};
