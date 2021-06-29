import { vec } from '@basementuniverse/commonjs';
import { Image, Text } from './components';
import HasTransforms from './contracts/HasTransforms';

type MenuItemActivationHandler = () => void;

export default class MenuItem implements HasTransforms {
  private static readonly TRANSITION_TIME: number = 0.5;
  private static readonly LABEL_OFFSET: vec = vec(0, 1);

  public text: string;
  public position: vec;
  public selected: boolean = false;
  public activated: boolean = false;
  public activationHandler: MenuItemActivationHandler | undefined;
  private label: Text;
  private backgroundImage: Image;
  private selectedBackgroundImage: Image;
  private transition: number = 0;

  public constructor(
    text: string,
    position: vec = vec(),
    activationHandler?: MenuItemActivationHandler
  ) {
    this.text = text;
    this.position = position;
    this.activationHandler = activationHandler;
    this.label = new Text(this.text, this.position, {
      parent: this,
      font: 'aniron-bold',
      size: 12,
      colour: '#ddb',
      strokeWidth: 2,
      strokeColour: '#210',
    });
    this.backgroundImage = new Image('menu_button', this.position, {
      parent: this,
    });
    this.selectedBackgroundImage = new Image('menu_button_selected', this.position, {
      parent: this,
    });
  }

  public activate(): void {
    if (this.activationHandler) {
      this.activationHandler();
    }
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
