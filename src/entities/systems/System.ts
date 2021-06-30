import Entity from '../Entity';

export default abstract class System {
  abstract update(dt: number, entities: Entity[]): void;

  abstract draw(context: CanvasRenderingContext2D, entities: Entity[]): void;
}
