import MenuItem from './MenuItem';

export default class Menu {
  private items: MenuItem[];
  private selectedIndex: number;

  public constructor(items: MenuItem[]) {
    this.items = items;
  }

  public update(dt: number): void {
    //
  }

  public draw(context: CanvasRenderingContext2D): void {
    //
  }
}
