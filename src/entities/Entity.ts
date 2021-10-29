import * as uuid from 'uuid-random';
import Component, { ComponentData, ComponentDataSchema } from './components/Component';

export type EntityData = {
  id: string;
  name: string;
  components: ComponentData[];
};

export const EntityDataSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    components: {
      type: 'array',
      items: ComponentDataSchema,
    },
  },
  additionalProperties: false,
};

export default class Entity {
  private id: string;
  private components: Record<string, Component>;

  public constructor(
    // id: string
  ) {
    this.id = uuid();
    this.components = {};
  }

  public static fromData(data: EntityData): Entity {
    // TODO
    return new Entity();
  }

  // public addComponent(component: Component): void {
  //   // component.entity = this;
  //   // push component if not exists
  // }

  // public removeComponent(component: Component): void {
  //   // splice component if exists
  // }
}
