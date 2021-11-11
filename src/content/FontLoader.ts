import { ContentItemLoader } from './Content';

export const FontLoader: ContentItemLoader = async (
  url: string,
  family: string
): Promise<any> => {
  return new Promise<FontFace>((resolve, reject) => {
    const font = new FontFace(family, `url(${url})`);
    font.load()
      .then(font => {
        document.fonts.add(font);
        resolve(font as any);
      })
      .catch(() => {
        reject(`Error loading font "${url}"`);
      });
  });
};
