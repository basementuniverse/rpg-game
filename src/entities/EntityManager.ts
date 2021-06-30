import Content from '../content/Content';
import Entity from './Entity';
import System from './systems/System';

export default class EntityManager {
  private systems: System[];
  private entities: Entity[];

  public constructor() {
    this.systems = [];
    this.entities = [];
  }

  public initialise(): void {
    // initialise systems...
    const test = Content.get<EntityData>('testEntity');
    console.log(test);
  }

  public addEntity(entity: Entity): void {
    // push entity if not exists
  }

  public removeEntity(entity: Entity): void {
    // splice entity if exists
  }

  public update(dt: number): void {
    this.systems.forEach(system => system.update(dt, this.entities));
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.systems.forEach(system => system.draw(context, this.entities));
  }
}
