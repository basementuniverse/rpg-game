import * as uuid from 'uuid-random';
import Component from '../ui/components/Component';

export default class Entity {
  private id: string;
  private components: Component[];

  public constructor(data: EntityData) {
    this.id = uuid();
    this.components = [];
  }

  public addComponent(component: Component): void {
    // push component if not exists
  }

  public removeComponent(component: Component): void {
    // splice component if exists
  }
}
