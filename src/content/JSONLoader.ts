export const JSONLoader: ContentItemLoader = async <T>(
  url: string
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
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
