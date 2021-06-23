import * as config from '../config.json';
import { State } from './State';
import { StateTransitionType } from '../enums';
import Content from '../content/Content';
import { vec } from '@basementuniverse/commonjs';
import MenuItem from '../menus/MenuItem';

export class MainMenuState extends State {
  private background: HTMLImageElement;
  private backgroundPattern: CanvasPattern | null;

  protected testMenuItem: MenuItem;

  public initialise(): void {
    this.background = Content.get<HTMLImageElement>('menu_background');
    this.testMenuItem = new MenuItem(vec(100, 100), 'Test Button');
  }

  public update(dt: number): void {
    //
  }

  public draw(context: CanvasRenderingContext2D, screen: vec): void {
    context.save();
    if (this.transitionType !== StateTransitionType.None) {
      context.globalAlpha = this.transitionAmount;
    }
    if (!this.backgroundPattern) {
      this.backgroundPattern = context.createPattern(this.background, 'repeat');
    }
    if (this.backgroundPattern) {
      context.fillStyle = this.backgroundPattern;
      context.fillRect(
        0,
        0,
        context.canvas.width * config.scaleFactor,
        context.canvas.height * config.scaleFactor
      );
    }
    this.testMenuItem.draw(context);
    context.restore();
  }
}
