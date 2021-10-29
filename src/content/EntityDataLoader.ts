import JSONSchemaValidator from 'ajv';
import * as constants from '../constants';
import { EntityDataSchema } from '../entities/Entity';
import { ContentItemLoader } from './Content';
import { JSONLoader } from './JSONLoader';

export const EntityDataLoader: ContentItemLoader = async <EntityData>(
  url: string
): Promise<EntityData> => {
  const data = await JSONLoader<EntityData>(url);
  const validate = new JSONSchemaValidator().compile(EntityDataSchema);
  if (!validate(data)) {
    constants.DEBUG && console.log(validate.errors);
    throw new Error(`Invalid entity data: ${url}`);
  }
  return data;
};
