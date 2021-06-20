export const FontLoader: ContentItemLoader = async <FontFace>(
  url: string,
  family: string
): Promise<FontFace> => {
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
