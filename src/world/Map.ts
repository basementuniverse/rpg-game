import * as uuid from 'uuid-random';

export type MapData = {
  id: string;
  name: string;
  width: number;
  height: number;
  walls: number[][];
};

export const MapDataSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    width: {
      type: 'integer',
    },
    height: {
      type: 'integer',
    },
    walls: {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'integer',
        },
      },
    },
  },
};

export default class Map {
  public id: string;
  public name: string;
  public width: number;
  public height: number;
  public walls: Record<string, boolean>;

  public constructor(
    id: string | null,
    name: string,
    width: number = 1,
    height: number = 1
  ) {
    this.id = id ?? uuid();
    this.name = name;
    this.width = width;
    this.height = height;
    this.walls = {};
  }

  public serialize(): MapData {
    return {
      id: this.id,
      name: this.name,
      width: this.width,
      height: this.height,
      walls: [],
    };
  }
}
