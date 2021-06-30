import { JSONLoader } from './JSONLoader';

export const EntityDataLoader: ContentItemLoader = async <EntityData>(
  url: string
): Promise<EntityData> => {
  return JSONLoader<EntityData>(url);
};
