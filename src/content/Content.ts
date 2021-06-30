import JSONSchemaValidator from 'ajv';
import * as _contentManifest from '../../content/content.json';
import * as constants from '../constants';
import { EntityDataLoader, FontLoader, ImageLoader, SoundLoader } from '../content';
import { ContentItemType } from '../enums';
import * as utilities from '../utilities';

type ContentItem = {
  name: string;
  type: ContentItemType;
  args: string[];
};

type ContentManifest = {
  items: ContentItem[];
};

const contentItemLoaders: {
  [key in ContentItemType]: ContentItemLoader;
} = {
  [ContentItemType.Image]: ImageLoader,
  [ContentItemType.Sound]: SoundLoader,
  [ContentItemType.Font]: FontLoader,
  [ContentItemType.EntityData]: EntityDataLoader,
};

export default class Content {
  private static instance: Content;
  private content: ContentItem[];
  private items: Record<string, any> = {};
  public static progress: number = 0;
  public static loaded: boolean = false;

  private constructor(content: ContentItem[]) {
    this.content = content;
  }

  /**
   * Initialise the content manager for loading content assets
   */
  public static initialise(): void {
    const contentManifest = _contentManifest as ContentManifest;
    const validate = new JSONSchemaValidator().compile({
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              type: {
                type: 'string',
                enum: Object.values(ContentItemType),
              },
              args: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    });
    if (!validate(contentManifest)) {
      constants.DEBUG && console.log(validate.errors);
      throw new Error('Invalid content manifest');
    }
    Content.instance = new Content(contentManifest.items);
  }

  private static getInstance(): Content {
    if (Content.instance === undefined) {
      throw new Error('Content manager not properly initialised');
    }
    return Content.instance;
  }

  public static async load(): Promise<void> {
    if (Content.loaded) {
      throw new Error('Content already loaded');
    }
    const instance = Content.getInstance();
    if (instance.content.length === 0) {
      throw new Error('No content items to load');
    }
    const progressDelta = 1 / instance.content.length;
    for (const c of instance.content) {
      if (constants.DEBUG && constants.SIMULATE_SLOW_LOADING) {
        await utilities.sleep(Math.randomBetween(100, 1000));
      }
      instance.items[c.name] = await contentItemLoaders[c.type](...c.args);
      Content.progress = Math.clamp(Content.progress + progressDelta, 0, 1);
    }
    Content.loaded = true;
  }

  public static get<T>(name: string): T {
    if (!Content.loaded) {
      throw new Error('Content not loaded');
    }
    const instance = Content.getInstance();
    if (!(name in instance.items)) {
      throw new Error(`Content item "${name}" not found`);
    }
    return instance.items[name] as T;
  }
}
