import { vec } from '@basementuniverse/commonjs';
import { Image, Text } from './components';

export default class MenuItem {
  private static readonly TRANSITION_TIME: number = 1;

  private position: vec;
  private label: Text;
  private backgroundImage: Image;
  private selectedBackgroundImage: Image;
  private selected: boolean = false;
  private transition: number = 0;

  public constructor(position: vec, text: string) {
    this.position = position;
    this.label = new Text(text, this.position, {
      font: 'aniron',
      size: 10,
      colour: '#000',
    });
    this.backgroundImage = new Image('menu_button', this.position);
    this.selectedBackgroundImage = new Image('menu_button_selected', this.position);
  }

  public update(dt: number): void {
    const amount = dt / MenuItem.TRANSITION_TIME;
    if (this.selected) {
      this.transition += amount;
    } else {
      this.transition -= amount;
    }
    this.transition = Math.clamp(this.transition);
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.backgroundImage.draw(context);
    if (this.transition > 0) {
      context.save();
      context.globalAlpha = this.transition;
      this.selectedBackgroundImage.draw(context);
      context.restore();
    }
    this.label.draw(context);
  }
}
