import * as content from '../../content/content.json';
import * as utilities from '../utilities';

const contentItemTypes = ['image', 'sound', 'font', 'json'] as const;
type ContentItemType = typeof contentItemTypes[number];

type ContentItem = {
  name: string;
  type: ContentItemType;
  args: string[];
};

type ContentItemLoader = <T>(...args: string[]) => Promise<T>;

const contentItemLoaders: {
  [key in ContentItemType]: ContentItemLoader;
} = {
  image: async <HTMLImageElement>(url: string): Promise<HTMLImageElement> => {
    await utilities.sleep(1000);
    throw new Error(`loading image "${url}"...`);
  },
  sound: async <HTMLAudioElement>(url: string): Promise<HTMLAudioElement> => {
    await utilities.sleep(1000);
    throw new Error(`loading audio "${url}"...`);
  },
  font: async <FontFace>(url: string): Promise<FontFace> => {
    await utilities.sleep(1000);
    throw new Error(`loading font "${url}"...`);
  },
  json: async (url: string): Promise<any> => {
    await utilities.sleep(1000);
    throw new Error(`loading json "${url}"...`);
  },
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
    console.log(content);
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
