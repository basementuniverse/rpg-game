import * as content from '../content/content.json';

type ContentItem = {
  name: string,
  loader: string,
  args: string[]
};

export default class ContentManager {
  public static items: Array<any>;
  public static progress: number = 0;

  public static load(items: ContentItem[]): Promise<void> {
    throw new Error('Not implemented yet!');
  }
}
