export const SoundLoader: ContentItemLoader = async <HTMLAudioElement>(
  url: string
): Promise<HTMLAudioElement> => {
  return new Promise<HTMLAudioElement>((resolve, reject) => {
    const sound = new Audio(url);
    sound.addEventListener('loadeddata', () => {
      resolve(sound as any);
    });
    sound.addEventListener('error', () => {
      reject(`Error loading sound "${url}"`);
    });
  });
}
