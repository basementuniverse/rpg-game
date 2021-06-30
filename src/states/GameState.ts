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
  }

  public update(dt: number): void {
    this.entityManager.update(dt);
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.entityManager.draw(context);
  }
}
