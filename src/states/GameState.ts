import Content from '../content/Content';
import Entity, { EntityData } from '../entities/Entity';
import EntityManager from '../entities/EntityManager';
import State from './State';

export class GameState extends State {
  private entityManager: EntityManager;

  public constructor() {
    super();
    this.entityManager = new EntityManager();
  }

  public initialise(): void {
    this.entityManager.initialise();

    // trying out a test entity...
    const testEntityData = Content.get<EntityData>('testEntity');
    console.log(testEntityData);
    const testEntity = Entity.fromData(testEntityData);
    console.log(testEntity);
    this.entityManager.addEntity(testEntity);
  }

  public update(dt: number): void {
    this.entityManager.update(dt);
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.entityManager.draw(context);
  }
}
