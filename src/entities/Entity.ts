import * as uuid from 'uuid-random';
import { ComponentComparisonType } from '../enums';
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
  public id: string;
  public name: string;
  public components: Record<string, Component>;

  public constructor(
    id: string | null,
    name: string
  ) {
    this.id = id ?? uuid();
    this.name = name;
    this.components = {};
  }

  /**
   * Add a component to this entity
   */
  public addComponent(component: Component): void {
    this.components[component.name] = component;
  }

  /**
   * Remove a component from this entity
   */
  public removeComponent(component: Component): void {
    if (component.name in this.components) {
      delete this.components[component.name];
    }
  }

  /**
   * Check if this entity contains some/all/none of the specified component types
   */
  public hasComponents(
    comparisonType: ComponentComparisonType,
    ...componentNames: string[]
  ): boolean {
    const components = Object.keys(this.components);
    switch (comparisonType) {
      case ComponentComparisonType.All:
        return componentNames.every(
          componentName => components.includes(componentName)
        );
      case ComponentComparisonType.Some:
        return componentNames.some(
          componentName => components.includes(componentName)
        );
      case ComponentComparisonType.None:
        return !componentNames.some(
          componentName => components.includes(componentName)
        );
      default:
        break;
    }
    return false;
  }

  public serialize(): EntityData {
    return {
      id: this.id,
      name: this.name,
      components: Object
        .values(this.components)
        .map(c => c.serialize()),
    };
  }
}
