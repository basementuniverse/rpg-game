import Entity from '../Entity';

export default abstract class System {

  /**
   * Update all the entities that contain components associated with this system
   */
  abstract update(dt: number, entities: Entity[]): void;

  /**
   * Render all the entities that contain components associated with this system
   */
  abstract draw(context: CanvasRenderingContext2D, entities: Entity[]): void;
}
