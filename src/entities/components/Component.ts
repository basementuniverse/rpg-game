import Entity from '../Entity';

export default abstract class Component {
  private name: string;
  private entity: Entity;

  public constructor(entity: Entity) {
    this.entity = entity;
  }
}
