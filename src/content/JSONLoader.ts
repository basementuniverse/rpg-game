/* eslint @typescript-eslint/no-unsafe-return: 0 */
export const JSONLoader: ContentItemLoader = async (
  url: string
): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    window.fetch(url, {
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
        reject(`Error loading json "${url}"`);
      });
  });
};
