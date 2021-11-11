import JSONSchemaValidator from 'ajv';
import * as constants from '../constants';
import { MapData, MapDataSchema } from '../world/Map';
import { ContentItemLoader } from './Content';
import { JSONLoader } from './JSONLoader';

export const MapDataLoader: ContentItemLoader = async (
  url: string
): Promise<any> => {
  const data = await JSONLoader<MapData>(url);
  const validate = new JSONSchemaValidator().compile(MapDataSchema);
  if (!validate(data)) {
    constants.DEBUG && console.log(validate.errors);
    throw new Error(`Invalid map data: ${url}`);
  }
  return data;
};
