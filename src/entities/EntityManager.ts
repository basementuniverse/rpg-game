import Entity from './Entity';
import { RenderSystem } from './systems';
import System from './systems/System';

export default class EntityManager {
  private systems: System[];
  private entities: Entity[];

  public constructor() {
    this.systems = [];
    this.entities = [];
  }

  /**
   * Initialise systems
   */
  public initialise(): void {
    this.systems.push(new RenderSystem());
  }

  /**
   * Add an entity to the game
   */
  public addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  /**
   * Remove an entity from the game
   */
  public removeEntity(entity: Entity): void {
    const found = this.entities.findIndex(e => e.id === entity.id);
    if (found !== -1) {
      this.entities.splice(found, 1);
    }
  }

  /**
   * Update all updateable systems
   */
  public update(dt: number): void {
    this.systems.forEach(system => system.update(dt, this.entities));
  }

  /**
   * Render all renderable systems
   */
  public draw(context: CanvasRenderingContext2D): void {
    this.systems.forEach(system => system.draw(context, this.entities));
  }
}
