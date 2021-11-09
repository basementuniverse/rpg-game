import ComponentFactory from './components/ComponentFactory';
import Entity, { EntityData } from './Entity';

export default class EntityFactory {

  /**
   * Create an entity from JSON data
   */
  public static fromData(data: EntityData): Entity {
    const entity = new Entity(data.id, data.name);
    data.components.forEach(componentData => entity.addComponent(
      ComponentFactory.fromData(componentData)
    ));
    return entity;
  }
}
