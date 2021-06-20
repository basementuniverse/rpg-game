import * as content from '../../content/content.json';
import * as utilities from '../utilities';
import * as constants from '../constants';
import { FontLoader, ImageLoader, JSONLoader, SoundLoader } from '../content';

const contentItemLoaders: {
  [key in ContentItemType]: ContentItemLoader;
} = {
  image: ImageLoader,
  sound: SoundLoader,
  font: FontLoader,
  json: JSONLoader,
};

export class ContentManager {
  private static instance: ContentManager;
  private content: ContentItem[];
  private items: Record<string, any>;
  public static progress: number = 0;
  public static loaded: boolean = false;

  private constructor(content: ContentItem[]) {
    this.content = content;
  }

  /**
   * Initialise the content manager for loading content assets
   */
  public static initialise(): void {
    ContentManager.instance = new ContentManager(content.items as ContentItem[]);
  }

  private static getInstance(): ContentManager {
    if (ContentManager.instance === undefined) {
      throw new Error('Content manager not properly initialised');
    }
    return ContentManager.instance;
  }

  public static async load(): Promise<void> {
    if (ContentManager.loaded) {
      throw new Error('Content already loaded');
    }
    const instance = ContentManager.getInstance();
    if (instance.content.length === 0) {
      throw new Error('No content items to load');
    }
    const progressDelta = 1 / instance.content.length;
    const items: any[] = [];
    for (const c of instance.content) {
      if (constants.DEBUG && constants.SIMULATE_SLOW_LOADING) {
        await utilities.sleep(Math.randomBetween(100, 1000));
      }
      items.push(await contentItemLoaders[c.type](...c.args));
      ContentManager.progress = Math.clamp(ContentManager.progress + progressDelta, 0, 1);
    }
    instance.items = items;
    ContentManager.loaded = true;
  }

  public static get<T>(name: string): T {
    if (!ContentManager.loaded) {
      throw new Error('Content not loaded');
    }
    const instance = ContentManager.getInstance();
    if (!(name in instance.items)) {
      throw new Error(`Content item "${name}" not found`);
    }
    return instance.items[name] as T;
  }
}
