import MenuItem from './MenuItem';

export default class Menu {
  private items: MenuItem[];
  private selectedIndex: number;

  constructor(items: MenuItem[]) {
    this.items = items;
  }

  update(dt: number): void {
    //
  }

  draw(context: CanvasRenderingContext2D): void {
    //
  }
}
