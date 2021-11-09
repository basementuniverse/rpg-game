import { SpriteComponent, TransformsComponent } from '.';
import Component, { ComponentData } from './Component';
import { SpriteComponentData } from './SpriteComponent';
import { TransformsComponentData } from './TransformsComponent';

export default class ComponentFactory {

  /**
   * Create an entity component from JSON data
   */
  public static fromData(data: ComponentData): Component {
    switch (data.name) {
      case 'sprite':
        return SpriteComponent.deserialize(data as SpriteComponentData);
      case 'transforms':
        return TransformsComponent.deserialize(data as TransformsComponentData);
      default:
        throw new Error(`Incorrect component name "${data.name}"`);
    }
  }
}
