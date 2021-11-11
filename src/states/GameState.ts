import Content from '../content/Content';
import { EntityData } from '../entities/Entity';
import EntityFactory from '../entities/EntityFactory';
import EntityManager from '../entities/EntityManager';
import { MapData } from '../world/Map';
import MapFactory from '../world/MapFactory';
import State from './State';

export class GameState extends State {
  private entityManager: EntityManager;

  public constructor() {
    super();
    this.entityManager = new EntityManager();
  }

  public initialise(): void {
    this.entityManager.initialise();

    // TODO trying out a test entity...
    this.entityManager.addEntity(
      EntityFactory.fromData(
        Content.get<EntityData>('testEntity')
      )
    );

    console.log(MapFactory.fromData(Content.get<MapData>('testMap')));
  }

  public update(dt: number): void {
    this.entityManager.update(dt);
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.entityManager.draw(context);
  }
}
