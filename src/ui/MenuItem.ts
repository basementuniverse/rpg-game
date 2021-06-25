import { vec } from '@basementuniverse/commonjs';
import { Image, Text } from './components';
import HasTransforms from './contracts/HasTransforms';

export default class MenuItem implements HasTransforms {
  private static readonly TRANSITION_TIME: number = 0.5;
  private static readonly LABEL_OFFSET: vec = vec(0, 1);

  public position: vec;
  public text: string;
  public selected: boolean = false;
  private label: Text;
  private backgroundImage: Image;
  private selectedBackgroundImage: Image;
  private transition: number = 0;

  public constructor(position: vec, text: string) {
    this.position = position;
    this.text = text;
    this.label = new Text(this.text, this.position, {
      parent: this,
      font: 'aniron',
      size: 10,
      colour: '#000',
    });
    this.backgroundImage = new Image('menu_button', this.position, {
      parent: this,
    });
    this.selectedBackgroundImage = new Image('menu_button_selected', this.position, {
      parent: this,
    });
  }

  public update(dt: number): void {
    this.label.text = this.text;
    this.label.update();
    this.label.position = vec.add(this.label.position, MenuItem.LABEL_OFFSET);
    this.backgroundImage.update();
    this.selectedBackgroundImage.update();
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
