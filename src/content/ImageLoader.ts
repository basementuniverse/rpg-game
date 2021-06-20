export const ImageLoader: ContentItemLoader = async <HTMLImageElement>(
  url: string
): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => {
      resolve(image as any);
    });
    image.addEventListener('error', () => {
      reject(`Error loading image "${url}"`);
    });
  });
}
